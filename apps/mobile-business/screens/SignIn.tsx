import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { TextInput, Button } from "@give-a-meal/ui";

const SignIn = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.wrapper}>
        <Text style={[textStyles.header_2, { marginBottom: theme.spacing.md }]}>
          Sign in
        </Text>
        <TextInput label="Email" style={{ marginBottom: theme.spacing.sm }} />
        <TextInput label="Password" secureTextEntry={true} />
        <TouchableOpacity style={{ marginTop: theme.spacing.xs }}>
          <Text style={[textStyles.body, styles.passwordReset]}>
            Reset password
          </Text>
        </TouchableOpacity>
        <Button
          style={{ marginTop: theme.spacing.md }}
          type="primary"
          label="Sign in"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={styles.bottomLink}>
            <Text style={textStyles.body}>Don’t have an account? </Text>
            <Text style={[textStyles.body, { color: theme.colors.text_link }]}>
              Create one
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

export default SignIn;
