import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { Text } from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';

const Home = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
       <Text>Home</Text>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:"center"
  },

});

export default Home;
