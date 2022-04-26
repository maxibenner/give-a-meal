import { FontAwesome } from "@expo/vector-icons";
import { ToastWithCounter } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useCallback, useState, useContext, ReactNode, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheetContext } from "@give-a-meal/ui";

// Mock data
import { restaurants } from "../mock-data/restaurantsNearby";

// PLACEHOLDER ############
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// ########################

export const Search = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // Info modal context
  const { content, setContent } = useContext<any>(BottomSheetContext);

  // Dispatch modal content
  const toggleModal = () => {
    if (!content) {
      setContent(
        <View>
          <Text
            style={[
              textStyles.label_button,
              { marginBottom: theme.spacing.xs },
            ]}
          >
            Restaurants nearby
          </Text>
          <Text style={textStyles.body}>
            This page shows restaurants with available free meals near you.
            Restaurants closest to you are at the top.
          </Text>
        </View>
      );
    } else {
      setContent(null);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.titleContainer} onPress={toggleModal}>
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
