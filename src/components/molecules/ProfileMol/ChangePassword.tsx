import React, { useState } from "react";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { Button, View } from "react-native-ui-lib";
import { InputText } from "../../atoms/InputText";
import { onBack } from "../../../navigation/RootNavigation";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../atoms/Header";
import { ScrollView } from "react-native";
import { changePassword } from "../../../api/homeServices";
import { showToast } from "../../../utils/toast";

const ChangePassword = (props: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(false)); // for 3 inputs
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [passwordVisible3, setPasswordVisible3] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = () => {
    // Ensure both new and confirm password match
    if (newPassword !== confirmPassword) {
      showToast({ title: "New password and confirm password must match" });
      return false;
    }
    // Validate passwords with the regex
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (
      !passwordRegex.test(newPassword) ||
      !passwordRegex.test(confirmPassword)
    ) {
      showToast({
        title: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (validatePassword()) {
      const data = {
        currentPassword,
        newPassword,
      };

      const res = await changePassword(data);
      console.log(res);
      if (res?.message) {
        showToast({ title: res.message });
        onBack(); // Navigate back after success
      }
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"Change Password"} centerImg={false} />

      <View margin-20>
        <Typography>Change Password</Typography>

        {/* Current Password */}
        <InputText
          onChangeText={setCurrentPassword}
          style={{ width: "100%" }}
          onPressRight={() => setPasswordVisible(!passwordVisible)}
          secureTextEntry={passwordVisible}
          rightImage={!passwordVisible ? IMAGES.eyeOn : IMAGES.eyeOff}
          value={currentPassword}
          placeholder="Current password"
        />

        {/* New Password */}
        <InputText
          onChangeText={setNewPassword}
          style={{ width: "100%" }}
          onPressRight={() => setPasswordVisible2(!passwordVisible2)}
          secureTextEntry={passwordVisible2}
          rightImage={!passwordVisible2 ? IMAGES.eyeOn : IMAGES.eyeOff}
          value={newPassword}
          placeholder="New password"
        />

        {/* Confirm Password */}
        <InputText
          onChangeText={setConfirmPassword}
          style={{ width: "100%" }}
          onPressRight={() => setPasswordVisible3(!passwordVisible3)}
          secureTextEntry={passwordVisible3}
          rightImage={!passwordVisible3 ? IMAGES.eyeOn : IMAGES.eyeOff}
          value={confirmPassword}
          placeholder="Confirm password"
        />

        {/* Save Button */}
        <Button
          label="Save"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={handleChangePassword}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default ChangePassword;

