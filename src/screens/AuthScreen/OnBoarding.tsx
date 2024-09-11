import React from "react";
import { StyleSheet, Image, I18nManager, Button } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import "../../i18n";
import { View, Text } from "react-native-ui-lib";

const OnBoarding = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n?.changeLanguage(lng);
    if (lng === "ar") {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  };

  console.warn(I18nManager.isRTL);

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
      <View backgroundColor="red">
        <Text
          marginV-10
          bold
          extraLarge
          black
          style={{ backgroundColor: "green" }}
        >
          {t("login")}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={t("english")}
          style={{}}
          onPress={() => changeLanguage("en")}
        />
        <Button title={t("arabic")} onPress={() => changeLanguage("ar")} />
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
});

export default OnBoarding;
