import React, { useState } from "react";
import SignUpOrg from "../../organisms/SignUpOrg/index.tsx";
import { Button, View } from "react-native-ui-lib";
import { theme } from "../../../constants/Constants.ts";
import { IMAGES } from "../../../constants/Images.tsx";
import { Image, Platform, TouchableOpacity } from "react-native";
import { Typography } from "../../atoms/Typography.tsx";
import { navigate } from "../../../navigation/RootNavigation.tsx";
import { SCREENS } from "../../../constants/ScreenNames.tsx";
import LoginOrg from "../../organisms/LoginOrg/index.tsx";

const LoginTamplet = () => {
  const SOCIAL_LOGIN = [
    { id: 1, image: IMAGES.google },
    { id: 1, image: IMAGES.facebook },
    { id: 1, image: IMAGES.apple },
  ];
  return (
    <View>
      <LoginOrg />
      <View row center margin-20>
        {SOCIAL_LOGIN.map((i) => {
          return (
            <Image
              source={i.image}
              style={{ width: 110, height: 40, marginHorizontal: 5 }}
              resizeMode="contain"
            />
          );
        })}
      </View>
      <View
        center
        style={{
          marginTop: Platform.OS == "ios" ? 200 : 150,
          alignItems: "center",
        }}
      >
        <Typography size={theme.fontSize.medium}>
          Don’t have an account?{" "}
          <TouchableOpacity
            style={{ marginTop: Platform.OS == "ios" ? 5 : 0 }}
            onPress={() => navigate(SCREENS.SIGNUP)}
          >
            <Typography
              textType="semiBold"
              size={theme.fontSize.extraSmall}
              color={theme.color.primary}
            >
              Sign Up
            </Typography>
          </TouchableOpacity>
        </Typography>
      </View>
    </View>
  );
};

export default LoginTamplet;
