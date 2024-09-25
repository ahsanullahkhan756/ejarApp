import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { navigate, onBack } from "../../navigation/RootNavigation";
import SignatureView from "react-native-signature-canvas";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { commonStyles } from "../../containers/commStyles";

const Contract = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const handleSignature = (signature: any) => {
    setIsSigned(true);
  };

  const PERSONAL_DATA = [
    { title: "First Name:", subTitle: "Fahad" },
    { title: "Last Name:", subTitle: "Sheikh" },
    { title: "VIN:", subTitle: "123 456 789 0" },
    { title: "Plate Number:", subTitle: "DBI 987654" },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <Header titleText="Contract" centerImg={false} />
      </View>

      {/* ScrollView only contains text */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View padding-20>
          {PERSONAL_DATA.map((i) => {
            return (
              <View row spread marginB-10>
                <Typography style={{ flex: 1 }}>{i.title}</Typography>
                <Typography style={{ flex: 1 }}>{i.subTitle}</Typography>
                <View />
              </View>
            );
          })}
          <Typography color={theme.color.descColor} size={theme.fontSize.small}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit{"\n"}
            {"\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit
            {"\n"}
          </Typography>
        </View>
      </ScrollView>

      {/* Signature and Button fixed at the bottom */}
      <View style={styles.fixedBottomContainer}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={{ height: 250 }}>
            <SignatureView
              // onOK={handleSignature}
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => {
                setScrollEnabled(true);
                handleSignature();
              }}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              imageType="image/jpeg"
            />
          </View>
        </ScrollView>

        {/* Acknowledged Button */}
        <Button
          label="Acknowledged"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          style={styles.button}
          disabled={!isSigned} // Disable the button until signature is done
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={commonStyles.centerView}
        >
          <View style={commonStyles.modalStyle}>
            <Image
              source={IMAGES.bookingImg}
              resizeMode="contain"
              style={{ width: 200, height: 200 }}
            />
            <Button
              label="View My Booking"
              backgroundColor={theme.color.primary}
              borderRadius={30}
              style={styles.button}
              onPress={() => {
                setModalVisible(false)
                navigate(SCREENS.USER_BOOKING)}
              }
            />
            <Button
              label="Back to Home"
              backgroundColor={theme.color.blue}
              borderRadius={30}
              style={styles.button}
              onPress={() => {
                setModalVisible(false)
                navigate(SCREENS.HOME)
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    flex: 1, // The text content is scrollable
  },
  fixedBottomContainer: {
    padding: 20,
    backgroundColor: theme.color.white,
  },
  button: {
    height: 50,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Contract;
