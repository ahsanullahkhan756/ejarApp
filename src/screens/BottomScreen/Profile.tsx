import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { Typography } from "../../components/atoms/Typography";
import ProfileList from "../../components/molecules/ProfileMol/ProfileList";

const Profile = () => {
  const UserData = () => {
    return (
      <View row gap-20 style={{ alignItems: "center" }}>
        <ImageBackground
          source={IMAGES.avatar}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <Image
              source={IMAGES.camera}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <Typography textType="bold" size={theme.fontSize.large}>
            Hi, Muhammad
          </Typography>
          <Typography color={theme.color.descColor}>
            +971 123 456 7890
          </Typography>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Profile"} centerImg={false} />
      <View marginH-20>{UserData()}
        <ProfileList />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default Profile;
