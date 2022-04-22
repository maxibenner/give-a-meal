import { Button, TextInput } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const business = {
  name: "Peacefood Uptown",
  address: "East 11th Street, New York, NY",
};

const VerifyBusiness = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={[textStyles.header_2, { marginTop: theme.spacing.xl }]}>
        Please give us
      </Text>
      <Text style={textStyles.header_2}>a moment</Text>
      <Text style={[textStyles.body, { marginTop: theme.spacing.md }]}>
        We are verifying your connection to
      </Text>
      <View style={styles.restaurantCard}>
        <Text
          style={[textStyles.label_button, { color: theme.colors.bg_white }]}
        >
          {business.name}
        </Text>
        <Text
          style={[
            textStyles.body_sub,
            {
              marginTop: theme.spacing.xxs,
              color: theme.colors.bg_white,
            },
          ]}
        >
          {business.address}
        </Text>
      </View>
      <Text style={[textStyles.body, { marginTop: theme.spacing.md }]}>
        This may take up to 24 hours.
      </Text>
      <Text style={[textStyles.body, { marginTop: theme.spacing.md }]}>
        You can exit the app while you wait. We will notify you once we are
        done.
      </Text>
      <Button
        type="error"
        style={{ marginTop: theme.spacing.xl }}
        label="Cancel verification"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.lg,
  },
  restaurantCard: {
    marginTop: theme.spacing.md,
    // backgroundColor: theme.colors.bg_white,
    backgroundColor: theme.colors.text_link,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.regular,
  },
});

export default VerifyBusiness;
