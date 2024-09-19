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
 
  return (
    <>
      <SignUpOrg />
    
    </>
  );
};

export default SignUpTamplet;
