import { FontAwesome } from "@expo/vector-icons";
import {
  BottomSheetContext,
  BottomSheetContextType,
  Button,
} from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const DonationDetails = ({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}) => {
  const { title, description, donatedBy, donationId } = route.params;

  // Info modal context
  const { setContent } = useContext<BottomSheetContextType>(BottomSheetContext);

  // Dispatch modal content
  const setModal = () => {
    setContent(
      <Text style={textStyles.body}>
        When reserving this meal, you will receive a QR code. Show this code at
        the restaurant to pick up the free meal. Reservations are valid for 24
        hours.
      </Text>,
      { title: "Donation details" }
    );
  };

  // Reserve donation
  const handleReservation = () => {
    setContent(
      <View>
        <Text style={[textStyles.body, { marginBottom: theme.spacing.md }]}>
          This reservation will be valid for 24 hours.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            style={{
              flex: 1,
              marginRight: 4,
              backgroundColor: theme.colors.text_link,
            }}
            label="Reserve"
          />
          <Button
            onPress={() => setContent(null)}
            style={{ flex: 1, marginLeft: 4 }}
            type="secondary"
            label="Cancel"
          />
        </View>
      </View>,
      { title: "Reserve this meal?" }
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <TouchableOpacity style={styles.titleContainer} onPress={setModal}>
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
        onPress={handleReservation}
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
  // Modal
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
