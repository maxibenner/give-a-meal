import { QRVoucher, BottomSheetContextType } from "@give-a-meal/ui";
import { useEffect, useState } from "react";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { reservedMeals } from "../mock-data/reservedMeals";
import { listClaimedDonations } from "@give-a-meal/sdk";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetContext } from "@give-a-meal/ui";
import { useContext } from "react";

const { width } = Dimensions.get("window");

// Measurements
const ITEM_SIZE = width - theme.spacing.md * 2;
const EMPTY_ITEM_SIZE = theme.spacing.md;

export const Reserved = () => {
  const [meals, setMeals] = useState<any>();

  useEffect(() => {
    listClaimedDonations("001").then(({ data, error }) => {
      if (data) {
        // Set data and add spacers for correct display of scrollview
        setMeals([{ id: "001" }, ...data, { id: "002" }]);
      }
    });
  }, [reservedMeals]);

  // Info modal context
  const { setContent } = useContext<BottomSheetContextType>(BottomSheetContext);

  // Dispatch modal content
  const setModal = () => {
    setContent(
      <Text style={textStyles.body}>
        Show this QR code at the restaurant displayed on the card to pick up the
        meal for free.
      </Text>,
      { title: "Reserved meals" }
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity style={styles.titleContainer} onPress={setModal}>
        <Text style={styles.title}>Reserved meals</Text>
        <FontAwesome
          name="question-circle"
          size={theme.fontSizes.reg}
          color={theme.colors.text_primary_dark_60}
        />
      </TouchableOpacity>

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
            return <View key={item.id} style={{ width: EMPTY_ITEM_SIZE }} />;
          } else {
            return (
              <View style={styles.voucherContainer} key={item.id}>
                <QRVoucher
                  style={styles.voucher}
                  title={item.item_id.title}
                  address={`${item.item_id.business_id.address}, ${item.item_id.business_id.city}`}
                  fullAddress={`${item.item_id.business_id.address}, ${item.item_id.business_id.city} ${item.item_id.business_id.country}`}
                  businessName={item.item_id.business_id.business_name}
                />
              </View>
            );
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Reserved;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
  voucherContainer: {
    width: ITEM_SIZE,
    alignItems: "center",
  },
  voucher: {
    width: ITEM_SIZE * 0.95,
  },
});
