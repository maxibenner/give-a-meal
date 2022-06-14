import { PostgrestError } from "@supabase/supabase-js";
import { httpsCallable, HttpsCallableResult } from "firebase/functions";
import { functions } from "../constants/firebase";
import { supabase } from "../constants/supabase";

/**
 * List business with donation count
 * @param {number} id Id of the business
 */
export const getAvailableDonations = async (id: number) => {
  const { data, error } = await supabase
    .from("donations_w_business")
    .select("*")
    .eq("business_id", id)
    .is("active", true)
    .is("claimed_by", null);

  if (error) return { error: error, data: null };
  return { error: null, data: data };
};

/**
 * List all businesses with donations nearby
 * @param {number} lat Latitude of user location
 * @param {number} lon Longitued of user location
 * @param {number} radius Search radius in miles
 */
export const listNearbyBusinessesWithDonations = async ({
  lat,
  lon,
  radius,
}: {
  lat: number;
  lon: number;
  radius: number;
}): Promise<{ error: PostgrestError | null; data: BusinessType[] | [] }> => {
  // Get donations
  let { data, error } = await supabase.rpc("get_nearby_donations", {
    latitude: lat,
    longitude: lon,
    radius: radius,
  });

  // Check response
  if (error) return { error: error, data: null };
  else {
    // Return sorted businesses
    return { error: null, data: groupDonationsByBusiness(data) };
  }
};

/**
 * List all donations claimed by user with claimId
 * @param donationId Donation id
 * @param claimId Id to identify claim (needs to be saved locally by user)
 */
export const claimDonation = async ({
  donationId,
  claimId,
}: {
  donationId: number;
  claimId: string;
}) => {
  const response = (await httpsCallable<{
    donationId: number;
    storageId: string;
  }>(
    functions,
    "claimDonation"
  )({
    donationId: donationId,
    storageId: claimId,
  })) as HttpsCallableResult<{
    data: { message: string; details: string; hint: string; code: number };
    error: PostgrestError | null;
  }>;

  if (!response.data.error) {
    return {
      message: "Success",
      details: "Successfully claimed donation.",
      hint: "",
      code: 200,
    };
  } else {
    return response.data.error;
  }
};

/**
 * List all donations claimed by user with claimId
 * @param claimId Id that has been used to claim the donations
 */
export const listClaimedDonations = async (claimId: string) => {
  const res = await supabase
    .from("donations")
    .select("*, item_id (*, business_id(*))")
    .eq("claimed_by", claimId)
    .eq("active", true);

  return { data: res.data, error: res.error };
};

const groupDonationsByBusiness = (data: QueryResponse[]) => {
  let businesses: BusinessType[] = [];
  data.forEach((donation) => {
    // Create donation object
    const newDonation = {
      donation_id: donation.id,
      description: donation.description,
      title: donation.title,
      active: donation.active,
      claimed_by: donation.claimed_by,
      donor_name: donation.donor_name,
      updated_at: donation.updated_at,
    };

    // Continue for non empty businesses array
    businesses.forEach((business, i) => {
      // Check if business already exists in group array
      if (business.business_id === donation.business_id) {
        // Push new donation to existing business
        businesses[i].donations.push(newDonation);
      } else {
        // Create new business object with donation
        const newBusiness = {
          business_id: business.business_id,
          business_name: business.business_name,
          address: business.address,
          city: business.city,
          country: business.country,
          distance: business.distance,
          lat: business.lat,
          lon: business.lon,
          postal_code: business.postal_code,
          state: business.state,
          donations: [newDonation],
        };
        businesses.push(newBusiness);
      }
    });

    // If businesses is empty
    if (businesses.length === 0) {
      // Create new business object with donation
      const newBusiness = {
        business_id: donation.business_id,
        business_name: donation.business_name,
        address: donation.address,
        city: donation.city,
        country: donation.country,
        distance: donation.distance,
        lat: donation.lat,
        lon: donation.lon,
        postal_code: donation.postal_code,
        state: donation.state,
        donations: [newDonation],
      };
      businesses.push(newBusiness);
    }
  });
  return businesses;
};

type QueryResponse = {
  active: boolean;
  address: string;
  business_id: number;
  business_name: string;
  city: string;
  claimed_by: string | null;
  country: string;
  description: string;
  distance: number;
  donor_name: string;
  id: number;
  lat: number;
  lon: number;
  postal_code: number;
  state: string;
  title: string;
  updated_at: string;
};

export type BusinessType = {
  business_id: number;
  business_name: string;
  address: string;
  city: string;
  country: string;
  distance: number;
  lat: number;
  lon: number;
  postal_code: number;
  state: string;
  donations: DonationType[];
};
export type DonationType = {
  donation_id: number;
  description: string;
  title: string;
  active: boolean;
  claimed_by: string | null;
  donor_name: string;
  updated_at: string;
};
