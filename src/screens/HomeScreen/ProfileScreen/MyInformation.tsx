import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import PersonalInfo from "../../../components/molecules/ProfileMol/PersonalInfo";
import ChangePassword from "../../../components/molecules/ProfileMol/ChangePassword";
import { theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import { COMMON_TEXT } from "../../../constants/screens";
import { useTranslation } from "../../../hooks/useTranslation";

const MyInformation = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.MY_INFORMATION} centerImg={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginH-20>
          <PersonalInfo />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default MyInformation;
