import React, { useEffect, useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import ImagePicker from "react-native-image-crop-picker";
import { COMMON_TEXT } from "../../../constants/screens";
import { setIsLoading, setUserDetails } from "../../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../api/auth";
import { sendPicturetoS3 } from "../../../services/axios";
import { showToast } from "../../../utils/toast";
import { VALIDATION_MESSAGES } from "../../../validationMessages";
import { useTranslation } from "../../../hooks/useTranslation";
import { formatDateToTime } from "../../../utils/helper";
import { PERMISSIONS, request, RESULTS } from "react-native-permissions";
// licenseNumberIssueDate
//     "licenseNumberExpDate"
const LicenseInfo = ({ onValidate, setCurrentStep }: any) => {
  const user = useSelector((state: any) => state?.user?.userDetails);
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  // const [selectImg, setSelectImg] = useState(user?.licensePicture ?? null);
  const [selectImg, setSelectImg] = useState(
    user?.licensePicture?.base64 ? user.licensePicture.base64 : null
  );
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(user?.licenseNumber ?? "");
  const [issueDate, setIssueDate] = useState(
    user?.licenseNumberIssueDate ? formatDateToTime(user.licenseNumberIssueDate) : null
  );
  const [expiryDate, setExpiryDate] = useState(
    user?.licenseNumberExpDate ? formatDateToTime(user.licenseNumberExpDate) : null
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const ID = useSelector((state: any) => state?.user?.userDetails?.ID);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setIsLoading(false));
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
  };
  const removeSelectedImage = () => {
    setSelectImg(null);
  };
  console.log("Validation States:", hasValidated);

  const dateFields = () => {
    return (
      <View row gap-30 style={{ alignItems: "center" }}>
        <InputDateTime
          width={153}
          title={COMMON_TEXT.ISSUE_DATE}
          placeholder={COMMON_TEXT.ISSUE_DATE}
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
          width={153}
          title={COMMON_TEXT.EXPIRY_DATE}
          placeholder={COMMON_TEXT.EXPIRY_DATE}
          placeholderColor={theme.color.black}
          mode={"date"}
          value={expiryDate}
          onChange={setExpiryDate}
          ismaxDate={false}
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
  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   })
  //     .then(async (image) => {
  //       console.log(image);

  //       const response = await sendPicturetoS3(image);
  //       // console.log("img", images);
  //   // setSelectImg({
  //   //   name: images.filename || `image_${new Date().getDate()}`,
  //   //   type: images.mime,
  //   //   uri: images.path,
  //   // });
  //   if (response) {
  //     setSelectImg(response);
  //   }
  //   setVisible(false);
  // })
  //     .catch((error) => {
  //       console.log("error", error);
  //       setVisible(false);
  //     });
  // };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    }
  };
  
  const openSettings = () => {
    Alert.alert(
      "Permission Required",
      "Camera access is needed to take photos. Please enable it in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };
  
  const takePhotoFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
  
    if (!hasPermission) {
      openSettings(); // Only call this if permission is permanently denied
      return;
    }
  
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
  
      console.log("Captured Image:", image);
  
      const response = await sendPicturetoS3(image);
      
      if (response) {
        setSelectImg(response);
      }
  
      setVisible(false);
    } catch (error) {
      console.error("Error capturing image:", error);
      setVisible(false);
    }
  };
  
  return (
    <View marginH-20 center style={{}}>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        {COMMON_TEXT.LICENSE_INFORMATION}
      </Typography>

      <TouchableOpacity onPress={takePhotoFromCamera}>
        <View
          row
          marginV-20
          style={{
            backgroundColor: "#ECECEC",
            width: SCREEN_WIDTH * 0.9,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <Image
            source={IMAGES.cameraIcon}
            style={{ width: 45, height: 45 }}
            resizeMode="contain"
          />
          <Typography>{COMMON_TEXT.TAKE_PICTURE}</Typography>
        </View>
      </TouchableOpacity>

      <View paddingV-20>
        <InputText
          label={COMMON_TEXT.LICENSE_NUMBER}
          value={id}
          // onValidationFailed={(isValid: boolean) => {
          //   setValidated((prev) => {
          //     let copy = [...prev];
          //     copy[0] = isValid;
          //     return copy;
          //   });
          // }}
          onValidationFailed={(isValid: boolean) => {
            console.log("License Number Validation:", isValid);
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid; // Ensure correct index
              return copy;
            });
          }}
          placeholder={COMMON_TEXT.LICENSE_NUMBER}
          // validate={[(v) => v.length > 10]}
          // validationMessage={["Card Numver is "]}
          onChangeText={(text: string) => setId(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View center marginV-20>
          {selectImg && (
            <View>
              <Image
                source={{ uri: selectImg }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={removeSelectedImage}
              >
                <Image
                  source={IMAGES.cross}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* <Button
        label={t(COMMON_TEXT.NEXT)}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          if (selectImg && issueDate && expiryDate && id) {
            const data = {
              ID: ID,
              licenseNumber: id,
              licenseNumberIssueDate: issueDate,
              licenseNumberExpDate: expiryDate,
              licensePicture: {
                fileName: "licence.jpg",
                base64: selectImg,
                size: 0,
              },
            };
            console.log(data);
            const res = await updateProfile({ data });
            if (res != null) {
              console.log(res);
              dispatch(setUserDetails(res));
              setCurrentStep(3);
              dispatch(setIsLoading(false));
            }
            return;
          } else {
            if (!selectImg) {
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
          // marginBottom: 100
        }}
      /> */}

      <Button
        label={t(COMMON_TEXT.NEXT)}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          const validationMessages = {
            PLEASE_FILL_IMAGES: t(VALIDATION_MESSAGES.PLEASE_FILL_IMAGES_LICENSE),
            ENTER_ID: t(VALIDATION_MESSAGES.ENTER_ID_LICENSE),
            ENTER_ISSUE_DATE: t(VALIDATION_MESSAGES.ENTER_ISSUE_DATE_LICENSE),
            ENTER_EXPIRY_DATE: t(VALIDATION_MESSAGES.ENTER_EXPIRY_DATE_LICENSE),
          };

          let errorMessage = "";

          if (!selectImg) {
            errorMessage = validationMessages.PLEASE_FILL_IMAGES;
          } else if (!id?.trim()) {
            errorMessage = validationMessages.ENTER_ID;
          } else if (!issueDate) {
            errorMessage = validationMessages.ENTER_ISSUE_DATE;
          } else if (!expiryDate) {
            errorMessage = validationMessages.ENTER_EXPIRY_DATE;
          }

          if (errorMessage) {
            Alert.alert(errorMessage);
            // showToast({ title: errorMessage });
            return;
          }

          if (selectImg && issueDate && expiryDate && id) {
            const data = {
              ID: ID,
              licenseNumber: id,
              licenseNumberIssueDate: issueDate,
              licenseNumberExpDate: expiryDate,
              licensePicture: {
                fileName: "licence.jpg",
                base64: selectImg,
                size: 0,
              },
            };
            console.log(data);
            const res = await updateProfile({ data });
            if (res != null) {
              console.log(res);
              dispatch(setUserDetails(res));
              setCurrentStep(3);
              dispatch(setIsLoading(false));
            }
            return;
          } else {
            if (!selectImg) {
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
          // marginBottom: 100
        }}
      />
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
  deleteIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
});

export default LicenseInfo;
