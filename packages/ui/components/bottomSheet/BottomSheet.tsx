import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { effects, textStyles, theme } from "../../theme";

// Type ---------  Type ---------  Type ---------  Type ---------
type Content = {
  content: ReactNode;
  options?: { title?: string };
};

// Context ---------  Context ---------  Context ---------  Context ---------
export const BottomSheetContext = createContext<BottomSheetContextType>(null);
export type BottomSheetContextType = {
  content: Content;
  setContent: (content: ReactNode, options?: { title?: string }) => void;
};

// Provider ---------  Provider ---------  Provider ---------  Provider ---------
export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [content, setModalContent] = useState<Content | null>();

  const setContent = (content: ReactNode, options?: { title?: string }) => {
    setModalContent({ content, options });
  };

  return (
    <BottomSheetContext.Provider value={{ content, setContent }}>
      {children}
      <BottomSheet content={content?.content} options={content?.options} />
    </BottomSheetContext.Provider>
  );
}

// Global Variables ---------  Global Variables ---------  Global Variables ---------
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Component ---------  Component ---------  Component ---------  Component ---------

export const BottomSheet = ({ content, options }: Content) => {
  // Safe area insets
  const insets = useSafeAreaInsets();

  // Context
  const { setContent } = useContext(BottomSheetContext);

  // Animation variables
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 }); // Keep track of previous gesture

  // Layout variables
  const [contentHeight, setContentHeight] = useState(0);
  const maxTranslateY = useMemo(() => contentHeight, [contentHeight]);

  // Delay removal of content to allow for animation
  const [delayedContent, setDelayedContent] = useState<Content | null>(null);

  // ANIMATION: Trigger -> Gesture
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      // Bottom sheet
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -maxTranslateY);
    })
    .onEnd(() => {
      if (translateY.value * 2 > -contentHeight) {
        // Animate bottom sheet to hidden state (20 instead of 0 to hide handle)
        translateY.value = withSpring(20, { mass: 0.2 }, () =>
          runOnJS(setContent)(null)
        );
      } else {
        // Animate back to full open state
        translateY.value = withSpring(-maxTranslateY, { mass: 0.2 });
      }
    });

  // ANIMATION: Trigger -> Content change
  useEffect(() => {
    if (content) {
      // Show
      setDelayedContent({ content: content });
      translateY.value = withSpring(-contentHeight, { mass: 0.2 });
    } else {
      // Hide (20 instead of 0 to hide handle)
      translateY.value = withSpring(20, { mass: 0.2 }, () =>
        runOnJS(setDelayedContent)(null)
      );
    }
  }, [content, contentHeight]);

  // Create animation property
  const reanimatedSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // Create animation property
  const reanimatedBgStyle = useAnimatedStyle(() => {
    const safeTranslateY = translateY.value + 1;
    const safeContentHeight = contentHeight + 1;
    const percentageMoved = -safeTranslateY / safeContentHeight;

    // Divide to go less than 100%
    const opacitySetting = percentageMoved / 2;

    return {
      opacity: opacitySetting,
    };
  }, [translateY.value, contentHeight]);

  // Render component
  return (
    <>
      <Animated.View
        pointerEvents={delayedContent === null ? "none" : "auto"}
        onTouchStart={() => setContent(null)}
        style={[styles.background, reanimatedBgStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.container, reanimatedSheetStyle]}
          onLayout={(event) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          <View style={styles.headerBar}>
            <View style={styles.handle} />
            <Text style={styles.headerText}>
              {options?.title ? options.title : "Information"}
            </Text>
          </View>

          <View style={[styles.content, { marginBottom: insets.bottom }]}>
            {delayedContent && delayedContent.content}
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    width: "100%",
    position: "absolute",
    top: SCREEN_HEIGHT,
    backgroundColor: theme.colors.bg_white,
    borderTopRightRadius: theme.borderRadius.regular,
    borderTopLeftRadius: theme.borderRadius.regular,
    ...effects.shadow,
  },
  headerBar: {
    height: 60,
    borderBottomColor: theme.colors.element_dark_inactive,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 50,
    height: 4,
    backgroundColor: theme.colors.text_primary_light,
    marginBottom: 5,
    borderRadius: 2,
    position: "absolute",
    top: -12,
  },
  headerText: {
    ...textStyles.label_button,
  },
  content: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
});
