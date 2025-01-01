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
import { forgotApi } from "../../api/auth.js";
import { showToast } from "../../utils/toast.tsx";
import { COMMON_TEXT } from "../../constants/screens/index.tsx";
import { VALIDATION_MESSAGES } from "../../validationMessages/index.tsx";
import { useTranslation } from "../../hooks/useTranslation.tsx";

const ForgotPass = () => {
  const [hasValidated, setValidated] = useState(new Array(1).fill(false));
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <SafeAreaContainer safeArea={false}>
      <Header />
      <View margin-20>
        <View style={commonStyles.lineBar} />
        <Typography textType="bold" size={theme.fontSize.large24}>
          {COMMON_TEXT.FORGOT_PASSWORD}
        </Typography>

        <View marginV-20>
          <InputText
            label={COMMON_TEXT.ENTER_YOUR_EMAIL}
            // width={350}
            value={email}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder={COMMON_TEXT.ENTER_YOUR_EMAIL}
            validate={["email"]}
            validationMessage={[VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT]}
            onChangeText={(text: string) => setEmail(text)}
          />

          <Button
            label={t(COMMON_TEXT.SEND_OTP)}
            backgroundColor={theme.color.primary}
            borderRadius={30}
            disabled={hasValidated.includes(false)}
            // onPress={() => navigate(SCREENS.OTP)}
            onPress={async () => {
              const data = {
                email: email,
              };
              const res = await forgotApi({ data });
              if (res != null) {
                navigate(SCREENS.OTP, {
                  email: email,
                });
                showToast({ title: res?.message });
              }
            }}
            style={{ height: 50, marginVertical: 20 }}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ForgotPass;
