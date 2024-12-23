import React, { useState, useEffect } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown"; // Make sure DropDown is imported
import ImagePicker from "react-native-image-crop-picker";
import { InputField } from "../../atoms/InputField";
import { verticalScale } from "react-native-size-matters";
import { setIsLoading } from "../../../redux/slice/user";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../api/auth";

const InformationIds = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const [idCardNumber, setIdCardNumber] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);
  const [dob, setDob] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isTakingFront, setIsTakingFront] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  useEffect(() => {
    dispatch(setIsLoading(false));
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
            setIssueDate(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
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
            setExpiryDate(selectedDate);
            hidePicker();
          }}
          visible={datePickerVisible}
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
        setIsTakingFront(false);
        setVisible(false);
      })
      .catch((error) => {
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
        setIsTakingFront(false);
        setVisible(false);
      })
      .catch((error) => {
        setVisible(false);
      });
  };

  const removeImage = (isFront) => {
    if (isFront) {
      setFrontImage(null);
      setIsTakingFront(true);
    } else {
      setBackImage(null);
    }
  };
  console.log(selectedCountry);

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
          value={idCardNumber}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** *******   *****"
          onChangeText={(text: string) => setIdCardNumber(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View row gap-25 marginT-10 style={{ alignItems: "center" }}>
          <View style={{ top: -20 }}>
            <Typography size={theme.fontSize.small}>Nationality</Typography>
            <DropDown
              data={country}
              width={170}
              height={verticalScale(45)}
              onSelect={setSelectedCountry} // Pass the onSelect handler
            />
          </View>
          <InputField
            style={{ marginBottom: 20 }}
            label={"Place Of Birth"}
            value={placeOfBirth}
            placeholder="Place Of Birth"
            onChangeText={(text: string) => setPlaceOfBirth(text)}
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
              setDob(selectedDate);
              hidePicker();
            }}
            visible={datePickerVisible}
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
            <DropDown
              data={gender}
              width={170}
              height={55}
              onSelect={setSelectedGender}
            />
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

          <Button
            label={"Next"}
            backgroundColor={theme.color.primary}
            onPress={async () => {
              const data = {
                idCardNumber: idCardNumber,
                idCardIssueDate: issueDate,
                idCardExpDate: expiryDate,
                nationality: selectedCountry,
                placeOfBirth: placeOfBirth,
                dob: dob,
                gender: selectedGender,
                idcardPicture: {
                  fileName: "id_card.jpg",
                  base64:
                    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
                  size: 0,
                },
              };

              const res = await updateProfile({ data });
              if (res != null) {
                setCurrentStep(2);
                dispatch(setIsLoading(true));
              }
            }}
            borderRadius={30}
            style={{
              height: 50,
              margin: 20,
              width: 300,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
  deleteIconImg: {
    width: 20,
    height: 20,
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
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default InformationIds;

export const country = [
  { label: "Dubai", value: "Dubai" },
  { label: "Saudia Arabia", value: "Saudia Arabia" },
  { label: "USA", value: "USA" },
  { label: "UK", value: "UK" },
];

export const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];
