import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useState, useRef, useEffect, createContext, ReactNode } from "react";

import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

// Set up global navigator
function navigate(name: never, params: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// Menu component
const Menu = ({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: (page: string) => void;
}) => {
  // Animated values
  const y = useRef(new Animated.Value(0)).current;

  // Animate functions
  const animateOut = () => {
    Animated.timing(y, {
      toValue: -400,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
  const animateIn = () => {
    Animated.timing(y, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Handle animate in and out
  useEffect(() => {
    if (isOpen) animateIn();
    else animateOut();
  }, [isOpen]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateY: y }],
        },
      ]}
    >
      <View style={{ width: 200 }}>
        <TouchableOpacity onPress={() => onNavigate("Home")}>
          <Text
            style={[
              textStyles.header_3,
              { color: theme.colors.text_primary_light },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate("Inventory")}
          style={{ marginTop: 32 }}
        >
          <Text
            style={[
              textStyles.header_3,
              { color: theme.colors.text_primary_light },
            ]}
          >
            Inventory
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate("Inventory")}
          style={{ marginTop: 32 }}
        >
          <Text
            style={[
              textStyles.header_3,
              { color: theme.colors.text_primary_light },
            ]}
          >
            Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNavigate("Inventory")}
          style={{ marginTop: 32 }}
        >
          <Text
            style={[
              textStyles.header_3,
              { color: theme.colors.text_primary_light },
            ]}
          >
            Shop
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    width: "100%",
    height: 400,
    backgroundColor: theme.colors.text_link,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: "absolute",
    paddingVertical: 100,
    paddingHorizontal: 50,
  },
});

// Provides the menu functions
export const MenuContext = createContext(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleNavigate = (page: string) => {
    setIsOpen(false);
    navigate(page, {});
  };

  return (
    <MenuContext.Provider value={setIsOpen}>
      {children}
      <Menu
        isOpen={isOpen}
        onNavigate={(page: string) => handleNavigate(page)}
      />
    </MenuContext.Provider>
  );
};
