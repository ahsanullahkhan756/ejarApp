import React from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import AdressFields from "../../../components/molecules/ProfileMol/AdressFields";

const MyAddress = () => {
  return (
    <SafeAreaContainer safeArea={false}>
    <Header titleText={"My Address"} centerImg={false} />
    <ScrollView showsVerticalScrollIndicator={false}>
      <View marginH-20>
        <AdressFields />
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

export default MyAddress;
