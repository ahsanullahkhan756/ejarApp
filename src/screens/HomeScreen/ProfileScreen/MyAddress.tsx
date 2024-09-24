import React from "react";
import {
  StyleSheet,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";

const MyAddress = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Information"} centerImg={false} />
      <View marginH-20>

      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default MyAddress;
