import { theme } from "@give-a-meal/ui/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Search from "./screens/Search";
import Start from "./screens/Start";
import Restaurant from "./screens/Restaurant";
import DonationDetails from "./screens/DonationDetails";
import Reserved from "./screens/Reserved";
import MyTabBar from "./navigators/CustomTab";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetProvider } from "@give-a-meal/ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <StatusBar />
              <Stack.Navigator
                initialRouteName="Start"
                screenOptions={{
                  headerTransparent: true,
                  headerStyle: {
                    backgroundColor: "transparent",
                  },
                  headerTintColor: theme.colors.text_link,
                }}
              >
                <Stack.Screen
                  name="Start"
                  options={{
                    headerTintColor: "transparent",
                  }}
                  component={Start}
                />
                <Stack.Screen
                  options={{
                    headerTintColor: "transparent",
                  }}
                  name="MainTabs"
                  component={MainTabs}
                />
                <Stack.Screen
                  options={{
                    headerBackTitle: "back",

                    headerTitleStyle: { color: "transparent" },
                  }}
                  name="Restaurant"
                  component={Restaurant}
                />
                <Stack.Screen
                  options={{
                    headerBackTitle: "back",

                    headerTitleStyle: { color: "transparent" },
                  }}
                  name="DonationDetails"
                  component={DonationDetails}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </BottomSheetProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const MainTabs = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "transparent",
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="search"
              size={18}
              color={
                focused
                  ? theme.colors.text_primary_light
                  : theme.colors.text_primary_dark
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reserved"
        component={Reserved}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="star"
              size={18}
              color={
                focused
                  ? theme.colors.text_primary_light
                  : theme.colors.text_primary_dark
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.bg_main,
  },
});
