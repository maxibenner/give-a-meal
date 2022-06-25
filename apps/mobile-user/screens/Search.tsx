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
      if (location) refreshData();
      return undefined;
    }, [location])
  );

  const refreshData = async () => {
    if (!location) return;
    setIsLoading(true);
    const { data, error } = await listNearbyBusinessesWithDonations({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      // radius: 10000,
      radius: 9999999,
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
          This page shows nearby restaurants with available free meals.
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
                            donations: business.donations,
                          })
                        }
                      >
                        <ToastWithCounter
                          counter={business.donations.length}
                          counterLabel={
                            business.donations.length > 1 ? "Meals" : "Meal"
                          }
                          title={business.business_name}
                          info={prettifyMeters(business.distance)}
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
              <View style={styles.messagesWrapper}>
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
                    style={[
                      textStyles.body,
                      { marginBottom: theme.spacing.sm },
                    ]}
                  >
                    We only use your location to show you free meals nearby. We
                    never store your location and we never show it to anyone
                    else.
                  </Text>
                  <Button
                    onPress={() => requestLocation(true)}
                    style={{ backgroundColor: theme.colors.text_link }}
                    label="Enable location access"
                  />
                </View>
              </View>
            )}

            {/* No donations */}
            {!isLoading && businessesWithDonations.length === 0 && (
              <View style={styles.messagesWrapper}>
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
                    style={[
                      textStyles.body,
                      { marginBottom: theme.spacing.sm },
                    ]}
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
  messagesWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
  },
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
