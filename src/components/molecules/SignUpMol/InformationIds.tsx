import React, { useState, useEffect } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown";
import ImagePicker from "react-native-image-crop-picker";
import { InputField } from "../../atoms/InputField";
import { verticalScale } from "react-native-size-matters";
import { setIsLoading } from "../../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../api/auth";
import { COMMON_TEXT, EJAR } from "../../../constants/screens";
import { useTranslation } from "../../../hooks/useTranslation";
import moment from "moment";
import { country, gender } from "../../../containers/dummy";

const InformationIds = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [idCardNumber, setIdCardNumber] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [issueDate, setIssueDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [dob, setDob] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isTakingFront, setIsTakingFront] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const ID = useSelector((state) => state?.user?.userDetails?.ID);

  useEffect(() => {
    dispatch(setIsLoading(false));
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
  };
  console.log(new Date(issueDate)?.toISOString().split("T")[0]);

  const dateFields = () => {
    return (
      <View row gap-30 style={{ alignItems: "center" }}>
        <InputDateTime
          title={COMMON_TEXT.ISSUE_DATE}
          placeholder={COMMON_TEXT.ISSUE_DATE}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={issueDate ?? ""}
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
          title={COMMON_TEXT.EXPIRY_DATE}
          placeholder={COMMON_TEXT.EXPIRY_DATE}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={expiryDate ? moment(expiryDate).format("YYYY/MM/DD") : ""}
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
  const formatDate = (date) => {
    const formattedDate = moment(date, "YYYY/MM/DD", true); // 'true' ensures strict parsing
    if (formattedDate.isValid()) {
      return formattedDate.format("YYYY/MM/DD");
    } else {
      console.log("Invalid date format: ", date); // Handle invalid dates here
      return ""; // Or return a default date if needed
    }
  };

  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        {EJAR.ID_CARD_INFORMATION}
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
              {isTakingFront
                ? COMMON_TEXT.TAKE_FRONT_PICTURE
                : COMMON_TEXT.TAKE_BACK_PICTURE}
            </Typography>
          </View>
        </TouchableOpacity>
      )}

      <View paddingV-20>
        <InputText
          label={COMMON_TEXT.ID_NUMBER}
          value={idCardNumber}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** ******* *****"
          onChangeText={(text: string) => setIdCardNumber(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View row gap-25 marginT-10 style={{ alignItems: "center" }}>
          <View style={{ top: -20 }}>
            <Typography size={theme.fontSize.small}>
              {COMMON_TEXT.NATIONALITY}
            </Typography>
            <DropDown
              data={country}
              width={170}
              height={verticalScale(45)}
              onSelect={setSelectedCountry}
            />
          </View>
          <InputField
            style={{ marginBottom: 20 }}
            label={COMMON_TEXT.PLACE_OF_BIRTH}
            value={placeOfBirth}
            placeholder={COMMON_TEXT.PLACE_OF_BIRTH}
            onChangeText={(text: string) => setPlaceOfBirth(text)}
          />
        </View>

        <View row gap-30 marginV-0 style={{ alignItems: "center" }}>
          <InputDateTime
            title={COMMON_TEXT.DATE_OF_BIRTH}
            placeholder={COMMON_TEXT.DATE_OF_BIRTH}
            placeholderColor={theme.color.black}
            mode={"date"}
            value={dob ? moment(dob).format("YYYY/MM/DD") : ""}
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
            <Typography size={theme.fontSize.small}>
              {COMMON_TEXT.SEX}
            </Typography>
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
            label={t(COMMON_TEXT.NEXT)}
            backgroundColor={theme.color.primary}
            onPress={async () => {
              const data = {
                ID: ID,
                idCardNumber: idCardNumber,
                idCardIssueDate: moment(issueDate).format("YYYY/MM/DD"),
                idCardExpDate: moment(expiryDate).format("YYYY/MM/DD"),
                nationality: selectedCountry,
                placeOfBirth: placeOfBirth,
                dob: moment(dob).format("YYYY/MM/DD"),
                gender: selectedGender,
                idcardPicture: {
                  fileName: "id_card.jpg",
                  base64:
                    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
                  size: 0,
                },
              };

              const res = await updateProfile({ data });
              console.log(res);

              if (res != null) {
                setCurrentStep(2);
                dispatch(setIsLoading(true));
                dispatch(setIsLoading(false));
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
