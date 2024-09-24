import React from "react";
import {
  StyleSheet,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";

const UserBooking = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Booking"} centerImg={false} />
      <View marginH-20>

      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default UserBooking;
