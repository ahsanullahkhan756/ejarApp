import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { useDispatch } from "react-redux";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import ForgotText from "./ForgotText";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown";
import { country, gender } from "../../../containers/dummy";
import ImagePicker from "react-native-image-crop-picker";

const InformationIds = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);

  const [issueDate2, setIssueDate2] = useState(true);
  const [expiryDate2, setExpiryDate2] = useState(true);

  const [dob, setDob] = useState(true);

  const [selectImg, setSelectImg] = useState("");
  const [visible, setVisible] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [sliderModal, setSliderModal] = useState(false);
  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  const takePhotoFromCamera = () => {
    console.log("image", selectImg);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((images) => {
        console.log("img", images);
        setSelectImg({
          name: images.filename || `image_${new Date().getDate()}`,
          type: images.mime,
          uri: images.path,
        });
        setVisible(false);
      })
      .catch((error) => {
        console.log("error", error);
        setVisible(false);
      });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    })
      .then((images) => {
        console.log("gal", images);
        setSelectImg({
          name: images.filename || `image_${new Date().getDate()}`,
          type: images.mime,
          uri: images.path,
        });
        setVisible(false);
      })
      .catch((error) => {
        console.log("error", error);
        setVisible(false);
      });
  };


  const dateFields = () => {
    return (
      <View row gap-30 style={{ alignItems: "center" }}>
        <InputDateTime
          title={"Issue Date"}
          placeholder={"Issue Date"}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={issueDate}
          onChange={setIssueDate}
          onConfirm={(selectedDate: any) => {
            console.log("Selected Date:", selectedDate);
            setIssueDate(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
          style={{ width: 160 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
        />

        <InputDateTime
          title={"Expiry Date"}
          placeholder={"Expiry Date"}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={expiryDate}
          onChange={setExpiryDate}
          onConfirm={(selectedDate: any) => {
            console.log("Selected Date:", selectedDate);
            setExpiryDate(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
          style={{ width: 160 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
        />
      </View>
    );
  };
  const dateFields2 = () => {
    return (
      <View row gap-30 style={{ alignItems: "center" }}>
        <InputDateTime
          title={"Issue Date"}
          placeholder={"Issue Date"}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={issueDate2}
          onChange={setIssueDate2}
          onConfirm={(selectedDate: any) => {
            console.log("Selected Date:", selectedDate);
            setIssueDate2(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
          style={{ width: 160 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
        />

        <InputDateTime
          title={"Expiry Date"}
          placeholder={"Expiry Date"}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={expiryDate2}
          onChange={setExpiryDate2}
          onConfirm={(selectedDate: any) => {
            console.log("Selected Date:", selectedDate);
            setExpiryDate2(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
          style={{ width: 160 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
        />
      </View>
    );
  };
  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        Submit information regarding IDs and licenses
      </Typography>

      <View paddingV-20>
        <InputText
          label={"ID Number"}
          width={350}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** *******    *****"
          validate={["email"]}
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />

        <View marginV-10>{dateFields()}</View>
        <InputText
          label={"Passport Number"}
          width={350}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** *******  *****"
          validate={["email"]}
          validationMessage={["Email is invalid"]}
          onChangeText={(text: string) => setEmail(text)}
        />
          <View marginV-10>{dateFields2()}</View>
        <View row gap-30 marginT-20 style={{ alignItems: "center" }}>
          <View style={{ top: -20 }}>
            <Typography size={theme.fontSize.small}>Nationality</Typography>
            <DropDown data={country} width={170} height={55} />
          </View>
          <InputText
            style={{ marginBottom: 20 }}
            label={"Place Of Birth"}
            width={150}
            value={email}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="Place Of Birth"
            validate={["email"]}
            validationMessage={["Email is invalid"]}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>

        <View row gap-30 marginV-0 style={{ alignItems: "center" }}>
          <InputDateTime
            title={"Date of Birth"}
            placeholder={"Date of Birth"}
            placeholderColor={theme.color.black}
            mode={"date"}
            value={dob}
            onChange={setDob}
            onConfirm={(selectedDate: any) => {
              console.log("Selected Date:", selectedDate);
              setDob(selectedDate);
              hidePicker();
            }}
            visible={datePickerVisible}
            style={{ width: 160 }}
            rightIcon={
              <Image
                source={IMAGES.calendarIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            }
          />
          <View style={{ top: -10 }}>
            <Typography size={theme.fontSize.small}>Sex</Typography>
            <DropDown data={gender} width={170} height={55} />
          </View>
        </View>
        {/* Cmaera Icon */}
        <View center marginV-0>
          <TouchableOpacity>
          <Image
            source={IMAGES.cameraIcon}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
          </TouchableOpacity>
          <Typography color={theme.color.descColor}>
            Scan your License & ID card
          </Typography>
          <View
            style={[
              commonStyles.lineBar,
              {
                marginVertical: 20,
                width: 320,
                borderColor: theme.color.descColor,
                borderWidth: 0.3,
              },
            ]}
          />

          <Typography
            textType="bold"
            size={theme.fontSize.extraLarge}
            color={theme.color.black}
          >
            Or
          </Typography>
          <TouchableOpacity>

          <View style={commonStyles.cardWithShadow}>
            <Image
              source={IMAGES.upload}
              style={{ width: 200, height: 180 }}
              resizeMode="contain"
            />
          </View>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: theme.color.descColor,
              marginVertical: 20,
            }}
          >
            <Image
              source={IMAGES.uploadPdf}
              style={{ width: 320, height: 50 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>


      <Modal animationType="slide" transparent={true} visible={visible}>
        <TouchableOpacity
          onPress={() => {
            setVisible(!visible);
          }}
          style={commonStyles.centerView}
        />

        <View style={{ position: "absolute", bottom: 20 }}>
          <View style={commonStyles.modalStyle}>
            <TouchableOpacity
              style={styles.profileStyle}
              onPress={takePhotoFromCamera}
            >
              <Typography style={styles.textStyle}>Take Photos</Typography>
            </TouchableOpacity>
            <View style={styles.lineBar} />
            <TouchableOpacity
              style={styles.profileStyle}
              onPress={choosePhotoFromLibrary}
            >
              <Typography style={styles.textStyle}>
                Choose from Gallery
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={[styles.cancelStyle, { marginTop: 10 }]}>
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
              }}
            >
              <Typography style={{ color: "#007bff" }}>Cancel</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Modal Styling
  centerView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalStyle: {
    borderRadius: 10,
    backgroundColor: theme.color.white,
    width: 300,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  profileStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  cancelStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor:theme.color.white,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  lineBar: {
    width: "100%",
    borderBottomWidth: 0.5,
  },
  cameraIcon: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
  textStyle: {
    color: "#007bff",
    marginVertical: 10,
    fontSize: 16,
  },
  mainReportView: {
    position: "absolute",
    top: 180,
    right: 20,
    backgroundColor: theme.color.white,
    padding: 15,
    borderRadius: 10,
    // ...commonStyles.boxShadow,
  },
  inputField: {
    margin: 20,
    borderWidth: 1,
    borderColor: theme.color.black,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default InformationIds;
