import { FontAwesome } from "@expo/vector-icons";
import {
  ActivityIndicatorText,
  Button,
  QRVoucher,
  BottomSheet,
} from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { DonationContext } from "../context/donationContext";
import { useClaimedDonations } from "@give-a-meal/sdk";
import { ClaimIdContext } from "@give-a-meal/sdk";

const { width } = Dimensions.get("window");

// Measurements
const ITEM_SIZE = width - theme.spacing.md * 2;
const EMPTY_ITEM_SIZE = theme.spacing.md;

export const Reserved = () => {
  const [meals, setMeals] = useState<any>([]);
  const claimId = useContext(ClaimIdContext);
  const { donationsLoading, claimedDonations } = useClaimedDonations(claimId);

  useEffect(() => {
    // Set data and add spacers for correct display of scrollview
    setMeals([{ id: "001" }, ...claimedDonations, { id: "002" }]);
  }, [claimedDonations]);

  // Modals
  const [infoModal, setInfoModal] = useState(false);

  // Animations
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    if (!donationsLoading) {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [donationsLoading]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <BottomSheet
        active={infoModal}
        onCloseRequest={() => setInfoModal(false)}
        title="Reserved meals"
      >
        <Text style={textStyles.body}>
          Show this QR code at the restaurant displayed on the card to pick up
          the meal for free.
        </Text>
      </BottomSheet>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => setInfoModal(true)}
      >
        <Text style={styles.title}>Reserved meals</Text>
        <FontAwesome
          name="question-circle"
          size={theme.fontSizes.reg}
          color={theme.colors.text_primary_dark_60}
        />
      </TouchableOpacity>

      <View style={styles.contentWrapper}>
        {/* Loading */}
        {donationsLoading && (
          <ActivityIndicatorText text="Fetching reserved meals" />
        )}

        {/* Display reservations */}
        {!donationsLoading && meals.length > 2 && (
          <FlatList
            data={meals}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            scrollEventThrottle={16}
            contentContainerStyle={{ alignItems: "center" }}
            decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              if (typeof item.id === "string") {
                // Placeholders
                return (
                  <View key={item.id} style={{ width: EMPTY_ITEM_SIZE }} />
                );
              } else {
                // Voucher
                return (
                  <Animated.View
                    style={[
                      styles.voucherContainer,
                      {
                        opacity: opacity,
                        transform: [{ translateY: translateY }],
                      },
                    ]}
                    key={item.id}
                  >
                    <QRVoucher
                      style={styles.voucher}
                      // onCancel={() => handleCancel(item.id)}
                      updatedAt={item.updated_at}
                      title={item.item_id.title}
                      donationId={item.id}
                      address={`${item.item_id.business_id.address}, ${item.item_id.business_id.city}`}
                      fullAddress={`${item.item_id.business_id.address}, ${item.item_id.business_id.city} ${item.item_id.business_id.country}`}
                      businessName={item.item_id.business_id.business_name}
                    />
                  </Animated.View>
                );
              }
            }}
          />
        )}

        {/* No reservations */}
        {!donationsLoading && meals.length === 2 && (
          <View style={styles.phContainer}>
            <Image
              style={styles.phImage}
              source={require("../assets/donation_placeholder.png")}
              resizeMode="contain"
            />
            <Text style={styles.phText}>You did not reserve any meals</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Reserved;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.colors.bg_main,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: theme.spacing.md,
  },
  title: {
    ...textStyles.label_button,
    color: theme.colors.text_primary_dark_60,
    marginRight: 6,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  voucherContainer: {
    width: ITEM_SIZE,
    alignItems: "center",
  },
  voucher: {
    width: ITEM_SIZE * 0.95,
  },
  // Modal
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  // Placeholder
  phContainer: {
    alignItems: "center",
  },
  phImage: {
    height: 150,
    width: 150,
    opacity: 0.8,
    transform: [{ rotate: "10deg" }],
  },
  phText: {
    ...textStyles.header_4,
    marginTop: theme.spacing.md,
    color: theme.colors.element_dark_inactive,
    textAlign: "center",
    maxWidth: "60%",
  },
});
