import { Button } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Start = ({ navigation }: { navigation: any }) => {
  // Navigates to main content and removes navigation stack to prevent users from returning to this screen
  const goToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.imageBg}
      source={require("../assets/splash.png")}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.title}>Give a Meal</Text>
            <Text
              style={[textStyles.header_2, { marginBottom: theme.spacing.sm }]}
            >
              Pick up free meals donated by your community
            </Text>
          </View>
          <Button
            style={{ marginBottom: theme.spacing.sm }}
            type="primary"
            label="Find meals"
            onPress={goToMain}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: theme.colors.bg_brand,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    maxHeight: "65%",
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
});

export default Start;
