import { FontAwesome } from "@expo/vector-icons";
import {
  BusinessType,
  listNearbyBusinessesWithDonations,
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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

// Component
export const Search = ({ navigation }: { navigation: any }) => {
  // Contexts
  const { location, locationStatus, requestLocation }: LocationContextType =
    useContext(LocationContext);
  const [businessesWithDonations, setBusinessesWithDonations] = useState<
    BusinessType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // State
  const [infoModal, setInfoModal] = useState(false);

  // Request location on loaded
  useEffect(() => {
    console.log("Requesting location");
    requestLocation();
  }, []);

  // Load data after switching screen
  useFocusEffect(
    useCallback(() => {
      console.log("Location Status " + locationStatus);
      if (locationStatus === "available") {
        refreshData();
      }
    }, [locationStatus])
  );

  // Load data after location is available
  useEffect(() => {
    if (location) {
      refreshData();
    }
  }, [location]);

  const refreshData = async () => {
    setIsLoading(true);
    if (!location) return;
    const { data, error } = await listNearbyBusinessesWithDonations({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      radius: 9999999999,
    });
    setIsLoading(false);
    if (error) {
      return console.log(error);
    }
    setBusinessesWithDonations(data);
  };

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
      <SafeAreaView
        style={[
          styles.pageWrapper,
          {
            paddingTop: Platform.OS === "android" ? theme.spacing.lg : 0,
          },
        ]}
      >
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
                <ScrollView style={styles.scrollView}>
                  {/* Donations */}
                  {businessesWithDonations.length > 0 &&
                    businessesWithDonations?.map((business, i) => (
                      <TouchableOpacity
                        key={business.business_id}
                        onPress={() =>
                          navigation.navigate("Restaurant", {
                            id: business.business_id,
                            name: business.business_name,
                            address: `${business.address}, ${business.city}`,
                            distance: prettifyMeters(business.distance),
                          })
                        }
                      >
                        <ToastWithCounter
                          counter={business.donations.length}
                          counterLabel={
                            business.donations.length > 1 ? "Meals" : "Meal"
                          }
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
                  <View style={{ height: theme.spacing.lg }} />
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
              isLoading &&
              businessesWithDonations.length === 0 && (
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
            {!isLoading && businessesWithDonations.length === 0 && (
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
                  onPress={() => refreshData()}
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
    // marginHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    flexDirection: "column",
    height: "100%",
  },
  // Title
  titleContainer: {
    marginHorizontal: theme.spacing.md,
  },
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
    paddingHorizontal: theme.spacing.md,
  },
  messageContainer: {
    flex: 1,
    // paddingBottom: "50%",
    justifyContent: "center",
  },
});

export default Search;
