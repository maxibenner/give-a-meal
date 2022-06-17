import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import uuid4 from "uuid4";

// Context ---------  Context ---------  Context ---------  Context ---------
export const ClaimIdContext = createContext<ClaimIdContextType>(null);
export type ClaimIdContextType = string | null;

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function ClaimIdProvider({ children }: { children: ReactNode }) {
  const [claimId, setClaimId] = useState<ClaimIdContextType | null>(null);

  useEffect(() => {
    initId();
  }, []);

  const initId = async () => {
    try {
      const value = await AsyncStorage.getItem("CLAIM_ID");
      if (value !== null) {
        setClaimId(value);
      } else {
        const id = uuid4();
        setClaimId(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClaimIdContext.Provider value={claimId}>
      {children}
    </ClaimIdContext.Provider>
  );
}
