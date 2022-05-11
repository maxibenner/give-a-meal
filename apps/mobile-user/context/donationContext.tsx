import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { useClaimedDonations } from "@give-a-meal/sdk";
import { listNearbyBusinessesWithDonations } from "@give-a-meal/sdk";
import { BusinessType } from "@give-a-meal/sdk";
import { LocationContext } from "@give-a-meal/sdk";

// Context ---------  Context ---------  Context ---------  Context ---------
export const DonationContext = createContext<DonationContextType>({
  claimedDonations: [],
  claimedDonationsLoading: true,
  businessesWithDonations: [],
  businessesLoading: true,
  refreshBusinesses: null,
});
export type DonationContextType = {
  claimedDonations: any[];
  claimedDonationsLoading: boolean;
  businessesWithDonations: BusinessType[] | [];
  businessesLoading: boolean;
  refreshBusinesses: (() => Promise<void>) | null;
};

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function DonationProvider({ children }: { children: ReactNode }) {
  const { location } = useContext(LocationContext);
  const { claimedDonations, donationsLoading } = useClaimedDonations("001");
  const [businessesWithDonations, setBusinessesWithDonations] = useState<
    BusinessType[] | []
  >([]);
  const [businessesLoading, setBusinessesLoading] = useState(true);

  // Load donations on location available
  useEffect(() => {
    handleLoadDonations();
  }, [location]);

  const handleLoadDonations = async (preventLoading?: boolean) => {
    if (location) {
      // Indicate loading state
      !preventLoading && setBusinessesLoading(true);

      // Get donations
      const { data, error } = await listNearbyBusinessesWithDonations({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        radius: 9999999999,
      });

      // Format donations to surface businesses first
      if (data) setBusinessesWithDonations(data);

      // Indicate loading state
      setBusinessesLoading(false);
    }
  };

  // Refresh on claimedDonations changes
  useEffect(() => {
    handleLoadDonations(true);
  }, [claimedDonations]);

  return (
    <DonationContext.Provider
      value={{
        claimedDonations: claimedDonations,
        claimedDonationsLoading: donationsLoading,
        businessesWithDonations: businessesWithDonations,
        businessesLoading: businessesLoading,
        refreshBusinesses: handleLoadDonations,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}
