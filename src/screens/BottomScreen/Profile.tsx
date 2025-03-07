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
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../hooks/useTranslation";
import { COMMON_TEXT } from "../../constants/screens";
import { sendPicturetoS3 } from "../../services/axios";
import { setUserDetails } from "../../redux/slice/user";
import { updateProfile } from "../../api/auth";

const Profile = () => {
  const userDetails = useSelector((state) => state.user?.userDetails);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(userDetails?.profilePicture?.base64);
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
              .then(async (image) => {
                const response = await sendPicturetoS3(image);
                setAvatar(response);
                const data = {
                  ID: userDetails?.ID,
                  profilePicture: {
                    fileName: "profile.jpg",
                    base64: response,
                    size: 0,
                  },
                };
                const res = await updateProfile({ data, isLoading: false });
                if (res != null) {
                  dispatch(setUserDetails(res));
                }
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
              .then(async (image) => {
                const response = await sendPicturetoS3(image);
                setAvatar(response);
                const data = {
                  ID: userDetails?.ID,
                  profilePicture: {
                    fileName: "profile.jpg",
                    base64: response,
                    size: 0,
                  },
                };
                const res = await updateProfile({ data, isLoading: false });
                if (res != null) {
                  dispatch(setUserDetails(res));
                }
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

  const UserData = () => {
    return (
      <View row gap-20 style={{ alignItems: "center" }}>
        <ImageBackground
          source={avatar ? { uri: avatar } : IMAGES.avatar}
          style={{ width: 80, height: 80 }}
          imageStyle={{ borderRadius: 40, borderWidth: 1 }}
          resizeMode="cover"
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
              {userDetails?.firstName ?? "Guest"}
            </Typography>
          </View>
          <Typography color={theme.color.descColor}>
            {userDetails?.phone}
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
