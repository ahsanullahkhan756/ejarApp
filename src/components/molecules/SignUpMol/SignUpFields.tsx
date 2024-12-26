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

const SignUpFields = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(5).fill(false));
  const dispatch = useDispatch();

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
        Create an Account
      </Typography>

      <View marginV-20>
        <View row flex gap-30>
          <InputText
            label={"First Name"}
            value={firstname}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="Lorem"
            validate={["name"]}
            validationMessage={["Name field is invalid"]}
            onChangeText={(text: string) => setFirstName(text)}
            containerStyle={{
              flex: 1,
            }}
            maxLength={20}
          />
          <InputText
            label={"Last Name"}
            value={lastname}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[1] = isValid;
                return copy;
              });
            }}
            placeholder="Ipsum"
            validate={["name"]}
            validationMessage={["Name field is invalid"]}
            onChangeText={(text: string) => setLastName(text)}
            containerStyle={{
              flex: 1,
            }}
            maxLength={20}
          />
        </View>
        <InputText
          label={"Email"}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[2] = isValid;
              return copy;
            });
          }}
          placeholder="loremipsum@domain.com"
          validate={["email"]}
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />

        <InputText
          label={"Phone Number"}
          value={phone}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[3] = isValid;
              return copy;
            });
          }}
          keyboardType="phone-pad"
          placeholder="Please enter your number"
          validate={[(v) => v.length > 10]}
          validationMessage={[
            "Phone number must be contain at least 11 chracter",
          ]}
          onChangeText={(text: string) => setPhone(text)}
        />

        <InputText
          label={"Password"}
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
          placeholder="Enter your password"
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
      <ForgotText forgotPass={false} />

      <Button
        label={"Next"}
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
