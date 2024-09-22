import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextInput,
  Image,
} from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, SCREENS, theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { scale, verticalScale } from "react-native-size-matters";

export const SearchBar = (props: any) => {
  const navigation = useNavigation();
  const {
    onPressLeft = () => onBack(),
    leftIcon = IMAGES.leftIcon,
    rightIcon,
    rightIconColor = theme.color.primary,
    titleText = "",
    centerImg = IMAGES.logo,
    leftIconColor = theme.color.primary,
    titleColor = theme.color.primary,
    onPress =()=>navigate(SCREENS.FILTER_SCREEN)
  } = props;
  return (
    <View marginB-30 row gap-10 spread style={{ alignItems: "center" }}>
      <View row style={[styles.container, { gap: 10 }]}>
        <Image
          source={IMAGES.searchIcon}
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Search keywords.."
          placeholderTextColor={theme.color.white}
          style={{ width: scale(200), color: theme.color.white }}
        />
      </View>
      <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={IMAGES.filter}
          style={{ height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: theme.color.orange,
  },
  headerText: {
    fontSize: theme.fontSize.large,
    color: theme.color.black,
    alignSelf: "center",
  },
});
