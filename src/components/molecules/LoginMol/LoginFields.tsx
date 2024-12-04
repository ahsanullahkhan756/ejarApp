import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, VARIABLES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { useDispatch } from "react-redux";
import { setIsLoading, setLoggedIn } from "../../../redux/slice/user";
import ForgotText from "../SignUpMol/ForgotText";
import {
  getBrand,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from "react-native-device-info";
import { Platform } from "react-native";
import { loginApi } from "../../../api/auth";
import { setItem } from "../../../utils/storage";

const LoginFields = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  return (
    <View marginH-20>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
        Hi, Welcome Back!
      </Typography>

      <View marginV-20>
        <InputText
          label={"Email"}
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
          // rightImage={!password ? IMAGES.eyeOn : IMAGES.eyeOff}
          placeholder="Please enter your password"
          // validate={[
          //   (v) =>
          //     /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
          // ]}
          // validationMessage={[
          //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          // ]}
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

            const data = {
              email: email,
              password: password,
              device_token: "a73th00eyopfdj1",

              udid: await getUniqueId(),
              device_type: Platform.OS,
              device_brand: getBrand(),
              device_os: getSystemVersion(),
              app_version: getVersion(),
            };

            const res = await loginApi({ data });
            console.log("resp", res);

            if (res != null) {
              setItem(VARIABLES.USER_TOKEN, "res?.token");
              dispatch(setLoggedIn(true));
              dispatch(setIsLoading(true));
              // dispatch(setUserType("user"));
            }

        }}
        // disabled={!isFormValid()}
        style={{ height: 50, margin: 20 }}
      />
    </View>
  );
};

export default LoginFields;
