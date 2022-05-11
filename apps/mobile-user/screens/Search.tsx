import { FontAwesome } from "@expo/vector-icons";
import {
  LocationContext,
  LocationContextType,
  prettifyMeters,
} from "@give-a-meal/sdk";
import {
  ActivityIndicatorText,
  BottomSheet,
  Button,
  ToastWithCounter,
} from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DonationContext } from "../context/donationContext";

// Component
export const Search = ({ navigation }: { navigation: any }) => {
  // Contexts
  const { location, locationStatus, requestLocation }: LocationContextType =
    useContext(LocationContext);
  const { refreshBusinesses, businessesWithDonations, businessesLoading } =
    useContext(DonationContext);

  // State
  const [infoModal, setInfoModal] = useState(false);

  // Handle pull-to-refresh indicator
  const [refreshingManually, setRefreshingManually] = useState(false);
  const handleManualRefresh = async () => {
    if (location) {
      setRefreshingManually(true);
      refreshBusinesses && (await refreshBusinesses());
      setRefreshingManually(false);
    }
  };

  // Request location on loaded
  useEffect(() => requestLocation(), []);

  return (
    <>
      {/* Modal */}
      <BottomSheet
        active={infoModal}
        onCloseRequest={() => setInfoModal(false)}
        title="Restaurants nearby"
      >
        <Text style={textStyles.body}>
          This page shows restaurants with available free meals near you.
          Restaurants closest to you are at the top.
        </Text>
      </BottomSheet>

      {/* Main content */}
      <SafeAreaView style={styles.pageWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              style={styles.titleTouchable}
              onPress={() => setInfoModal(true)}
            >
              <Text style={styles.title}>Restaurants nearby</Text>
              <FontAwesome
                name="question-circle"
                size={theme.fontSizes.reg}
                color={theme.colors.text_primary_dark_60}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {/* Location available and donations loaded */}
            {location &&
              businessesWithDonations &&
              businessesWithDonations.length > 0 && (
                <ScrollView
                  style={styles.scrollView}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingManually}
                      onRefresh={() => handleManualRefresh()}
                    />
                  }
                >
                  {/* Donations */}
                  {businessesWithDonations.length > 0 &&
                    businessesWithDonations?.map((business, i) => (
                      <TouchableOpacity
                        key={business.business_id}
                        onPress={() =>
                          navigation.navigate("Restaurant", {
                            name: business.business_name,
                            address: `${business.address}, ${business.city}`,
                            donations: business.donations,
                            distance: prettifyMeters(business.distance),
                          })
                        }
                      >
                        <ToastWithCounter
                          counter={business.donations.length}
                          counterLabel="Meals"
                          title={business.business_name}
                          info={
                            prettifyMeters(business.distance) + " miles away"
                          }
                        />
                        {businessesWithDonations.length !== i + 1 && (
                          <View style={{ height: theme.spacing.xs }} />
                        )}
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              )}

            {/* Waiting for location */}
            {!location && locationStatus !== "declined" && (
              <ActivityIndicatorText
                style={{ position: "absolute", alignSelf: "center" }}
                text="Fetching location"
              />
            )}

            {/* Waiting for businesses */}
            {locationStatus === "available" &&
              location &&
              businessesLoading &&
              !refreshingManually && (
                <ActivityIndicatorText
                  style={{ position: "absolute", alignSelf: "center" }}
                  text="Fetching donations"
                />
              )}

            {/* Declined location */}
            {locationStatus === "declined" && (
              <View style={styles.messageContainer}>
                <Text
                  style={[
                    textStyles.header_2,
                    { marginBottom: theme.spacing.xs, maxWidth: 300 },
                  ]}
                >
                  Please enable location access
                </Text>
                <Text
                  style={[textStyles.body, { marginBottom: theme.spacing.sm }]}
                >
                  We only use your location to show you free meals nearby. We
                  never store your location and we never show it to anyone else.
                </Text>
                <Button
                  onPress={() => requestLocation(true)}
                  style={{ backgroundColor: theme.colors.text_link }}
                  label="Enable location access"
                />
              </View>
            )}

            {/* No donations */}
            {!businessesLoading && businessesWithDonations.length === 0 && (
              <View style={styles.messageContainer}>
                <Text
                  style={[
                    textStyles.header_2,
                    {
                      marginBottom: theme.spacing.xs,
                      maxWidth: 300,
                    },
                  ]}
                >
                  No nearby meals
                </Text>
                <Text
                  style={[textStyles.body, { marginBottom: theme.spacing.sm }]}
                >
                  All nearby meals have been reserved. We are working hard to
                  get more donations onto the platform.
                </Text>
                <Button
                  type="secondary"
                  label="Refresh"
                  onPress={() => refreshBusinesses && refreshBusinesses()}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    backgroundColor: theme.colors.bg_main,
  },
  wrapper: {
    marginHorizontal: theme.spacing.md,
    flexDirection: "column",
    height: "100%",
  },
  // Title
  titleContainer: {},
  titleTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
  // Content
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
  },
  messageContainer: {
    flex: 1,
    // paddingBottom: "50%",
    justifyContent: "center",
  },
});

export default Search;
