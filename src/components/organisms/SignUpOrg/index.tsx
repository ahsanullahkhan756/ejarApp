import React, { useState } from "react";
import { Image, Platform, Pressable, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import ProgressBarComp from "../../molecules/ProgressBarComp.tsx";
import { IMAGES, SCREENS } from "../../../constants";
import SignUpFields from "../../molecules/SignUpMol/SignUpFields.tsx";
import { VARIABLES, theme } from "../../../constants/Constants.ts";
import { Typography } from "../../atoms/Typography.tsx";
import { navigate } from "../../../navigation/RootNavigation.tsx";
import InformationIds from "../../molecules/SignUpMol/InformationIds.tsx";
import Uploads from "../../molecules/SignUpMol/Uploads.tsx";
import LicenseInfo from "../../molecules/SignUpMol/LicenseInfo.tsx";
import PassportInfo from "../../molecules/SignUpMol/PassportInfo.tsx";
import { signUpApi } from "../../../api/auth.js";
import { setItem } from "../../../utils/storage.tsx";
import { setIsLoading, setLoggedIn } from "../../../redux/slice/user.tsx";
import { useDispatch } from "react-redux";

const steps = [
  { label: "Sign Up", progress: 0 },
  { label: "", progress: 0.25 },
  { label: "", progress: 0.5 },
  { label: "", progress: 0.75 },
  { label: "Finish", progress: 1.0 },
];

const SignUpOrg = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [validationState, setValidationState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const SOCIAL_LOGIN = [
    { id: 1, image: IMAGES.google },
    { id: 2, image: IMAGES.facebook },
    { id: 3, image: IMAGES.apple },
  ];

  // Handle next step
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
        setCurrentStep= {setCurrentStep}
          onValidate={(valid: boolean) => {
            const newState = [...validationState];
            newState[0] = valid;
            setValidationState(newState);
          }}
        />
      );
    } else if (currentStep === 1) {
      return (
        <InformationIds
        setCurrentStep= {setCurrentStep}
          onValidate={(valid: boolean) => {
            const newState = [...validationState];
            newState[1] = valid;
            setValidationState(newState);
          }}
        />
      );
    } else if (currentStep === 2) {
      return (
        <LicenseInfo
        setCurrentStep= {setCurrentStep}
          onValidate={(valid: boolean) => {
            const newState = [...validationState];
            newState[2] = valid;
            setValidationState(newState);
          }}
        />
      );
    } else if (currentStep === 3) {
      return (
        <PassportInfo
        setCurrentStep= {setCurrentStep}
          onValidate={(valid: boolean) => {
            const newState = [...validationState];
            newState[3] = valid;
            setValidationState(newState);
          }}
        />
      );
    } else {
      return (
        <Uploads
        setCurrentStep= {setCurrentStep}
          onValidate={(valid: boolean) => {
            const newState = [...validationState];
            newState[4] = valid;
            setValidationState(newState);
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

  const isFormValid = validationState[currentStep];

  return (
    <>
      {currentStep !== 0 && (
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

      {/* <Button
        label={getButtonLabel()}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          const data = {
            user: {
              firstName: "john",
              lastName: "john",
              email: "john1@ymail.com",
              phone: "090078132226",
              password: "Qwerty@123",
            },
            roles: ["8d3a703f-ca87-4f01-bad2-d559726818bb"],
          };
        
          const res = await signUpApi({ data });
          console.log("response api", res);

          if (res != null) {
            setItem(VARIABLES.USER_TOKEN, res?.token);
            dispatch(setLoggedIn(true));
            dispatch(setIsLoading(true));
            // dispatch(setUserType("user"));
          }
        }}
        // onPress={handleNextStep}
        // disabled={!isFormValid}
        borderRadius={30}
        style={{ height: 50, margin: 20 }}
      /> */}
      {currentStep < 1 && handleBottomData()}
    </>
  );
};

export default SignUpOrg;


