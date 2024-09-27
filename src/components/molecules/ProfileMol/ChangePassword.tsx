import React, { useState } from "react";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { InputText } from "../../atoms/InputText";

const ChangePassword = (props: any) => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [passwordVisible3, setPasswordVisible3] = useState(true);

  
  return (
<View>
    <View marginV-10>
    <Typography>Change Password</Typography>

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

        onPressRight={() => setPasswordVisible(!passwordVisible)}
        secureTextEntry={passwordVisible}
        rightImage={!passwordVisible ? IMAGES.eyeOn : IMAGES.eyeOff}
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
        onPressRight={() => setPasswordVisible2(!passwordVisible2)}
        secureTextEntry={passwordVisible2}
        rightImage={!passwordVisible2 ? IMAGES.eyeOn : IMAGES.eyeOff}
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
        onPressRight={() => setPasswordVisible3(!passwordVisible3)}
        secureTextEntry={passwordVisible3}
        rightImage={!passwordVisible3 ? IMAGES.eyeOn : IMAGES.eyeOff}
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
    </View>
  );
};

export default ChangePassword;
