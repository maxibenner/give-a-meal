import { FontAwesome } from "@expo/vector-icons";
import {
  BusinessType,
  listNearbyDonations,
  LocationContext,
  LocationContextType,
  prettifyMeters,
} from "@give-a-meal/sdk";
import { BottomSheetContext, Button, ToastWithCounter } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheetContextType } from "@give-a-meal/ui";

// Component
export const Search = ({ navigation }: { navigation: any }) => {
  const { location, locationStatus, requestLocation }: LocationContextType =
    useContext(LocationContext);

  // Info modal context
  const { setContent } = useContext<BottomSheetContextType>(BottomSheetContext);

  const [businesses, setBusinesses] = useState<BusinessType[] | [] | null>(
    null
  );

  // Request location on loaded
  useEffect(() => requestLocation(), []);

  // Load donations on location available
  useEffect(() => handleLoadDonations(), [location]);

  // Refresh donations
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => handleLoadDonations(true);

  const handleLoadDonations = (handleRefresh?: boolean) => {
    if (location) {
      handleRefresh && setRefreshing(true);
      listNearbyDonations({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        radius: 9999999999,
      }).then(({ data, error }) => {
        if (data) setBusinesses(data);
        handleRefresh && setRefreshing(false);
      });
    }
  };

  // Dispatch modal content
  const setModal = () =>
    setContent(
      <Text style={textStyles.body}>
        This page shows restaurants with available free meals near you.
        Restaurants closest to you are at the top.
      </Text>,
      { title: "Restaurants nearby" }
    );

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.titleTouchable} onPress={setModal}>
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
          {location && businesses && (
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Text
                style={[
                  textStyles.body,
                  {
                    color: theme.colors.text_primary_dark_60,
                    marginBottom: theme.spacing.md,
                  },
                ]}
              >
                Pull to refresh &darr;
              </Text>
              {/* Donations */}
              {businesses.length > 0 &&
                businesses?.map((business, i) => (
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
                      info={prettifyMeters(business.distance) + " miles away"}
                    />
                    {businesses.length !== i + 1 && (
                      <View style={{ height: theme.spacing.xs }} />
                    )}
                  </TouchableOpacity>
                ))}
              {/* No donations */}
              {businesses && businesses.length === 0 && (
                <View style={styles.locationAccessContainer}>
                  <Text
                    style={[
                      textStyles.header_2,
                      {
                        marginBottom: theme.spacing.xs,
                        maxWidth: 300,
                      },
                    ]}
                  >
                    No meals available
                  </Text>
                  <Text
                    style={[
                      textStyles.body,
                      { marginBottom: theme.spacing.sm },
                    ]}
                  >
                    Unfortuntaley, all meals at your location have been
                    reserved. Please check back later.
                  </Text>
                </View>
              )}
            </ScrollView>
          )}

          {/* Waiting for location */}
          {!location && locationStatus !== "declined" && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fetching location</Text>
              <ActivityIndicator />
            </View>
          )}

          {/* Waiting for donations */}
          {locationStatus === "available" && location && !businesses && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Fetching donations</Text>
              <ActivityIndicator />
            </View>
          )}

          {/* Declined location */}
          {locationStatus === "declined" && (
            <View style={styles.locationAccessContainer}>
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
          {/* {businesses && businesses.length === 0 && (
            <View style={styles.locationAccessContainer}>
              <Text
                style={[
                  textStyles.header_2,
                  { marginBottom: theme.spacing.xs, maxWidth: 300 },
                ]}
              >
                Oh no
              </Text>
              <Text
                style={[textStyles.body, { marginBottom: theme.spacing.sm }]}
              >
                Unfortuntaley all nearby meals have been reserved. Please check
                back later.
              </Text>
            </View>
          )} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: theme.spacing.md,
  },
  locationAccessContainer: {
    flex: 1,
    height: 320,
    justifyContent: "center",
    opacity: 0.5,
  },
  // Other
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    ...textStyles.body_sub,
    color: theme.colors.text_primary_dark_60,
    marginBottom: theme.spacing.xs,
  },
});

export default Search;
