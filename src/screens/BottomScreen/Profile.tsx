import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { View } from "react-native-ui-lib";
import ImagePicker from "react-native-image-crop-picker";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { Typography } from "../../components/atoms/Typography";
import ProfileList from "../../components/molecules/ProfileMol/ProfileList";
import { useSelector } from "react-redux";
import { useTranslation } from "../../hooks/useTranslation";
import { COMMON_TEXT } from "../../constants/screens";

const Profile = () => {
  const [avatar, setAvatar] = useState(IMAGES.avatar);
  const { t } = useTranslation();

  const openImagePicker = () => {
    Alert.alert(
      t(COMMON_TEXT.SELECT_IMAGE),
      t(COMMON_TEXT.CHOOSE_AN_OPTION),
      [
        {
          text: t(COMMON_TEXT.CAMERA),
          onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: true,
            })
              .then((image) => {
                setAvatar({ uri: image.path });
              })
              .catch((error) => {
                console.log("Error opening camera: ", error);
              });
          },
        },
        {
          text: t(COMMON_TEXT.GALLERY),
          onPress: () => {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            })
              .then((image) => {
                setAvatar({ uri: image.path });
              })
              .catch((error) => {
                console.log("Error opening gallery: ", error);
              });
          },
        },
        {
          text: t(COMMON_TEXT.CANCEL),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const userdata = useSelector((state) => state?.user?.userDetails);
  console.log("userdata", userdata);

  const UserData = () => {
    return (
      <View row gap-20 style={{ alignItems: "center" }}>
        <ImageBackground
          source={avatar}
          style={{ width: 80, height: 80 }}
          imageStyle={{ borderRadius: 40 }}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={openImagePicker}
          >
            <Image
              source={IMAGES.camera}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Typography textType="bold" size={theme.fontSize.large}>
              {COMMON_TEXT.HI}
            </Typography>
            <Typography textType="bold" size={theme.fontSize.large}>
              {userdata?.firstName}
            </Typography>
          </View>
          <Typography color={theme.color.descColor}>
            {userdata?.phone}
          </Typography>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.PROFILE} centerImg={false} />
      <View marginH-20>
        {UserData()}
        <ProfileList />
      </View>
    </SafeAreaContainer>
  );
};

export default Profile;
