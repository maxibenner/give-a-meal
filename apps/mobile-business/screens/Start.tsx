import { Button } from "@give-a-meal/ui";
import { textStyles, theme } from "@give-a-meal/ui/theme";
import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { slides } from "../constants/onboardingData";

const Start = ({ navigation }: { navigation: any }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  return (
    <ImageBackground
      resizeMode="cover"
    style={styles.imageBg}
      source={require("../assets/splash.png")}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inner}>
          <View>
            <ScrollView
              onLayout={(event) =>
                setCarouselWidth(event.nativeEvent.layout.width)
              }
              onMomentumScrollEnd={(event) =>
                setCarouselIndex(
                  event.nativeEvent.contentOffset.x / carouselWidth
                )
              }
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {slides.map((slide) => (
                <View
                  style={[styles.carouselItem, { width: windowWidth }]}
                  key={slide.title}
                >
                  <Text
                    style={[
                      textStyles.header_2,
                      { marginBottom: theme.spacing.md },
                    ]}
                  >
                    {slide.title}
                  </Text>
                  <Text style={textStyles.body}>{slide.body}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.carouselIndicator}>
              {slides.map((slide, i) => (
                <View
                  style={[
                    styles.carouselIndicatorDot,
                    {
                      backgroundColor:
                        carouselIndex === i
                          ? theme.colors.element_dark_active
                          : theme.colors.element_dark_inactive,
                    },
                  ]}
                  key={slide.title}
                />
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={{ marginBottom: theme.spacing.sm }}
              type="primary"
              label="Get started"
              onPress={() => navigation.navigate("Sign Up")}
            />
            <Button
              type="secondary"
              label="Sign in"
              onPress={() => navigation.navigate("Sign In")}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: theme.colors.bg_brand,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    flex: 1,
    maxHeight: "65%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  carouselItem: {
    paddingHorizontal: theme.spacing.lg,
  },
  carouselIndicator: {
    marginTop: theme.spacing.lg,
    height: 10,
    flexDirection: "row",
    marginHorizontal: theme.spacing.lg,
  },
  carouselIndicatorDot: {
    borderRadius: 5,
    width: 10,
    height: 10,
    marginRight: 8,
  },
});

export default Start;
