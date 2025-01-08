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
import {
  UserGoogleLoginFunction,
  UserAppleLoginFunction,
} from "../../../api/auth.js";
import { useDispatch } from "react-redux";
import { COMMON_TEXT } from "../../../constants/screens/index.tsx";

const LoginTamplet = () => {
  const dispatch = useDispatch();
  const SOCIAL_LOGIN = [
    {
      id: 1,
      image: IMAGES.google,
      onPress: () => UserGoogleLoginFunction(dispatch),
    },
    // { id: 2, image: IMAGES.facebook, onPress: () => {} },
    {
      id: 3,
      image: IMAGES.apple,
      onPress: () => UserAppleLoginFunction(dispatch),
    },
  ];

  return (
    <View>
      <LoginOrg />
      <View row center margin-20>
        {SOCIAL_LOGIN.map((i) => {
          if (Platform.OS == "android" && i?.id == 3) {
            return;
          }
          return (
            <TouchableOpacity key={i?.id} onPress={i?.onPress}>
              <Image
                source={i.image}
                style={{ width: 110, height: 40, marginHorizontal: 5 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        center
        row
        gap-5
        style={{
          marginTop: 140,
        }}
      >
        <Typography>{COMMON_TEXT.DONT_HAVE_AN_ACCOUNT} </Typography>
        <TouchableOpacity onPress={() => navigate(SCREENS.SIGNUP)}>
          <Typography
            textType="semiBold"
            size={theme.fontSize.extraSmall}
            color={theme.color.primary}
          >
            {COMMON_TEXT.SIGN_UP}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginTamplet;
