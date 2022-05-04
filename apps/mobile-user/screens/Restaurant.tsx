import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DonationType } from "@give-a-meal/sdk";
import { BottomSheetContext, Icon } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheetContextType } from "@give-a-meal/ui";

export const Restaurant = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const {
    name,
    address,
    donations,
    distance,
  }: { distance: number; name: string; address: string; donations: [] } =
    route.params;

  const { setContent } = useContext<BottomSheetContextType>(BottomSheetContext);

  // Dispatch modal content
  const setModal = () => {
    setContent(
      <Text style={textStyles.body}>
        {`These are all the free meals available at ${name}. Tap any of them to learn more.`}
      </Text>,
      { title: "Restaurant details" }
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.contentTop}>
        <TouchableOpacity style={styles.titleContainer} onPress={setModal}>
          <Text style={styles.title}>Restaurant details</Text>
          <FontAwesome
            name="question-circle"
            size={theme.fontSizes.reg}
            color={theme.colors.text_primary_dark_60}
          />
        </TouchableOpacity>
        <Text style={styles.restaurantName}>{name}</Text>
        <View style={styles.addressContainer}>
          <Icon name="ruler" />
          <Text style={{ marginLeft: theme.spacing.xs }}>{address}</Text>
        </View>
        <View style={styles.distanceContainer}>
          <Icon name="pin" />
          <Text style={{ marginLeft: theme.spacing.xs }}>
            {distance + " miles away"}
          </Text>
        </View>
        <Text style={styles.header}>Available Meals</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {donations.map((donation: DonationType, i: number) => (
          <TouchableOpacity
            key={donation.donation_id}
            style={[
              styles.donationContainer,
              {
                marginBottom: donations.length >= i ? theme.spacing.xs : 0,
              },
            ]}
            onPress={() =>
              navigation.navigate("DonationDetails", {
                title: donation.title,
                description: donation.description,
                donatedBy: donation.donor_name,
                donationId: donation.donation_id,
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
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  contentTop: {
    flexDirection: "column",
    marginHorizontal: theme.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.lg,
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
  restaurantName: {
    ...textStyles.header_3,
    marginBottom: theme.spacing.sm,
  },
  addressContainer: {
    ...textStyles.body_sub,
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xxs,
  },
  distanceContainer: {
    ...textStyles.body_sub,
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginTop: theme.spacing.lg,
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
