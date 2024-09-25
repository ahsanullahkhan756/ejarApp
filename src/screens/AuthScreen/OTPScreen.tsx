import React, { useState, useEffect } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { Button, View } from "react-native-ui-lib";
import { Header } from "../../components/atoms/Header.tsx";
import { Typography } from "../../components/atoms/Typography.tsx";
import { commonStyles } from "../../containers/commStyles.tsx";
import { theme } from "../../constants/Constants.ts";
import OTPTextView from "react-native-otp-textinput";
import { SCREENS } from "../../constants/ScreenNames.tsx";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { navigate } from "../../navigation/RootNavigation.tsx";

const OTPScreen = () => {
  const [timeLeft, setTimeLeft] = useState(45); // Initial countdown time
  const [isCounting, setIsCounting] = useState(false); // State to control the countdown
  
  // Start countdown when the resend button is clicked or timer starts
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false); // Stop the countdown when it reaches 0
    }
    return () => clearTimeout(timer); // Cleanup the timer
  }, [timeLeft, isCounting]);

  const handleResend = () => {
    setTimeLeft(45); // Reset the timer to 45 seconds
    setIsCounting(true); // Start the countdown
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header />
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
      <View spread flex margin-20>
        <View>
          <View style={commonStyles.lineBar} />
          <Typography textType="bold" size={theme.fontSize.large24}>
            OTP Verification
          </Typography>
          <Typography size={theme.fontSize.small}>Enter 6 digits OTP</Typography>
          <OTPTextView
            inputCount={5}
            tintColor={theme.color.black}
            autoFocus={true}
            textInputStyle={{
              backgroundColor: "#37373733",
              borderRadius: 10,
              margin: 10,
              width: 50,
            }}
          />

          <Button
            label="Verify"
            backgroundColor={theme.color.primary}
            borderRadius={30}
            onPress={() => navigate(SCREENS.RESET_PASS)}
            style={{ height: 50, marginVertical: 20 }}
          />
        </View>

        <View center>
          <AnimatedCircularProgress
            size={150}
            width={10}
            fill={(timeLeft / 45) * 100} 
            tintColor={theme.color.primary}
            backgroundColor={theme.color.tgray}
          >
            {() => (
              <Typography textType="bold" size={theme.fontSize.extraLarge}>
                {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`} 
              </Typography>
            )}
          </AnimatedCircularProgress>
        </View>

        <View row center>
          <Typography size={theme.fontSize.small}>
            Didn’t receive the OTP?{" "}
          </Typography>
          <TouchableOpacity onPress={handleResend}>
            <Typography color={theme.color.primary}>Resend</Typography>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default OTPScreen;
