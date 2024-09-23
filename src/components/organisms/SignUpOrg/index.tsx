import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import ProgressBarComp from "../../molecules/ProgressBarComp.tsx";
import { IMAGES, SCREENS } from "../../../constants";
import SignUpFields from "../../molecules/SignUpMol/SignUpFields.tsx";
import { theme } from "../../../constants/Constants.ts";
import ForgotText from "../../molecules/SignUpMol/ForgotText.tsx";
import { Typography } from "../../atoms/Typography.tsx";
import { navigate } from "../../../navigation/RootNavigation.tsx";
const steps = [
  { label: "Sign Up", progress: 0 },
  { label: "Upload License", progress: 0.5 },
  { label: "Finish", progress: 1.0 },
];

const SignUpOrg = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const SOCIAL_LOGIN = [
    { id: 1, image: IMAGES.google },
    { id: 1, image: IMAGES.facebook },
    { id: 1, image: IMAGES.apple },
  ];
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleNevigation = () => {
    if (currentStep == 0) {
      return <SignUpFields />;
    } else if (currentStep == 1) {
      return <Typography>sadawdsdasdsd</Typography>;
    } else {
      return <Typography>Finish</Typography>;
    }
  };

  const handleBottomData = () => {
    return (
      <>
        <View row center marginH-20>
          <View flex height={1} backgroundColor={theme.color.black} />
          <View>
            <Typography style={{ width: 100, textAlign: "center" }}>
              Or with
            </Typography>
          </View>
          <View flex height={1} backgroundColor={theme.color.black} />
        </View>
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

  return (
    <>
      <View center>
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
      <ProgressBarComp currentStep={currentStep} steps={steps} />

      {handleNevigation()}

      <Button
        label="Sign Up"
        backgroundColor={theme.color.primary}
        onPress={handleNextStep}
        disabled={currentStep === steps.length - 1}
        borderRadius={30}
        style={{ height: 50, margin: 20 }}
      />
      {currentStep < 1 && handleBottomData()}
    </>
  );
};

export default SignUpOrg;
