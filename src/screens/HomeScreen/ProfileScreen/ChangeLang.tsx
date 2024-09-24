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
import { StyleSheet, Image, I18nManager, Pressable } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
// import "../../i18n";
import '../../../i18n';
import { View, Text, Button } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { onBack } from "../../../navigation/RootNavigation";

const SelectLanguage = () => {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<string>("en");

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
        <Typography align="center" textType='bold' size={theme.fontSize.large26}>
        {t("Select Language")}
        </Typography>

        <Typography align="center" color={theme.color.descColor}>
          {t("Lang Des")}
          </Typography>
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
     
      <Button
        label="Save"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={() => onBack()}
        style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
      />
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
    borderRadius:10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default SelectLanguage;

