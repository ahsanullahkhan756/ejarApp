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

const Profile = () => {
  const [avatar, setAvatar] = useState(IMAGES.avatar); 

  // Function to open image picker
  const openImagePicker = () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
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
          text: "Gallery",
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
          text: "Cancel",
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
          source={avatar} // Use the updated avatar image here
          style={{ width: 80, height: 80 }}
          imageStyle={{ borderRadius: 40 }} // Optional: Add border radius for rounded avatar
          resizeMode="contain"
        >
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={openImagePicker} // Open image picker on press
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
      <View marginH-20>
        {UserData()}
        <ProfileList />
      </View>
    </SafeAreaContainer>
  );
};


export default Profile;
