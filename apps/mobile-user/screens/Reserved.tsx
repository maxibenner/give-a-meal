import { QRVoucher } from "@give-a-meal/ui";
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
    // Add spacers
    setMeals([
      { id: "spacer-114124" },
      ...reservedMeals,
      { id: "spacer-124124" },
    ]);
  }, [reservedMeals]);

  // Info modal context
  const { content, setContent } = useContext<any>(BottomSheetContext);

  // Dispatch modal content
  const toggleModal = () => {
    console.log(content);
    if (!content) {
      setContent(
        <View>
          <Text
            style={[
              textStyles.label_button,
              { marginBottom: theme.spacing.xs },
            ]}
          >
            Reserved meals
          </Text>
          <Text style={textStyles.body}>
            Show this QR code at the restaurant displayed on the card to pick up
            the meal for free.
          </Text>
        </View>
      );
    } else {
      setContent(null);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleModal}>
        <Text style={styles.title}>Reserved meals</Text>
        <FontAwesome
          name="question-circle"
          size={theme.fontSizes.reg}
          color={theme.colors.text_primary_dark_60}
        />
      </TouchableOpacity>

      <FlatList
        data={meals as any}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        keyExtractor={(item) => item.id}
        // style={{ backgroundColor: "blue" }}
        renderItem={({ item }) => {
          if (item.id.includes("spacer")) {
            return <View key={item.id} style={{ width: EMPTY_ITEM_SIZE }} />;
          } else {
            return (
              <View style={styles.voucherContainer} key={item.id}>
                <QRVoucher
                  style={styles.voucher}
                  title={item.title}
                  address={item.address}
                  businessName={item.businessName}
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
