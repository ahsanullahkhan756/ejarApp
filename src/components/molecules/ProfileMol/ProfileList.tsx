import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { navigate } from "../../../navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../../redux/slice/user";
import { Typography } from "../../atoms/Typography";
import { Button } from "react-native-ui-lib";

const ProfileList = (props: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
      navigateTo: SCREENS.USER_BOOKING,
      params: { title: "Privacy Policy" },
    },
    {
      id: 8,
      title: "Change Language",
      image: IMAGES.changeLang,
      navigateTo: SCREENS.CHANGE_LANGUAGE,
    },
    { id: 5, title: "Delete Account", image: IMAGES.delete, },
    { id: 6, title: "Sign out", image: IMAGES.signOut, },
  ];

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.id === 5
            ? setShowDeleteModal(true)
            : item.navigateTo
            ? navigate(item.navigateTo, item.params)
            : setShowLogoutModal(true)
        }
      >
        <View row marginV-20>
          <Image
            source={item.image}
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
          />
          <View marginL-20 flex>
            <View row spread>
              <Typography size={theme.fontSize.medium} color={"#272727"}>
                {item.title}
              </Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleDeleteAccount = () => {
    dispatch(setLoggedIn(false));
    setShowDeleteModal(false);
  };

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    setShowLogoutModal(false);
  };

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Delete Account Modal */}
      <Modal
        transparent={true}
        visible={showDeleteModal}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Typography size={theme.fontSize.large20} textType="bold">
              Delete Account
            </Typography>
            <Typography style={styles.modalText}>
              Are you sure you want to delete your account?
            </Typography>
            <View row spread gap-10>
              <Button
                label="Cancel"
                style={{width:100}}
                backgroundColor={theme.color.primary}
                onPress={() => setShowDeleteModal(!showDeleteModal)}
              />
              <Button
                label="Delete"
                style={{width:100}}
                backgroundColor={theme.color.blue}
                onPress={handleDeleteAccount}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Modal */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="slide"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Typography size={theme.fontSize.large20} textType="bold">
              Logout
            </Typography>
            <Typography style={styles.modalText}>
              Do you want to logout from your account?
            </Typography>
            <View row spread gap-10>
              <Button
                label="Cancel"
                style={{width:100}}
                backgroundColor={theme.color.primary}
                onPress={() => setShowLogoutModal(!showLogoutModal)}
              />
              <Button
                label="Delete"
                style={{width:100}}
                backgroundColor={theme.color.blue}
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileList;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    marginVertical: 20,
  },
});
