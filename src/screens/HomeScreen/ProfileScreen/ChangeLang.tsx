// import React from "react";
// import {
//   StyleSheet,
// } from "react-native";
// import { View } from "react-native-ui-lib";
// import SafeAreaContainer from "../../../containers/SafeAreaContainer";
// import { Header } from "../../../components/atoms/Header";
// import { Typography } from "../../../components/atoms/Typography";
// import { theme } from "../../../constants";

// const ChangeLang = () => {
//   return (
//     <SafeAreaContainer safeArea={false}>
//       <Header titleText={"Change Language"} centerImg={false} />
//       <View marginH-20 style={{alignItems:'center'}}>
//         <Typography color={theme.color.descColor} align="center">Lorem ipsum dolor sit amet, consectetur adipiscing
// elit, sed do eiusmod tempor incididunt ut labore et
// dolore magna aliqua. </Typography>
//       </View>
//     </SafeAreaContainer>
//   );
// };

// const styles = StyleSheet.create({});

// export default ChangeLang;

import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  I18nManager,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
// import "../../i18n";
import "../../../i18n";
import { View, Text, Button } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { IMAGES, theme, VARIABLES } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { onBack } from "../../../navigation/RootNavigation";
import { DropDown } from "../../../components/atoms/DropDown";
import { Header } from "../../../components/atoms/Header";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES, useTranslation } from "../../../hooks/useTranslation";
import { setAppLanguage } from "../../../redux/slice/appSettings";
import RNRestart from "react-native-restart"; // Import package from node modules
import { setItem } from "../../../utils/storage";
import { COMMON_TEXT, TEMPORARY_TEXT } from "../../../constants/screens";
import { setIsLoading } from "../../../redux/slice/user";
const SelectLanguage = () => {
  const { t, changeLanguage } = useTranslation();
  const selected = useSelector((state) => state?.app?.appLanguage);
  console.log(selected);
  const [selectedLang, setSelectedLang] = useState<string>(selected);
  const dispatch = useDispatch();
  const changeAppLanguage = (selectedLanguage: string) => {
    try {
      setSelectedLang(selectedLanguage);
      dispatch(setIsLoading(true));
      if (selectedLanguage == LANGUAGES.ARABIC) {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
      setTimeout(() => {
        RNRestart.restart();
      }, 1000);
      changeLanguage(selectedLanguage);
      dispatch(setAppLanguage(selectedLanguage));
      setItem(VARIABLES.LANGUAGE, selectedLanguage);
    } catch (error) {
    } finally {
      // dispatch(setIsLoading(false));
    }
  };
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.CHOOSE_LANGUAGE} centerImg={false} />
      <View marginH-10>
        <Typography align="center" color={theme.color.descColor}>
          {TEMPORARY_TEXT.LORUM_IPSUM}
        </Typography>
      </View>

      {/* <View style={styles.buttonContainer}>
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
      </View> */}

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

      {/* <Button
        label="Save"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={() => onBack()}
        style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
      /> */}
    </SafeAreaContainer>
  );
};

const language = [
  { label: "English", value: "1" },
  { label: "Arabic", value: "2" },
];

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
