import React from "react";
import { View, Text } from "react-native-ui-lib";
import { theme } from "../constants/Constants";
import { navigate } from "./RootNavigation";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { IMAGES, SCREENS } from "../constants";
import { Typography } from "../components/atoms/Typography";
import { COMMON_TEXT } from "../constants/screens";

const BottomTabs = (props: any) => {
  return (
    <View style={[styles.tabContainer]}>
      {BOTTOMTABS.map((i, index) => {
        const isActive = i.key == props.state.index;
        return (
          <TouchableOpacity
            style={styles.tabView}
            onPress={() => navigate(i.navigateTo)}
          >
            <Image
              source={i.image}
              style={{
                marginVertical: 5,
                width: 26,
                height: 25,
                tintColor: isActive ? theme.color.primary : theme.color.white,
              }}
              resizeMode="contain"
            />
            <Typography color={isActive ? theme.color.primary : theme.color.white} size={theme.fontSize.extraVSmall}>{i.title}</Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};



const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.color.blue,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  activeTabView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.primary,
  },
  tabText: {
    fontSize: 12,
    marginTop: 6,
  },
});

export const BOTTOMTABS = [
  {
    key: 0,
    title: COMMON_TEXT.HOME,
    navigateTo: SCREENS.HOME,
    image: IMAGES.homeIcon,
  },
  {
    key: 1,
    title:COMMON_TEXT.SEARCH,
    navigateTo: SCREENS.SEARCH_SCREEN,
    image: IMAGES.searchIcon,
  },
  {
    key: 2,
    title:COMMON_TEXT.NOTIFICATIONS,
    navigateTo: SCREENS.NOTIFICATION,
    image: IMAGES.notification,
  },
  {
    key: 3,
    title: COMMON_TEXT.PROFILE,
    navigateTo: SCREENS.PROFILE,
    image: IMAGES.profileIcon,
  },
];


export default BottomTabs;
