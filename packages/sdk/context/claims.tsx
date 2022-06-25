import React, { createContext, ReactNode, useEffect, useState } from "react";
import uuid4 from "uuid4";
import { DonationType } from "../functions/donations";
import { listClaimedDonations } from "../functions/donations";
import { AsyncStorage } from "react-native";

// Context ---------  Context ---------  Context ---------  Context ---------
export const ClaimsContext = createContext<{
  claimId: string | null;
  claimedDonations: DonationType[] | [] | null;
  refreshClaimedDonations: () => void;
  setClaimedDonationsDirectly: (claimedDonations: DonationType[]) => void;
}>(null);

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claimId, setClaimId] = useState<string | null>(null);
  const [claimedDonations, setClaimedDonations] = useState<DonationType[] | []>(
    []
  );

  useEffect(() => {
    initId();
  }, []);

  useEffect(() => {
    if (claimId) refreshClaimedDonations();
  }, [claimId]);

  const initId = async () => {
    try {
      const value = await AsyncStorage.getItem("CLAIM_ID");
      if (value !== null) {
        setClaimId(value);
      } else {
        const id = uuid4();
        setClaimId(id);
        await AsyncStorage.setItem("CLAIM_ID", id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshClaimedDonations = async () => {
    const { data, error } = await listClaimedDonations(claimId);
    setClaimedDonations(data);
    return;
  };

  const setClaimedDonationsDirectly = (data: DonationType[]) => {
    setClaimedDonations(data);
  };

  return (
    <ClaimsContext.Provider
      value={{
        claimId,
        claimedDonations,
        setClaimedDonationsDirectly,
        refreshClaimedDonations,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
}
