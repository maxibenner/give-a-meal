import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { textStyles, theme } from "../../theme";
import { Button } from "../button/Buttons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const QRVoucher = ({
  title,
  businessName,
  address,
  style,
}: {
  title: string;
  businessName: string;
  address: string;
  style?: ViewStyle;
}) => {
  const [qrContainerXY, setQRContainerXY] = useState({ width: 0, height: 0 });

  return (
    <View style={[styles.container, style]}>
      <View
        style={styles.QRContainer}
        onLayout={(event) => {
          var { width, height } = event.nativeEvent.layout;
          setQRContainerXY({ width, height });
        }}
      >
        {qrContainerXY && (
          <QRCode size={windowHeight / 5} value="https://give-a-meal.org" />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.iconTextContainer}>
          <MaterialIcons
            name="storefront"
            size={17}
            color={theme.colors.text_primary_light}
          />
          <Text numberOfLines={1} style={styles.subText}>
            {businessName}
          </Text>
        </View>
        <View style={styles.iconTextContainer}>
          <MaterialIcons
            name="location-pin"
            size={17}
            color={theme.colors.text_primary_light}
          />
          <Text numberOfLines={1} style={styles.subText}>
            {address}
          </Text>
        </View>
        <Button
          size="small"
          style={{
            backgroundColor: "white",
            width: "100%",
            marginTop: theme.spacing.sm,
          }}
          textStyle={{ color: theme.colors.text_primary_dark }}
          label="Get directions"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.element_dark_active,
    width: "85%",
    borderRadius: theme.borderRadius.large,
    shadowRadius: 3,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  QRContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg_white,
    borderRadius: theme.borderRadius.regular,
    height: windowHeight / 5 + theme.spacing.sm * 2,
    width: windowHeight / 5 + theme.spacing.sm * 2,
    marginVertical: theme.spacing.md,
  },
  contentContainer: {
    marginTop: theme.spacing.md,
    width: "100%",
  },
  title: {
    ...textStyles.header_3,
    color: theme.colors.text_primary_light,
    marginBottom: theme.spacing.xs,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    ...textStyles.body,
    marginLeft: theme.spacing.xxs,
    color: theme.colors.text_primary_light,
  },
});
