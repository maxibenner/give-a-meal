import { FontAwesome } from "@expo/vector-icons";
import { ToastWithCounter } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Mock data
import { restaurants } from "../mock-data/restaurantsNearby";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const Search = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>Restaurants nearby</Text>
          <FontAwesome
            name="question-circle"
            size={theme.fontSizes.reg}
            color={theme.colors.text_primary_dark_60}
          />
        </TouchableOpacity>
        <Text
          style={[
            textStyles.body,
            { color: theme.colors.text_primary_dark_60 },
          ]}
        >
          Pull to refresh &darr;
        </Text>
      </View>
      <ScrollView
        style={{ height: 400, padding: theme.spacing.md }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {restaurants.map((restaurant, i) => (
          <TouchableOpacity
            key={restaurant.id}
            onPress={() =>
              navigation.navigate("Restaurant", {
                name: restaurant.title,
                address: restaurant.address,
                donations: restaurant.donations,
              })
            }
          >
            <ToastWithCounter
              counter={restaurant.donations.length}
              counterLabel="Meals"
              title={restaurant.title}
              info={restaurant.address}
            />
            {restaurants.length !== i + 1 && (
              <View style={{ height: theme.spacing.xs }} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
});

export default Search;
