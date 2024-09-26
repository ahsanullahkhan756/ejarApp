import React, { useState } from "react";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { InputText } from "../../atoms/InputText";

const ChangePassword = (props: any) => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [password, setPassword] = useState(false);
  const [password2, setPassword2] = useState(false);
  return (
<>
    <Typography>Change Password</Typography>
    <View marginV-10>
      <InputText
        // label={"Current password"}
        onValidationFailed={(isValid: boolean) => {
          setValidated((prev) => {
            let copy = [...prev];
            copy[1] = isValid;
            return copy;
          });
        }}
        style={{width:'100%'}}
        onPressRight={() => setPassword(!password)}
        secureTextEntry={true}
        rightImage={!password2 ? IMAGES.eyeOn : IMAGES.eyeOff}
        validate={[
          (v) =>
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
        ]}
        validationMessage={[
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ]}
        placeholder="Current password"
      />

      <InputText
        // label={"New Password"}
        onValidationFailed={(isValid: boolean) => {
          setValidated((prev) => {
            let copy = [...prev];
            copy[1] = isValid;
            return copy;
          });
        }}
        style={{width:'100%'}}
        onPressRight={() => setPassword(!password)}
        secureTextEntry={true}
        rightImage={!password2 ? IMAGES.eyeOn : IMAGES.eyeOff}
        validate={[
          (v) =>
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
        ]}
        validationMessage={[
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ]}
        placeholder="New password"
      />
      <InputText
        // label={"Confirm Password"}
        onValidationFailed={(isValid: boolean) => {
          setValidated((prev) => {
            let copy = [...prev];
            copy[1] = isValid;
            return copy;
          });
        }}
        style={{width:'100%'}}
        onPressRight={() => setPassword2(!password2)}
        secureTextEntry={true}
        rightImage={!password2 ? IMAGES.eyeOn : IMAGES.eyeOff}
        validate={[
          (v) =>
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v),
        ]}
        validationMessage={[
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        ]}
        placeholder="Confirm password"
      />
    </View>
    </>
  );
};

export default ChangePassword;
