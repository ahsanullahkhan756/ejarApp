import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";

const OnBoarding = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View center marginT-50>
        <Image
          source={IMAGES.logo}
          style={{
            width: scale(150),
            height: verticalScale(50),
          }}
          resizeMode="contain"
        />
      </View>
      <Text marginV-10 bold extraLarge center>
        Select Language
      </Text>
      <View marginH-20>
        <Text marginV-10 bold extraLarge center>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </Text>
      </View>
      <View center>
      <Image
          source={IMAGES.onBoardingImg}
          style={{
            width: scale(300),
            height: verticalScale(300),
          }}
          resizeMode="contain"
        />
        </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default OnBoarding;
