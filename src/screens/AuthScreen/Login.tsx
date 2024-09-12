import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { IMAGES } from "../../constants";

const Login = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <Header />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
