import React, { useEffect, useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown";
import { country, gender } from "../../../containers/dummy";
import ImagePicker from "react-native-image-crop-picker";
import { InputField } from "../../atoms/InputField";
import { verticalScale } from "react-native-size-matters";

const InformationIds = ({ onValidate }: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [visible, setVisible] = useState(false);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);

  const [issueDate2, setIssueDate2] = useState(true);
  const [expiryDate2, setExpiryDate2] = useState(true);

  const [dob, setDob] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isTakingFront, setIsTakingFront] = useState(true);

  useEffect(() => {
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
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
          // style={{ width: 165 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20, tintColor: theme.color.tgray }}
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
          // style={{ width: 165 }}
          rightIcon={
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20, tintColor: theme.color.tgray }}
              resizeMode="contain"
            />
          }
        />
      </View>
    );
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        if (isTakingFront) {
          setFrontImage({ uri: image.path });
        } else {
          setBackImage({ uri: image.path });
        }
        setIsTakingFront(false); // Switch to taking back image
        setVisible(false);
      })
      .catch((error) => {
        console.log("Error opening camera: ", error);
        setVisible(false);
      });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    })
      .then((image) => {
        if (isTakingFront) {
          setFrontImage({ uri: image.path });
        } else {
          setBackImage({ uri: image.path });
        }
        setIsTakingFront(false); // Switch to taking back image
        setVisible(false);
      })
      .catch((error) => {
        console.log("Error opening camera: ", error);
        setVisible(false);
      });
  };
  const removeImage = (isFront) => {
    if (isFront) {
      setFrontImage(null);
      setIsTakingFront(true); // Reset to front
    } else {
      setBackImage(null);
    }
  };
  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        ID Card Information
      </Typography>

      {(!frontImage || !backImage) && (
        <TouchableOpacity onPress={takePhotoFromCamera}>
          <View row style={styles.button}>
            <Image
              source={IMAGES.cameraIcon}
              style={styles.cameraIcon2}
              resizeMode="contain"
            />
            <Typography>
              {isTakingFront ? "Take Front Picture" : "Take Back Picture"}
            </Typography>
          </View>
        </TouchableOpacity>
      )}

      <View paddingV-20>
        <InputText
          label={"ID Number"}
          value={id}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** *******   *****"
          // validate={[(v) => v.length > 10]}
          // validationMessage={["Card Numver is "]}
          onChangeText={(text: string) => setId(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View row gap-25 marginT-10 style={{ alignItems: "center" }}>
          <View style={{ top: -20 }}>
            <Typography size={theme.fontSize.small}>Nationality</Typography>
            <DropDown data={country} width={170} height={verticalScale(45)} />
          </View>
          <InputField
            style={{ marginBottom: 20 }}
            label={"Place Of Birth"}
            // width={150}
            value={email}
            // onValidationFailed={(isValid: boolean) => {
            //   setValidated((prev) => {
            //     let copy = [...prev];
            //     copy[2] = isValid;
            //     return copy;
            //   });
            // }}
            placeholder="Place Of Birth"
            // validate={["email"]}
            // validationMessage={["Email is invalid"]}
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
            // style={{ width: 165 }}
            rightIcon={
              <Image
                source={IMAGES.calendarIcon}
                style={{ width: 20, height: 20, tintColor: theme.color.tgray }}
                resizeMode="contain"
              />
            }
          />
          <View style={{ top: -10 }}>
            <Typography size={theme.fontSize.small}>Sex</Typography>
            <DropDown data={gender} width={170} height={55} />
          </View>
        </View>

        <View center marginV-20 row gap-20>
          {frontImage && (
            <View>
              <Image
                source={frontImage}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeImage(true)}
              >
                <Image source={IMAGES.cross} style={styles.deleteIconImg} />
              </TouchableOpacity>
            </View>
          )}
          {backImage && (
            <View>
              <Image
                source={backImage}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeImage(false)}
              >
                <Image source={IMAGES.cross} style={styles.deleteIconImg} />
              </TouchableOpacity>
            </View>
          )}

          {/* {(!frontImage || (frontImage && !backImage)) && (
            <TouchableOpacity onPress={()=>takePhotoFromCamera()}>
              <View row style={styles.button}>
                <Image
                  source={IMAGES.cameraIcon}
                  style={styles.cameraIcon2}
                  resizeMode="contain"
                />
                <Typography>
                  {isTakingFront ? "Take Front Picture" : "Take Back Picture"}
                </Typography>
              </View>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Modal Styling
  centerView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalStyle: {
    borderRadius: 10,
    backgroundColor: theme.color.white,
    width: SCREEN_WIDTH * 0.95,
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
    backgroundColor: theme.color.white,
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
  },
  inputField: {
    margin: 20,
    borderWidth: 1,
    borderColor: theme.color.black,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: theme.color.tgray,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ECECEC",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  cameraIcon2: {
    width: 45,
    height: 45,
  },

  deleteIconImg: {
    width: 20,
    height: 20,
  },
});

export default InformationIds;
