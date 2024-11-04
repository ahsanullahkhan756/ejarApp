import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import ProgressBarComp from "../../molecules/ProgressBarComp.tsx";
import { IMAGES, SCREENS } from "../../../constants";
import SignUpFields from "../../molecules/SignUpMol/SignUpFields.tsx";
import { theme } from "../../../constants/Constants.ts";
import { Typography } from "../../atoms/Typography.tsx";
import { navigate } from "../../../navigation/RootNavigation.tsx";
import InformationIds from "../../molecules/SignUpMol/InformationIds.tsx";
import Uploads from "../../molecules/SignUpMol/Uploads.tsx";
import LicenseInfo from "../../molecules/SignUpMol/LicenseInfo.tsx";
import PassportInfo from "../../molecules/SignUpMol/PassportInfo.tsx";

const steps = [
  { label: "Sign Up", progress: 0 },
  { label: "", progress: 0.25 },
  { label: "", progress: 0.5 },
  { label: "", progress: 0.75 },
  { label: "Finish", progress: 1.0 },
];

const SignUpOrg = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validate, setValidate] = useState(-1);

  const SOCIAL_LOGIN = [
    { id: 1, image: IMAGES.google },
    { id: 2, image: IMAGES.facebook },
    { id: 3, image: IMAGES.apple },
  ];

  const handleNextStep = () => {
    if (currentStep === steps.length - 1) {
      navigate(SCREENS.LOGIN);
    } else {
      setCurrentStep(currentStep + 1);
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
          {SOCIAL_LOGIN.map((i) => (
            <Image
              key={i.id}
              source={i.image}
              style={{ width: 110, height: 40, marginHorizontal: 5 }}
              resizeMode="contain"
            />
          ))}
        </View>
        {/* <View center marginV-20 style={{ alignItems: "center" }}>
          <Typography>
            Don’t have an account?{" "}
            <View style={{ display: "inline" }}>
              <Pressable onPress={() => navigate(SCREENS.LOGIN)}>
                <Typography
                  bold
                  color={theme.color.primary}
                >
                  Login
                </Typography>
              </Pressable>
            </View>
          </Typography>
        </View> */}

        {/* <View
          center
          style={{
            marginVertical:20,
            alignItems: "center",
          }}
        >
          <Typography size={theme.fontSize.medium}>
            Don’t have an account?{" "}
            <TouchableOpacity
              style={{ marginTop: Platform.OS == "ios" ? 5 : 0 }}
              onPress={() => navigate(SCREENS.LOGIN)}
            >
              <Typography
                textType="semiBold"
                size={theme.fontSize.extraSmall}
                color={theme.color.primary}
              >
                Login
              </Typography>
            </TouchableOpacity>
          </Typography>
        </View> */}
        <View center row>
          <Typography>Don’t have an account? </Typography>
          <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
            <Typography
              textType="semiBold"
              size={theme.fontSize.extraSmall}
              color={theme.color.primary}
            >
              Login
            </Typography>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const handleNavigation = () => {
    if (currentStep === 0) {
      return (
        <SignUpFields
          onValidate={(valid: any) => {
            if (valid) setValidate(0);
            else setValidate(-1);
          }}
        />
      );
    } else if (currentStep === 1) {
      return (
        <InformationIds
          onValidate={(valid: any) => {
            if (valid) setValidate(1);
            else setValidate(-1);
          }}
        />
      );
    } else if (currentStep === 2) {
      return (
        <LicenseInfo
          onValidate={(valid: any) => {
            if (valid) setValidate(2);
            else setValidate(-1);
          }}
        />
      );
    } else if (currentStep === 3) {
      return (
        <PassportInfo
          onValidate={(valid: any) => {
            if (valid) setValidate(3);
            else setValidate(-1);
          }}
        />
      );
    } else {
      return (
        <Uploads
          onValidate={(valid: any) => {
            if (valid) setValidate(3);
            else setValidate(-1);
          }}
        />
      );
    }
  };

  const getButtonLabel = () => {
    return currentStep === 4
      ? "Done"
      : currentStep == 3
      ? "Next"
      : currentStep == 2
      ? "Next"
      : currentStep == 1
      ? "Next"
      : currentStep == 0
      ? "Sign Up"
      : "";
  };

  return (
    <>
      {currentStep != 0 && (
        <TouchableOpacity
          onPress={() => setCurrentStep(currentStep - 1)}
          style={{ flex: 1 }}
        >
          <Image
            source={IMAGES.leftIcon}
            style={{
              width: scale(20),
              height: verticalScale(20),
              marginTop: 50,
              marginLeft: 20,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

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

      {handleNavigation()}

      <Button
        label={getButtonLabel()}
        backgroundColor={theme.color.primary}
        onPress={handleNextStep}
        // disabled={currentStep != validate}
        // disabled={currentStep === 0 && currentStep !== validate}

        borderRadius={30}
        style={{ height: 50, margin: 20 }}
      />
      {currentStep < 1 && handleBottomData()}
    </>
  );
};

export default SignUpOrg;
