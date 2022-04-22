import { Button, TextInput, ListElement, Divider } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const restaurants = [
  { name: "Livite", address: "1644 Brookline Street, MA", partner: false },
  {
    name: "Sauerkraut Shack",
    address: "East 11th Street, New York, NY",
    partner: true,
  },
  {
    name: "Mamalah’s Delicatessen",
    address: "Gartenstraße 5, New York, NY",
    partner: false,
  },
];

const AssociateBusiness = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.wrapper}>
      <Button
        label="Logout"
        size="small"
        type="secondary"
        style={{ alignSelf: "flex-end", marginTop: theme.spacing.sm }}
      />
      <Text style={[textStyles.header_2, { marginTop: theme.spacing.lg }]}>
        Welcome to
      </Text>
      <Text style={textStyles.header_2}>Give a Meal 🎉</Text>
      <Text style={[textStyles.body, { marginTop: theme.spacing.sm }]}>
        Please find the restaurant you work at and connect your account to it.
      </Text>
      <TextInput
        onChangeText={(v) => setSearchQuery(v)}
        label="Find restaurant"
        style={{ marginTop: theme.spacing.lg }}
      />
      {searchQuery.length > 0 && (
        <View style={styles.listContainer}>
          {restaurants.map((restaurant, i) => (
            <>
              <TouchableOpacity>
                <ListElement
                  key={restaurant.address}
                  firstLine={restaurant.name}
                  secondLine={restaurant.address}
                  titleIcon={
                    restaurant.partner && (
                      <Ionicons
                        name="checkmark-circle"
                        size={theme.fontSizes.reg}
                        color={theme.colors.text_primary_dark}
                      />
                    )
                  }
                />
              </TouchableOpacity>
              {i + 1 < restaurants.length && (
                <Divider spacing={theme.spacing.sm} />
              )}
            </>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.lg,
  },
  listContainer: {
    backgroundColor: theme.colors.bg_white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.regular,
    marginTop: theme.spacing.xs,
  },
});

export default AssociateBusiness;
