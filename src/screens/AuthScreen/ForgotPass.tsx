import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { ScrollView } from "react-native";
import { Button, View } from "react-native-ui-lib";
import { Header } from "../../components/atoms/Header.tsx";
import { Typography } from "../../components/atoms/Typography.tsx";
import { commonStyles } from "../../containers/commStyles.tsx";
import { theme } from "../../constants/Constants.ts";
import { InputText } from "../../components/atoms/InputText.tsx";
import { navigate, onBack } from "../../navigation/RootNavigation.tsx";
import { SCREENS } from "../../constants/ScreenNames.tsx";

const ForgotPass = () => {
  const [hasValidated, setValidated] = useState(new Array(1).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(true);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header />
        <View margin-20>
          <View style={commonStyles.lineBar} />
          <Typography textType="bold" size={theme.fontSize.large24}>
            Forgot Password
          </Typography>

          <View marginV-20>
            <InputText
              label={"Enter your email/phone"}
              // width={350}
              value={email}
              onValidationFailed={(isValid: boolean) => {
                setValidated((prev) => {
                  let copy = [...prev];
                  copy[0] = isValid;
                  return copy;
                });
              }}
              placeholder="loremipsum@domain.com"
              validate={["email"]}
              validationMessage={["Email is invalid"]}
              onChangeText={(text: string) => setEmail(text)}
            />

            <Button
              label="Send OTP"
              backgroundColor={theme.color.primary}
              borderRadius={30}
              disabled={hasValidated.includes(false)}
              onPress={() => navigate(SCREENS.OTP)}
              style={{ height: 50, marginVertical: 20 }}
            />
          </View>
        </View>
    </SafeAreaContainer>
  );
};

export default ForgotPass;
