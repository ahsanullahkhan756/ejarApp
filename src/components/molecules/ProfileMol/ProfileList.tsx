import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Switch, View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { navigate } from "../../../navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../redux/slice/user";
import { Typography } from "../../atoms/Typography";

const ProfileList = (props: any) => {
  const { onPress } = props;
  const dispatch = useDispatch();

  const DATA = [
    {
      id: 1,
      title: "My Information",
      image: IMAGES.userProfile,
      navigateTo: SCREENS.MY_INFORMATION,
    },
    {
      id: 2,
      title: "My Address",
      image: IMAGES.map,
      navigateTo: SCREENS.MY_ADDRESS,
    },
    {
      id: 7,
      title: "My Bookings",
      image: IMAGES.userBooking,
      navigateTo: SCREENS.MY_BOOKING,
      params: { title: "Privacy Policy" },
    },
    {
      id: 8,
      title: "Change Language",
      image: IMAGES.changeLang,
      navigateTo: SCREENS.CHANGE_LANGUAGE,
    },
    { id: 5, title: "Delete Account", image: IMAGES.delete, navigateTo: null },
    { id: 6, title: "Sign out", image: IMAGES.signOut, navigateTo: null },
  ];

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.id === 5
            ? deleteAccount()
            : item.navigateTo
            ? navigate(item.navigateTo, item.params)
            : logoutAlert()
        }
      >
        <View row marginV-20 >
          <Image
            source={item.image}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
          <View marginL-20 flex>
            <View row spread>
              <Typography size={theme.fontSize.medium} color={"#272727"}>{item.title}</Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const deleteAccount = () => {
    Alert.alert("Delete Account", "Do you want to delete your account?", [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(setLoggedIn(false));
        },
      },
    ]);
  };

  const logoutAlert = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      {
        text: "Cancel",
        onPress: null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(setLoggedIn(false));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProfileList;
