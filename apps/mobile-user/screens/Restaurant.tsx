import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DonationType } from "@give-a-meal/sdk";
import { BottomSheet, Icon } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useEffect, useState, useCallback } from "react";
import { StatusBar, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAvailableDonations } from "@give-a-meal/sdk";

export const Restaurant = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const {
    id,
    name,
    address,
    distance,
  }: {
    id: number;
    distance: number;
    name: string;
    address: string;
  } = route.params;

  const [infoModal, setInfoModal] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const insets = useSafeAreaInsets();
  // const [isLoading, setIsLoading] = useState(true);

  // Trigger when showing screen
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    // setIsLoading(true);
    const { data, error } = await getAvailableDonations(id);
    // setIsLoading(false);
    if (error) return console.log(error);
    if (data) setDonations(data);
  };

  return (
    <>
      {/* Modal */}
      <BottomSheet
        title="Available free meals"
        active={infoModal}
        onCloseRequest={() => setInfoModal(false)}
      >
        <Text style={textStyles.body}>
          {`You can reserve any of these meals for free and pick them up at ${name}.`}
        </Text>
      </BottomSheet>

      {/* Main content */}
      <SafeAreaView style={[styles.wrapper, { marginBottom: -insets.bottom }]}>
        <View style={styles.contentTop}>
          <Text style={styles.restaurantName}>{name}</Text>
          <View style={styles.addressContainer}>
            <Icon name="ruler" />
            <Text style={{ marginLeft: theme.spacing.xs }}>{address}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Icon name="pin" />
            <Text style={{ marginLeft: theme.spacing.xs }}>{distance}</Text>
          </View>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => setInfoModal(true)}
          >
            <Text style={styles.title}>Available free meals</Text>
            <FontAwesome
              name="question-circle"
              size={theme.fontSizes.reg}
              color={theme.colors.text_primary_dark_60}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {donations.map(
            (donation: DonationType & { id: number }, i: number) => (
              <TouchableOpacity
                key={donation.id}
                style={[
                  styles.donationContainer,
                  {
                    marginBottom: donations.length >= i ? theme.spacing.xs : 0,
                  },
                ]}
                onPress={() =>
                  navigation.navigate("Donation Details", {
                    title: donation.title,
                    description: donation.description,
                    donatedBy: donation.donor_name,
                    donationId: donation.id,
                  })
                }
              >
                <Text style={styles.donationTitle}>{donation.title}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={theme.colors.element_dark_inactive}
                />
              </TouchableOpacity>
            )
          )}
          <View style={{ height: theme.spacing.lg + insets.bottom }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.bg_main,
    flex: 1,
  },
  contentTop: {
    flexDirection: "column",
    marginHorizontal: theme.spacing.md,
  },
  restaurantName: {
    ...textStyles.header_3,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  addressContainer: {
    ...textStyles.body_sub,
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  distanceContainer: {
    ...textStyles.body_sub,
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: theme.spacing.lg + 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
  scrollView: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    flexDirection: "column",
  },
  donationContainer: {
    paddingHorizontal: 23,
    paddingVertical: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.bg_white,
    borderRadius: theme.borderRadius.regular,
  },
  donationTitle: {
    ...textStyles.label_button,
  },
});
