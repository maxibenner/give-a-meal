import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Start from "./screens/Start";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import AssociateBusiness from "./screens/AssociateBusiness";
import VerifyBusiness from "./screens/VerifyBusiness";
import Home from "./screens/Home";
import Inventory from "./screens/Inventory";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "@give-a-meal/ui/theme";
import { StatusBar } from "expo-status-bar";
import { navigationRef } from "./components/menu/Menu";
import { MenuProvider } from "./components/menu/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <NavigationContainer ref={navigationRef}>
        {/* <AuthStack /> */}

        {/* <AssociateBusiness /> */}
        {/* <VerifyBusiness /> */}

        <MainStack />
      </NavigationContainer>
    </View>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Get Started"
      screenOptions={{
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: theme.colors.text_primary_dark,
      }}
    >
      <Stack.Screen
        name="Get Started"
        component={Start}
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="Sign In"
        component={SignIn}
        options={{
          headerTitleStyle: {
            color: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={{
          headerTitleStyle: {
            color: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => (
  <MenuProvider>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: theme.colors.text_primary_dark,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ test: "Test" }}
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  </MenuProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.bg_main,
  },
});
