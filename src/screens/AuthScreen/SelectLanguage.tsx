import React, { useState } from "react";
import { StyleSheet, Image, I18nManager, Pressable } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme, VARIABLES } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import "../../i18n";
import { View, Text } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { navigate, replace } from "../../navigation/RootNavigation";
import { LANGUAGES, useTranslation } from "../../hooks/useTranslation";
import { useDispatch } from "react-redux";
import { setAppLanguage } from "../../redux/slice/appSettings";
import { setItem } from "../../utils/storage";
import { COMMON_TEXT, TEMPORARY_TEXT } from "../../constants/screens";

const SelectLanguage = () => {
  const { t, changeLanguage } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>(LANGUAGES.ENGLISH);
  const dispatch = useDispatch();
  const changeAppLanguage = (selectedLanguage: string) => {
    if (selectedLanguage == LANGUAGES.ARABIC) {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
    changeLanguage(selectedLanguage);
    dispatch(setAppLanguage(selectedLanguage));
    setItem(VARIABLES.LANGUAGE, selectedLanguage);
    replace(SCREENS.ONBOARDING);
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
        <Typography
          align="center"
          textType="bold"
          size={theme.fontSize.large26}
        >
          {COMMON_TEXT.CHOOSE_LANGUAGE}
        </Typography>

        <Typography align="center" color={theme.color.descColor}>
          {TEMPORARY_TEXT.LORUM_IPSUM}
        </Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.languageButton,
            selectedLang === LANGUAGES.ENGLISH && styles.selectedButton,
          ]}
          onPress={() => changeAppLanguage(LANGUAGES.ENGLISH)}
        >
          {/* <Text small>{t("English")}</Text> */}

          <Typography style={{ textTransform: "capitalize" }}>
            {LANGUAGES.ENGLISH}
          </Typography>
        </Pressable>
        <Pressable
          style={[
            styles.languageButton,
            selectedLang === LANGUAGES.ARABIC && styles.selectedButton,
          ]}
          onPress={() => changeAppLanguage(LANGUAGES.ARABIC)}
        >
          <Typography style={{ textTransform: "capitalize" }}>
            {LANGUAGES.ARABIC}
          </Typography>
        </Pressable>
      </View>
      <View center marginT-50>
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
    borderColor: theme.color.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default SelectLanguage;
