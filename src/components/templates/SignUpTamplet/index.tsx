import React, { useState } from "react";
import SignUpOrg from "../../organisms/SignUpOrg/index.tsx";
import { Button, View } from "react-native-ui-lib";
import { theme } from "../../../constants/Constants.ts";
import { IMAGES } from "../../../constants/Images.tsx";
import { Image, TouchableOpacity } from "react-native";
import { Typography } from "../../atoms/Typography.tsx";
import { navigate } from "../../../navigation/RootNavigation.tsx";
import { SCREENS } from "../../../constants/ScreenNames.tsx";

const SignUpTamplet = () => {
  const SOCIAL_LOGIN = [
    { id: 1, image: IMAGES.google },
    { id: 1, image: IMAGES.facebook },
    { id: 1, image: IMAGES.apple },
  ];
  return (
    <>
      <SignUpOrg />
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
      <View center marginV-20>
        <Typography>
          Don’t have an account?{" "}
          <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
            <Typography semiBold small marginT-5 color={theme.color.primary}>
              {" "}
              Login
            </Typography>
          </TouchableOpacity>
        </Typography>
      </View>
    </>
  );
};

export default SignUpTamplet;
