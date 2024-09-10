import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Text } from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';

const Login = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
       <Text>Login</Text>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default Login;
