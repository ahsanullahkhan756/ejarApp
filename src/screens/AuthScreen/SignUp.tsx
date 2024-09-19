import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import SignUpTamplet from "../../components/templates/SignUpTamplet/index.tsx";
import { ScrollView } from "react-native";

const SignUp = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <SignUpTamplet />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default SignUp;
