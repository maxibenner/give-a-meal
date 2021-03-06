import { useState, useEffect } from "react";
import { supabase } from "../constants/supabase";
import { listClaimedDonations } from "../functions/donations";

/**
 * Subscribe to changes in the claimed donations
 * @param claimId Id that has been used to claim the donations
 * @deprecated Will be removed in a future release
 */
// export const useClaimedDonations = (claimId: string | null) => {
//   const [claimedDonations, setClaimedDonations] = useState<any[]>([]);
//   const [donationsLoading, setDonationsLoading] = useState(true);

//   useEffect(() => {
//     if (!claimId) return;

//     // Initial fetch
//     getData(claimId);

//     // Subscribe to changes
//     const donations = supabase
//       // .from(`donations:claimed_by=eq.${claimId}`)
//       .from("donations")
//       .on("UPDATE", () => {
//         getData(claimId);
//         console.log("Donations updated by subscription.");
//       })
//       .subscribe();

//     return () => {
//       supabase.removeSubscription(donations);
//     };
//   }, [claimId]);

//   const getData = (claimId: string) => {
//     listClaimedDonations(claimId).then(({ data, error }) => {
//       if (data) {
//         // End loading state
//         donationsLoading && setDonationsLoading(false);

//         // Set donations
//         setClaimedDonations(data);
//       }
//     });
//   };

//   return {
//     claimedDonations: claimedDonations,
//     donationsLoading: donationsLoading,
//   };
// };
