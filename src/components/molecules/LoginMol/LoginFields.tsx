import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, VARIABLES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { useDispatch } from "react-redux";
import {
  setIsLoading,
  setLoggedIn,
  setUserDetails,
} from "../../../redux/slice/user";
import ForgotText from "../SignUpMol/ForgotText";
import { getFCMToken, loginApi } from "../../../api/auth";
import { setItem } from "../../../utils/storage";
import { showToast } from "../../../utils/toast";

const LoginFields = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState(__DEV__ ? "shahid@mailinator.com" : "");
  const [password, setPassword] = useState(__DEV__ ? "Passward123!" : "");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
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
        Hi, Welcome Back!
      </Typography>

      <View marginV-20>
        <InputText
          label={"Email"}
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
          keyboardType="email-address"
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />

        <InputText
          label={"Password"}
          // width={350}
          value={password}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setPasswordVisible(!passwordVisible)}
          secureTextEntry={passwordVisible}
          rightImage={!passwordVisible ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder="Please enter your password"
          validate={[
            (v) =>
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
          ]}
          validationMessage={[
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          ]}
          onChangeText={(text: string) => setPassword(text)}
        />
      </View>
      <ForgotText termsText={false} />
      <Button
        label="Sign In"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        // disabled={hasValidated.includes(false)}
        // onPress={() => dispatch(setLoggedIn(true))}
        onPress={async () => {
          if (isFormValid()) {
            const data = {
              email: email,
              password: password,
              fcmToken: await getFCMToken(),
            };
            const res = await loginApi({ data });
            console.log(res);
            if (res != null) {
              console.log("res", res);
              setItem(VARIABLES.USER_TOKEN, res?.token);
              dispatch(setLoggedIn(true));
              dispatch(setIsLoading(true));
              dispatch(setUserDetails(res));
            }
          }
        }}
        disabled={!isFormValid()}
        style={{
          backgroundColor: isFormValid() ? theme.color.primary : "#999B9F",
          height: 50,
          margin: 20,
        }}
      />
    </View>
  );
};

export default LoginFields;
