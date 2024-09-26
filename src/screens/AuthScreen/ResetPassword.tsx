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
import { IMAGES } from "../../constants/Images.tsx";

const ResetPassword = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [password, setPassword] = useState(false);
  const [password2, setPassword2] = useState(false);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header />
      <View margin-20>
        <View style={commonStyles.lineBar} />
        <Typography textType="bold" size={theme.fontSize.large24}>
          Reset Password
        </Typography>

        <View marginV-10>
          <InputText
            label={"Enter your new password"}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            style={{ width: "100%" }}
            onPressRight={() => setPassword(!password)}
            secureTextEntry={true}
            rightImage={!password2 ? IMAGES.eyeOn : IMAGES.eyeOff}
            validate={[
              (v) =>
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
                  v
                ),
            ]}
            validationMessage={[
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            ]}
            placeholder="New password"
          />
          <InputText
            label={"Confirm password"}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[1] = isValid;
                return copy;
              });
            }}
            style={{ width: "100%" }}
            onPressRight={() => setPassword2(!password2)}
            secureTextEntry={true}
            rightImage={!password2 ? IMAGES.eyeOn : IMAGES.eyeOff}
            validate={[
              (v) =>
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
                  v
                ),
            ]}
            validationMessage={[
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            ]}
            placeholder="Confirm password"
          />
        </View>
        <Button
          label="Reset Password"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          disabled={hasValidated.includes(false)}
          onPress={() => navigate(SCREENS.LOGIN)}
          style={{ height: 50, marginVertical: 20 }}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default ResetPassword;
