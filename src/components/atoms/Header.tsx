import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, theme } from "../../constants";
import { Image, View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { scale, verticalScale } from "react-native-size-matters";
import { commonStyles } from "../../containers/commStyles";

export const Header = (props: any) => {
  const navigation = useNavigation();
  const {
    onPressLeft = () => onBack(),
    onPressRight = onPressRight,
    leftIcon = IMAGES.leftIcon,
    rightIcon,
    rightIconColor = theme.color.primary,
    titleText = "",
    centerImg = IMAGES.logo,
    leftIconColor = theme.color.primary,
    titleColor = theme.color.black,
  } = props;
  return (
    <View style={[styles.container]}>
      <View height={50} row center>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeft} style={{ flex: 1 }}>
            <Image
              source={leftIcon}
              style={{ width: 25, height: 25 }}
              color={leftIconColor}
            />
          </TouchableOpacity>
        )}
        {centerImg ? (
          <View center> 
          <Image
            source={centerImg}
            style={{ width: scale(180), height: verticalScale(45), top: 20,}}
            resizeMode="contain"
          />
          </View>
        ) : (

          <View>
            <View style={commonStyles.lineBar}/>
            <Typography
            size={theme.fontSize.large20}
            align="center"
            textType="semiBold"
            color={titleColor}
          >
            {titleText}
          </Typography>
           </View> 
        )}

        <View flex>
          <View row style={{ alignSelf: "flex-end" }}>
            {rightIcon && (
              <TouchableOpacity onPress={onPressRight}>
                <Image
                  source={rightIcon}
                  color={rightIconColor}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS == "ios" ? 50 : 30,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: theme.fontSize.large,
    color: theme.color.black,
    alignSelf: "center",
  },
});
