import {
  createClient,
  SupabaseClient,
  PostgrestError,
} from "@supabase/supabase-js";

import { supabaseConfig } from "../constants/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize supabase
var supabase: SupabaseClient;
supabase = createClient(supabaseConfig.apiUrl, supabaseConfig.anonKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false,
});

/**
 * List all businesses with donations nearby
 * @param lat Latitude of user location
 * @param lon Longitued of user location
 * @param radius Search radius in miles
 */
export const listNearbyDonations = async ({
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
  if (error) {
    console.error(error);
    return { error: error, data: null };
  } else {
    // Sort into businesses
    const businesses = groupDonationsByBusiness(data);
    return { error: null, data: businesses };
  }
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
