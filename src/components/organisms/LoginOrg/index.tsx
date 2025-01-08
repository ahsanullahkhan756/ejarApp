import React, { useState } from "react";
import { Image, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { View } from "react-native-ui-lib";
import { IMAGES } from "../../../constants/index.tsx";
import { theme } from "../../../constants/Constants.ts";
import { Typography } from "../../atoms/Typography.tsx";
import LoginFields from "../../molecules/LoginMol/LoginFields.tsx";
import { COMMON_TEXT } from "../../../constants/screens/index.tsx";

const LoginOrg = () => { 
  return (
    <>
      <View center style={{marginTop:Platform.OS == 'ios' ? 0 : 20}}>
        <Image
          source={IMAGES.logo}
          style={{
            width: scale(180),
            height: verticalScale(45),
            marginTop: 40,
          }}
          resizeMode="contain"
        />
      </View>
      <LoginFields />
      <View row center marginH-20>
        <View flex height={1} backgroundColor={theme.color.black} />
        <View>
          <Typography style={{ width: 180, textAlign: "center" }}>
            {COMMON_TEXT.OR_CONTINUE_WITH}
          </Typography>
        </View>
        <View flex height={1} backgroundColor={theme.color.black} />
      </View>
    </>
  );
};

export default LoginOrg;
