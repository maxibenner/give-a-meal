import { Button, Badge, ImageButton, Item, ItemType } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from "react-native";
import { useState, useContext } from "react";
import { MenuContext } from "../components/menu/Menu";

const business = {
  name: "Livite",
  address: "1644 Brookline Street, MA",
};

const notifications: ItemType[] = [
  {
    id: "425jhkh342jkhk2345",
    title: "New donation",
    info: "Sandwich of Choice",
    type: "donation_added",
  },
  {
    id: "425shkh345jkhk2345",
    title: "Donation redeemed",
    info: "Vegan Salad",
    type: "donation_redeemed",
  },
  {
    id: "425jhoh345jkhk2345",
    title: "Staff request",
    info: "giuliabnagle@gmail.com",
    type: "team_request",
  },
  {
    id: "425jhoh345jkhk23t5",
    title: "Staff request",
    info: "giuliabnagle@gmail.com",
    type: "team_request",
  },
];

const Home = () => {
  // Track notification limit for currents creen size
  const [notificationLimit, setNotificationLimit] = useState(0);

  // Calculate how manu notificaitons can fit inside the container without scrolling
  // NOTE: Based on preset notification height. Maybe change to dynamic in the future.F
  const calculateNumberOfNotifications = (e: LayoutChangeEvent) => {
    // Height of notification container
    const containerHeight = e.nativeEvent.layout.height;

    // Divide by height of notification plus gap
    const fittingNotifications = Math.floor(containerHeight / 100);

    setNotificationLimit(fittingNotifications);
  };

  // Controll menu
  const { setIsOpen } = useContext(MenuContext);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Button
        label="Menu"
        size="small"
        type="secondary"
        style={{
          alignSelf: "flex-start",
          marginTop: theme.spacing.sm,
          width: 130,
        }}
        onPress={() => setIsOpen(true)}
      />

      {/* Business information */}
      <View>
        <View style={styles.titleContainer}>
          <Text style={textStyles.header_3}>{business.name}</Text>
          <Badge label="Owner" style={{ marginLeft: theme.spacing.xs }} />
        </View>
        <Text style={textStyles.body}>{business.address}</Text>
      </View>

      {/* Main action buttons */}
      <View style={[styles.buttonContainer, { marginTop: theme.spacing.lg }]}>
        <ImageButton
          label="Scan Card"
          imgSrc={require("../assets/voucher.png")}
          backgroundColor={theme.colors.bg_blue}
          style={{ marginRight: theme.spacing.xs }}
        />
        <ImageButton
          label="Add Donation"
          imgSrc={require("../assets/addDonation.png")}
          backgroundColor={theme.colors.bg_brand}
          style={{ marginLeft: theme.spacing.xs }}
          imgHeight={70}
        />
      </View>

      {/* Notification previews */}
      <Text
        style={[
          textStyles.header_4,
          { marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
        ]}
      >
        Recent notifications
      </Text>
      <View
        style={styles.notificationContainer}
        onLayout={(e) => calculateNumberOfNotifications(e)}
      >
        {notifications.map(
          (n, i) =>
            // Make sure that notifications will fit screen without scrolling
            i < notificationLimit && (
              <Item
                title={n.title}
                info={n.info}
                type={n.type}
                key={n.id}
                style={{
                  marginBottom:
                    i + 1 < notifications.length ? theme.spacing.xs : 0,
                }}
              />
            )
        )}
      </View>
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

export default Home;
