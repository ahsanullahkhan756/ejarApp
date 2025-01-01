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
import { logoutApi } from "../../../api/auth"; // Assuming this is imported
import { COMMON_TEXT } from "../../../constants/screens";
import { useTranslation } from "../../../hooks/useTranslation";

const ProfileList = (props: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const DATA = [
    {
      id: 1,
      title: COMMON_TEXT.MY_INFORMATION,
      image: IMAGES.userProfile,
      navigateTo: SCREENS.MY_INFORMATION,
    },
    {
      id: 2,
      title: COMMON_TEXT.MY_ADDRESS,
      image: IMAGES.map,
      navigateTo: SCREENS.MY_ADDRESS,
    },
    {
      id: 7,
      title: COMMON_TEXT.MY_RENTINGS,
      image: IMAGES.userBooking,
      navigateTo: SCREENS.USER_BOOKING,
      params: { title: COMMON_TEXT.PRIVACY_POLICY },
    },
    {
      id: 9,
      title: COMMON_TEXT.CHANGE_PASSWORD,
      image: IMAGES.userProfile,
      navigateTo: SCREENS.CHANGE_PASSWORD,
    },
    {
      id: 8,
      title: COMMON_TEXT.CHANGE_LANGUAGE,
      image: IMAGES.changeLang,
      navigateTo: SCREENS.CHANGE_LANGUAGE,
    },
    { id: 5, title: COMMON_TEXT.DELETE_ACCOUNT, image: IMAGES.delete },
    { id: 6, title: COMMON_TEXT.LOGOUT, image: IMAGES.signOut },
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

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(setLoggedIn(false));
      setShowLogoutModal(false);
      navigate(SCREENS.LOGIN);
    } catch (error) {
      console.log("Error during logout:", error);
    }
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
              {COMMON_TEXT.DELETE_ACCOUNT}
            </Typography>
            <Typography style={styles.modalText}>
              {COMMON_TEXT.ARE_YOU_SURE_YOU_WANT_TO_DELETE_YOUR_ACCOUNT}
            </Typography>
            <View row spread gap-10>
              <Button
                label={t(COMMON_TEXT.CANCEL)}
                style={{ width: 100 }}
                backgroundColor={theme.color.primary}
                onPress={() => setShowDeleteModal(!showDeleteModal)}
              />
              <Button
                label={t(COMMON_TEXT.DELETE)}
                style={{ width: 100 }}
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
              {COMMON_TEXT.LOGOUT}
            </Typography>
            <Typography style={styles.modalText}>
              {COMMON_TEXT.ARE_YOU_SURE_YOU_WANT_TO_LOGOUT_YOUR_ACCOUNT}
            </Typography>
            <View row spread gap-10>
              <Button
                label={t(COMMON_TEXT.CANCEL)}
                style={{ width: 100 }}
                backgroundColor={theme.color.primary}
                onPress={() => setShowLogoutModal(!showLogoutModal)}
              />
              <Button
                label={t(COMMON_TEXT.LOGOUT)}
                style={{ width: 100 }}
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
