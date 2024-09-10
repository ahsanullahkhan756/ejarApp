import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import { IMAGES } from '../constants';

const SafeAreaContainer = (props: any) => {
  const {
    safeArea = true,
    backgroundColor = 'transparent',
    style = {},
  } = props;

  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const statusBarMode = isDarkMode ? 'light-content' : 'dark-content';
  const statusBarBgColor = isDarkMode ? 'black' : 'white';

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <StatusBar
        translucent={true}
        backgroundColor={statusBarBgColor}
        barStyle={statusBarMode} 
      />

        {safeArea ? (
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: Platform.OS === 'ios' ? 50 : 0,
              ...style,
            }}
          >
            {props.children}
          </SafeAreaView>
        ) : (
          <>{props.children}</>
        )}
    </View>
  );
};

export default SafeAreaContainer;
