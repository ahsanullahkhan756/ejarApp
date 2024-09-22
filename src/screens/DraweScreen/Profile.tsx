import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import { Header } from "../../components/atoms/Header";

const Profile = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 marginV-10>
        <Header title={"My Profile"} />
      </View>

    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Profile;
