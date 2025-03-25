import React, { useState, useEffect } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme, VARIABLES } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown";
import ImagePicker from "react-native-image-crop-picker";
import { InputField } from "../../atoms/InputField";
import { verticalScale } from "react-native-size-matters";
import { setIsLoading, setUserDetails } from "../../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../api/auth";
import { COMMON_TEXT, EJAR } from "../../../constants/screens";
import { useTranslation } from "../../../hooks/useTranslation";
import moment from "moment";
import { country, gender, userData } from '../../../containers/dummy';
import { postWithSingleFile, sendPicturetoS3 } from "../../../services/axios";
import { showToast } from "../../../utils/toast";
import { VALIDATION_MESSAGES } from "../../../validationMessages";
import { getItem } from "../../../utils/storage";
import { formatDateToTime } from "../../../utils/helper";

const InformationIds = ({ onValidate, setCurrentStep }: any) => {
  const user = useSelector((state) => state?.user?.userDetails);

  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [idCardNumber, setIdCardNumber] = useState(user?.idCardNumber ?? "");
  const [placeOfBirth, setPlaceOfBirth] = useState(user?.placeOfBirth ?? "");
  const [issueDate, setIssueDate] = useState(
    user?.idCardIssueDate ? formatDateToTime(user.idCardIssueDate) : null
  );
  const [expiryDate, setExpiryDate] = useState(
    user?.idCardExpDate ? formatDateToTime(user.idCardExpDate) : null
  );
  const [dob, setDob] = useState(
    user?.dob ? formatDateToTime(user.dob) : null
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [frontImage, setFrontImage] = useState(
    user?.idcardPicture?.base64 ? user.idcardPicture.base64  : null
  );
  const [backImage, setBackImage] = useState(
    user?.idcardPictureBack?.base64 ? user.idcardPictureBack.base64 : null
  );
  const [isTakingFront, setIsTakingFront] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState(user?.nationality ?? null);
  const [selectedGender, setSelectedGender] = useState(user?.gender ?? null);

  const ID = useSelector((state) => state?.user?.userDetails?.ID);


  useEffect(() => {
    dispatch(setIsLoading(false));
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
  };
  // console.log(new Date(issueDate)?.toISOString().split("T")[0]);

  const dateFields = () => {
    return (
      <View row gap-30 style={{ alignItems: "center" }}>
        <InputDateTime
          // width={Platform.OS == "ios" ? 165 : 170}
          width={150}
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
          width={150}
          title={COMMON_TEXT.EXPIRY_DATE}
          placeholder={COMMON_TEXT.EXPIRY_DATE}
          placeholderColor={theme.color.black}
          mode={"date"}
          ismaxDate={false}
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
  // console.log(ID);

  // const sendPicturetoS3 = async (image) => {
  //   try {
  //     // const mime = image.mime?.split("/") || [];
  //     let obj = {
  //       name: `image${new Date().getDate()}.jpeg`,
  //       type: image?.mime,
  //       uri: image?.path,
  //     };
  //     const response = await postWithSingleFile({
  //       url: "s3/uploadFormData",
  //       data: {
  //         userID: ID,
  //         file: obj,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (image) => {
        const response = await sendPicturetoS3(image);
        if (isTakingFront) {
          setFrontImage(response);
        } else {
          setBackImage(response);
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
    <View style={{}}>
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
          maxLength={15}
          keyboardType={"numeric"}
          placeholder="*** **** ******* *"
          onChangeText={(text: string) => setIdCardNumber(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View row gap-25 marginT-0 style={{ alignItems: "center" }}>
          {/* <View style={{ top: -20 }}>
            <Typography size={theme.fontSize.small}>
              {COMMON_TEXT.NATIONALITY}
            </Typography> */}
          {/* <DropDown
              data={country}
              width={170}
              height={verticalScale(45)}
              onSelect={setSelectedCountry}
            /> */}
          {/* </View> */}
          <InputField
            width={153}
            style={{ marginBottom: 0 }}
            label={COMMON_TEXT.NATIONALITY}
            value={selectedCountry}
            // value={country}
            placeholder={COMMON_TEXT.NATIONALITY}
            onChangeText={(text: string) => setSelectedCountry(text)}
          />
          <InputField
            width={153}
            style={{ marginBottom: 0 }}
            label={COMMON_TEXT.PLACE_OF_BIRTH}
            value={placeOfBirth}
            placeholder={COMMON_TEXT.PLACE_OF_BIRTH}
            onChangeText={(text: string) => setPlaceOfBirth(text)}
          />
        </View>

        <View row gap-30 marginV-0 style={{ alignItems: "center" }}>
          <InputDateTime
            width={150}
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
          <InputField
            width={150}
            style={{ marginBottom: 10 }}
            label={COMMON_TEXT.SEX}
            // value={gender}
            value={selectedGender}
            placeholder={COMMON_TEXT.SEX}
            onChangeText={(text: string) => setSelectedGender(text)}
          />
          {/* <View style={{ top: -10 }}>
            <Typography size={theme.fontSize.small}>
              {COMMON_TEXT.SEX}
            </Typography>
            <DropDown
              data={gender}
              width={170}
              height={55}
              onSelect={setSelectedGender}
            />
          </View> */}
        </View>

        {frontImage && (
          <View>
            <Image
              // source={frontImage}
              source={{ uri: frontImage }}
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
              source={{ uri: backImage }}
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
        <View center marginV-20 row gap-20>
          <Button
            label={t(COMMON_TEXT.NEXT)}
            backgroundColor={theme.color.primary}
            onPress={async () => {
              if (
                frontImage &&
                backImage &&
                idCardNumber &&
                placeOfBirth &&
                selectedGender &&
                dob &&
                selectedCountry
              ) {
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
                    base64: frontImage,
                    size: 0,
                  },
                  idcardPictureBack: {
                    fileName: "id_card_back.jpg",
                    base64: backImage,
                    size: 0,
                  },
                };
                const res = await updateProfile({ data });
                if (res != null) {
                  dispatch(setUserDetails(res));
                  setCurrentStep(2);
                  dispatch(setIsLoading(false));
                }
                return;
              } else {
                if (!frontImage || !backImage) {
                  showToast({
                    title: t(VALIDATION_MESSAGES.PLEASE_FILL_IMAGES),
                  });
                  return;
                }
                showToast({
                  title: t(VALIDATION_MESSAGES.PLEASE_FILL_ALL_THE_FEILDS),
                });
              }
            }}
            borderRadius={30}
            style={{
              height: 50,
              margin: 20,
              width: 300,
              marginBottom: 150
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
    // right: -10,
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
