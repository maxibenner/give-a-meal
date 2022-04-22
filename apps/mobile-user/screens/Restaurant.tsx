import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";

export const Restaurant = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const { name, address, donations } = route.params;

  return (
    <SafeAreaView>
      <View style={styles.contentTop}>
        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>Restaurant details</Text>
          <FontAwesome
            name="question-circle"
            size={theme.fontSizes.reg}
            color={theme.colors.text_primary_dark_60}
          />
        </TouchableOpacity>
        <Text style={styles.restaurantName}>{name}</Text>
        <View style={styles.addressContainer}>
          <MaterialIcons name="location-pin" size={17} color="black" />
          <Text style={{ marginLeft: theme.spacing.xxs }}>{address}</Text>
        </View>
        <Text style={styles.header}>Available Meals</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {donations.map(
          (
            donation: {
              title: string;
              description: string;
              donatedBy: string;
              id: string;
            },
            i: number
          ) => (
            <TouchableOpacity
              key={donation.id}
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
                  donatedBy: donation.donatedBy,
                })
              }
            >
              <Text style={styles.donationTitle} key={donation.id}>
                {donation.title}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.colors.element_dark_inactive}
              />
            </TouchableOpacity>
          )
        )}
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
    marginBottom: theme.spacing.xs,
  },
  addressContainer: {
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
