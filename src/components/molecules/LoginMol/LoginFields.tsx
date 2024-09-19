import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";

const LoginFields = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(true);

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
          placeholder="Enter your email"
          validate={["email"]}
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />

        <InputText
          label={"Password:"}
          value={password}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          onPressRight={() => setPassword(!password)}
          secureTextEntry={password}
          rightImage={!password ? IMAGES.eyeOn : IMAGES.eyeOff}
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
    </View>
  );
};

export default LoginFields;
