import { Button, Badge, ImageButton, Item, ItemType } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from "react-native";
import { useState } from "react";

const Inventory = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Button
        label="back"
        size="small"
        type="secondary"
        style={{
          alignSelf: "flex-start",
          marginTop: theme.spacing.sm,
          width: 130,
        }}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.lg,
    flex: 1,
  },
  titleContainer: {
    marginTop: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  notificationContainer: {
    flex: 1,
  },
});

export default Inventory;
