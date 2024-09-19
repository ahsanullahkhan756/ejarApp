import React, { useState } from "react";
import { Image, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import { IMAGES } from "../../../constants/index.tsx";
import { theme } from "../../../constants/Constants.ts";
import { Typography } from "../../atoms/Typography.tsx";
import LoginFields from "../../molecules/LoginMol/LoginFields.tsx";
import { setLoggedIn } from "../../../redux/slice/user.tsx";
import { useDispatch } from "react-redux";

const LoginOrg = () => { 
  const dispatch = useDispatch()
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

      <Button
        label="Sign In"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={() => dispatch(setLoggedIn(true))}
        style={{ height: 50, margin: 20 }}
      />
      <View row center marginH-20>
        <View flex height={1} backgroundColor={theme.color.black} />
        <View>
          <Typography style={{ width: 100, textAlign: "center" }}>
            Or with
          </Typography>
        </View>
        <View flex height={1} backgroundColor={theme.color.black} />
      </View>
    </>
  );
};

export default LoginOrg;
