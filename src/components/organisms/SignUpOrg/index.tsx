import React, { useState } from "react";
import { Image } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import ProgressBarComp from "../../molecules/ProgressBarComp.tsx";
import { IMAGES } from "../../../constants";
import SignUpFields from "../../molecules/SignUpMol/SignUpFields.tsx";
import { theme } from "../../../constants/Constants.ts";
import ForgotText from "../../molecules/SignUpMol/ForgotText.tsx";
import { Typography } from "../../atoms/Typography.tsx";
const steps = [
  { label: "Sign Up", progress: 0 },
  { label: "Upload License", progress: 0.5 },
  { label: "Finish", progress: 1.0 },
];

const SignUpOrg = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
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
      <SignUpFields />

      <Button
        label="Next Step"
        backgroundColor={theme.color.primary}
        onPress={handleNextStep}
        disabled={currentStep === steps.length - 1}
        borderRadius={30}
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

export default SignUpOrg;
