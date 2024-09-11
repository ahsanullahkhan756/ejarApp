import React, { useState } from "react";
import { StyleSheet, Image, I18nManager, Pressable } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { View, Text } from "react-native-ui-lib";

const OnBoarding = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>("");

  const changeLanguage = (lng: string) => {
    setSelectedLang(lng); // Set selected language
    i18n?.changeLanguage(lng);
    if (lng === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View center marginT-50>
        <Image
          source={IMAGES.logo}
          style={{
            width: scale(150),
            height: verticalScale(50),
          }}
          resizeMode="contain"
        />
      </View>
      <View marginH-10>
        <Text marginV-10 center bold extraLarge black>
          {t("Select Language")}
        </Text>

        <Text marginV-10 small center color={theme.color.descColor}>
          {t("Lang Des")}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.languageButton,
            selectedLang === "en" && styles.selectedButton,
          ]}
          onPress={() => changeLanguage("en")}
        >
          <Text small>{t("English")}</Text>
        </Pressable>
        <Pressable
          style={[
            styles.languageButton,
            selectedLang === "ar" && styles.selectedButton,
          ]}
          onPress={() => changeLanguage("ar")}
        >
          <Text small>{t("Arabic")}</Text>
        </Pressable>
      </View>
      <View center marginT-20>
        <Image
          source={IMAGES.onBoardingImg}
          style={{
            width: scale(300),
            height: verticalScale(300),
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  languageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent", 
    borderRadius: 5,
  },
  selectedButton: {
    borderColor: theme.color.yellow, 
    borderWidth: 1,
    borderRadius:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default OnBoarding;
