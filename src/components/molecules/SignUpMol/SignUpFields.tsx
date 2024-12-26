import React, { useEffect, useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, VARIABLES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import ForgotText from "./ForgotText";
import { getFCMToken, signUpApi } from "../../../api/auth";
import { setItem } from "../../../utils/storage";
import {
  setIsLoading,
  setLoggedIn,
  setUserDetails,
} from "../../../redux/slice/user";
import { useDispatch } from "react-redux";
import { COMMON_TEXT } from "../../../constants/screens";
import { VALIDATION_MESSAGES } from "../../../validationMessages";
import { useTranslation } from "../../../hooks/useTranslation";

const SignUpFields = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(5).fill(false));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    console.warn(hasValidated);
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const isFormValid = () => {
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const passwordValid =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);

    return emailValid && passwordValid;
  };

  return (
    <View marginH-20>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
        {COMMON_TEXT.CREATE_AN_ACCOUNT}
      </Typography>

      <View marginV-20>
        <View row flex gap-30>
          <InputText
            label={COMMON_TEXT.FIRST_NAME}
            value={firstname}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder={COMMON_TEXT.ENTER_FIRST_NAME}
            validate={["name"]}
            validationMessage={[VALIDATION_MESSAGES.THIS_FEILD_IS_REQUIRED]}
            onChangeText={(text: string) => setFirstName(text)}
            containerStyle={{
              flex: 1,
            }}
            maxLength={20}
          />
          <InputText
            label={COMMON_TEXT.LAST_NAME}
            value={lastname}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[1] = isValid;
                return copy;
              });
            }}
            placeholder={COMMON_TEXT.ENTER_LAST_NAME}
            validate={["name"]}
            validationMessage={[VALIDATION_MESSAGES.THIS_FEILD_IS_REQUIRED]}
            onChangeText={(text: string) => setLastName(text)}
            containerStyle={{
              flex: 1,
            }}
            maxLength={20}
          />
        </View>
        <InputText
          label={COMMON_TEXT.EMAIL}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[2] = isValid;
              return copy;
            });
          }}
          placeholder={COMMON_TEXT.ENTER_YOUR_EMAIL}
          validate={["email"]}
          validationMessage={[VALIDATION_MESSAGES.INVALID_EMAIL_FORMAT]}
          onChangeText={(text: string) => setEmail(text)}
        />

        <InputText
          label={COMMON_TEXT.PHONE_NUMBER}
          value={phone}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[3] = isValid;
              return copy;
            });
          }}
          keyboardType="phone-pad"
          placeholder={COMMON_TEXT.ENTER_YOUR_PHONE_NUMBER}
          validate={[(v) => v.length > 10]}
          validationMessage={[VALIDATION_MESSAGES.WRONG_PHONE_NUMBER]}
          onChangeText={(text: string) => setPhone(text)}
        />

        <InputText
          label={COMMON_TEXT.PASSWORD}
          value={password}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[4] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setPasswordVisible(!passwordVisible)}
          secureTextEntry={passwordVisible}
          rightImage={!passwordVisible ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder={COMMON_TEXT.ENTER_YOUR_PASSWORD}
          validate={[
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
          ]}
          validationMessage={[VALIDATION_MESSAGES.PASSWORD_MUST_CONTAIN]}
          onChangeText={(text: string) => setPassword(text)}
        />
      </View>
      <ForgotText forgotPass={false} />

      <Button
        label={t(COMMON_TEXT.NEXT)}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          // if (isFormValid()) {
          const data = {
            user: {
              firstName: firstname,
              lastName: lastname,
              email: email,
              phone: phone,
              fcmToken: await getFCMToken(),
              password: password,
            },
            roles: ["8d3a703f-ca87-4f01-bad2-d559726818bb"],
          };
          // }
          const res = await signUpApi({ data });
          console.log("response api", res);

          if (res != null) {
            setCurrentStep(1);
            setItem(VARIABLES.USER_TOKEN, res?.token);
            // dispatch(setLoggedIn(true));
            dispatch(setIsLoading(true));
            dispatch(setUserDetails(res));
            // dispatch(setUserType("user"));
          }
        }}
        disabled={!isFormValid()}
        borderRadius={30}
        style={{
          backgroundColor: isFormValid() ? theme.color.primary : "#999B9F",
          height: 50,
          margin: 20,
        }}
      />
    </View>
  );
};

export default SignUpFields;
