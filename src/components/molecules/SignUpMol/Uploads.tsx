import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import ForgotText from "./ForgotText";

const Uploads = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(true);

  return (
    <View marginH-20>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
      Uploads
      </Typography>

      <View marginV-20>
        <InputText
          label={"Email"}
          width={350}
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
          label={"Phone Number"}
          width={350}
          value={phone}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="Please enter your number"
          validate={["phone"]}
          onChangeText={(text: string) => setPhone(text)}
        />

        <InputText
          label={"Password:"}
          width={350}
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
      <ForgotText />
    </View>
  );
};

export default Uploads;
