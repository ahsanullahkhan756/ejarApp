import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { ScrollView } from "react-native";
import LoginTamplet from "../../components/templates/LoginTamplet/index.tsx";

const Login = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <LoginTamplet />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Login;
