// import React, { useState } from "react";
// import SafeAreaContainer from "../../containers/SafeAreaContainer";
// import { ScrollView } from "react-native";
// import { Button, View } from "react-native-ui-lib";
// import { Header } from "../../components/atoms/Header.tsx";
// import { Typography } from "../../components/atoms/Typography.tsx";
// import { commonStyles } from "../../containers/commStyles.tsx";
// import { theme } from "../../constants/Constants.ts";
// import { InputText } from "../../components/atoms/InputText.tsx";
// import { navigate, onBack } from "../../navigation/RootNavigation.tsx";
// import { SCREENS } from "../../constants/ScreenNames.tsx";
// import { IMAGES } from "../../constants/Images.tsx";
// import { resetPassword } from "../../api/auth.js";
// import { showToast } from "../../utils/toast.tsx";

// const ResetPassword = (props:any) => {
//   const otp = props?.route?.params?.otp

//   const [hasValidated, setValidated] = useState(new Array(2).fill(false));
//   const [password2, setPassword2] = useState('');
//   const [passwordVisible2, setPasswordVisible2] = useState(true);
//   const [passwordVisible, setPasswordVisible] = useState(true);
//   return (
//     <SafeAreaContainer safeArea={false}>
//       <Header />
//       <View margin-20>
//         <View style={commonStyles.lineBar} />
//         <Typography textType="bold" size={theme.fontSize.large24}>
//           Reset Password
//         </Typography>

//         <View marginV-10>
//           <InputText
//             label={"Enter your new password"}
//             onValidationFailed={(isValid: boolean) => {
//               setValidated((prev) => {
//                 let copy = [...prev];
//                 copy[0] = isValid;
//                 return copy;
//               });
//             }}
//             style={{ width: "100%" }}
//             onPressRight={() => setPasswordVisible(!passwordVisible)}
//             secureTextEntry={passwordVisible}
//             rightImage={!passwordVisible ? IMAGES.eyeOn : IMAGES.eyeOff}
//             // onPressRight={() => setPassword(!password)}
//             // secureTextEntry={true}
//             validate={[
//               (v) =>
//                 /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
//                   v
//                 ),
//             ]}
//             validationMessage={[
//               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//             ]}
//             placeholder="**********"
//           />
//           <InputText
//             label={"Confirm password"}
//             onValidationFailed={(isValid: boolean) => {
//               setValidated((prev) => {
//                 let copy = [...prev];
//                 copy[1] = isValid;
//                 return copy;
//               });
//             }}
//             style={{ width: "100%" }}
//             onPressRight={() => setPasswordVisible2(!passwordVisible2)}
//             secureTextEntry={passwordVisible2}
//             rightImage={!passwordVisible2 ? IMAGES.eyeOn : IMAGES.eyeOff}
//             validate={[
//               (v) =>
//                 /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
//                   v
//                 ),
//             ]}
//             validationMessage={[
//               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//             ]}
//             placeholder="**********"
//           />
//         </View>
//         <Button
//           label="Reset Password"
//           backgroundColor={theme.color.primary}
//           borderRadius={30}
//           disabled={hasValidated.includes(false)}
//           // onPress={() => navigate(SCREENS.LOGIN)}
//           onPress={async () => {
//             const data = {
//               otp: otp,
//               password:passwordVisible
//             };
//             const res = await resetPassword({ data });
//             if (res != null) {
//               console.log('res',res);

//               navigate(SCREENS.LOGIN,{
//                 otp:otp
//               })
//               showToast({ title: res});
//             }
//           }
//         }
//           style={{ height: 50, marginVertical: 20 }}
//         />
//       </View>
//     </SafeAreaContainer>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect } from "react";
import { Image, Platform, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { Button, View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { InputText } from "../../components/atoms/InputText";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { commonStyles } from "../../containers/commStyles";
import { resetPassword } from "../../api/auth.js";
import { showToast } from "../../utils/toast.tsx";
import { COMMON_TEXT } from "../../constants/screens/index.tsx";
import { VALIDATION_MESSAGES } from "../../validationMessages/index.tsx";
import { useTranslation } from "../../hooks/useTranslation.tsx";

const ResetPassword = (props: any) => {
  const otp = props?.route?.params?.otp;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [passwordVisible3, setPasswordVisible3] = useState(true);
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { t } = useTranslation();

  const validatePassword = (password: string) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      password
    );
  };

  const passwordsMatch = (newPassword: string, confirmPassword: string) => {
    return newPassword === confirmPassword;
  };

  const validatePasswords = () => {
    const isPasswordValid = validatePassword(newPassword);
    const isConfirmPasswordValid = passwordsMatch(newPassword, confirmPassword);

    setValidated([isPasswordValid, isConfirmPasswordValid]);
    setIsButtonEnabled(isPasswordValid && isConfirmPasswordValid);
  };

  useEffect(() => {
    validatePasswords();
  }, [newPassword, confirmPassword]);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.NEW_PASSWORD} rightIcon={false} />
      <View padding-20>
        <View style={commonStyles.lineBar} />
        <Typography
          style={{ marginBottom: 20 }}
          textType="bold"
          size={theme.fontSize.large24}
        >
          {COMMON_TEXT.OTP_VERIFICATION}
        </Typography>

        {/* New Password Input */}
        <InputText
          label={COMMON_TEXT.ENTER_NEW_PASSWORD}
          onChangeText={setNewPassword}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          style={{ marginVertical: Platform.OS == "ios" ? 10 : 0 }}
          onPressRight={() => setPasswordVisible2(!passwordVisible2)}
          secureTextEntry={passwordVisible2}
          rightImage={!passwordVisible2 ? IMAGES.eyeOn : IMAGES.eyeOff}
          validate={[(v) => validatePassword(v)]}
          validationMessage={[VALIDATION_MESSAGES.PASSWORD_MUST_CONTAIN]}
          placeholder={COMMON_TEXT.NEW_PASSWORD}
        />

        {/* Confirm Password Input */}
        <InputText
          label={COMMON_TEXT.CONFIRM_PASSWORD}
          onChangeText={setConfirmPassword} // Update confirm password
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          style={{ marginVertical: Platform.OS == "ios" ? 10 : 0 }}
          onPressRight={() => setPasswordVisible3(!passwordVisible3)}
          secureTextEntry={passwordVisible3}
          rightImage={!passwordVisible3 ? IMAGES.eyeOn : IMAGES.eyeOff}
          validate={[(v) => passwordsMatch(newPassword, v)]}
          validationMessage={[VALIDATION_MESSAGES.PASSWORDS_MUST_MATCH]}
          placeholder={COMMON_TEXT.CONFIRM_PASSWORD}
        />

        {/* Confirm Button */}
        <View marginV-100>
          <Button
            label={t(COMMON_TEXT.RESET_PASSWORD)}
            backgroundColor={
              isButtonEnabled ? theme.color.primary : theme.color.descColor
            }
            style={{ height: 55 }}
            disabled={!isButtonEnabled}
            onPress={async () => {
              const data = {
                otp: otp,
                password: confirmPassword,
              };
              const res = await resetPassword({ data });
              if (res != null) {
                navigate(SCREENS.LOGIN);
                showToast({ title: res?.message });
              }
            }}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ResetPassword;
