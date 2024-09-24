import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import PersonalInfo from "../../../components/molecules/ProfileMol/PersonalInfo";
import ChangePassword from "../../../components/molecules/ProfileMol/ChangePassword";
import { theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";

const MyInformation = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Information"} centerImg={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginH-20>
          <PersonalInfo />
          <ChangePassword />
        </View>
        <Button
          label="Save"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() => onBack()}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default MyInformation;
