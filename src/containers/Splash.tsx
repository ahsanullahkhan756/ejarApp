import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SafeAreaContainer from './SafeAreaContainer';
import { IMAGES } from '../constants';

const Splash = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
       
        <Image
          source={IMAGES.SplashImg}
          style={{width: '100%' , height: '100%'}}
          resizeMode="cover"
        />
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

export default Splash;
