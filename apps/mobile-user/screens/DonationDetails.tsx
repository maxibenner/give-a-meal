import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheetContext } from "@give-a-meal/ui";
import { useContext } from "react";

export const DonationDetails = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const { title, description, donatedBy } = route.params;

  // Info modal context
  const { content, setContent } = useContext<any>(BottomSheetContext);

  // Dispatch modal content
  const toggleModal = () => {
    console.log(content);
    if (!content) {
      setContent(
        <View>
          <Text
            style={[textStyles.label_button, { marginBottom: theme.spacing.xs }]}
          >
            Donation details
          </Text>
          <Text style={textStyles.body}>
            When reserving this meal, you will receive a QR code. Show this code
            at the restaurant to pick up the meal for free. Reservations are
            valid for 24 hours.
          </Text>
        </View>
      );
    } else {
      setContent(null);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <TouchableOpacity style={styles.titleContainer} onPress={toggleModal}>
          <Text style={styles.title}>Donation details</Text>
          <FontAwesome
            name="question-circle"
            size={theme.fontSizes.reg}
            color={theme.colors.text_primary_dark_60}
          />
        </TouchableOpacity>
        <Text style={styles.donationTitle}>{title}</Text>
        <Text style={styles.subCategory}>Description</Text>
        <Text style={styles.body}>{description}</Text>
        <Text style={styles.subCategory}>Donated by</Text>
        <Text style={styles.body}>{donatedBy}</Text>
      </View>
      <Button
        style={{ backgroundColor: theme.colors.text_link }}
        label="Reserve this meal"
      />
    </SafeAreaView>
  );
};

export default DonationDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: "column",
    justifyContent: "space-between",
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
  donationTitle: {
    ...textStyles.header_3,
    marginBottom: theme.spacing.lg,
  },
  subCategory: {
    ...textStyles.label_button,
    marginBottom: theme.spacing.xxs,
  },
  body: {
    ...textStyles.body,
    color: theme.colors.text_primary_dark_60,
    marginBottom: theme.spacing.md,
  },
});
