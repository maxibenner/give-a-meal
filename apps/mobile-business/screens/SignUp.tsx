import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { TextInput, Button } from "@give-a-meal/ui";

const SignUp = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.wrapper}>
        <Text style={[textStyles.header_2, { marginBottom: theme.spacing.md }]}>
          Create account
        </Text>
        <TextInput label="Email" style={{ marginBottom: theme.spacing.sm }} />
        <TextInput secureTextEntry={true} label="Password" />
        <Button
          style={{ marginTop: theme.spacing.md }}
          type="primary"
          label="Sign up"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.bottomLink}>
            <Text style={textStyles.body}>Already have an account? </Text>
            <Text style={[textStyles.body, { color: theme.colors.text_link }]}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.bg_main,
    flex: 1,
  },
  wrapper: {
    margin: theme.spacing.lg,
  },
  passwordReset: { color: theme.colors.text_link, textAlign: "right" },
  bottomLink: {
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
});

export default SignUp;
