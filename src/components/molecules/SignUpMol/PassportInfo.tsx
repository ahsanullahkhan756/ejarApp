import React, { useEffect, useState } from "react";
import { Button, View } from "react-native-ui-lib";
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
import { COMMON_TEXT } from "../../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserDetails } from "../../../redux/slice/user";
import { updateProfile } from "../../../api/auth";
import { showToast } from "../../../utils/toast";
import { VALIDATION_MESSAGES } from "../../../validationMessages";
import { useTranslation } from "../../../hooks/useTranslation";
import { sendPicturetoS3 } from "../../../services/axios";

const PassportInfo = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [selectImg, setSelectImg] = useState("");
  const [selectPdf, setSelectPdf] = useState("");
  const [visible, setVisible] = useState(false);
  const ID = useSelector((state) => state?.user?.userDetails?.ID);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);
  const dispatch = useDispatch();
  const [issueDate2, setIssueDate2] = useState(true);
  const [expiryDate2, setExpiryDate2] = useState(true);
  const { t } = useTranslation();

  const [dob, setDob] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async (image) => {
        const response = await sendPicturetoS3(image);
        // console.log("img", images);
        // setSelectImg({
        //   name: images.filename || `image_${new Date().getDate()}`,
        //   type: images.mime,
        //   uri: images.path,
        // });
        if (response) {
          setSelectImg(response);
        }
        setVisible(false);
      })
      .catch((error) => {
        console.log("Error opening camera: ", error);
        setVisible(false);
      });
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectImg(""); // Clear image state
  };

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
          ismaxDate={false}
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
  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        {COMMON_TEXT.PASSPORT_INFORMATION}
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
          label={COMMON_TEXT.PASSPORT_NUMBER}
          value={id}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder={COMMON_TEXT.PASSPORT_NUMBER}
          // validate={[(v) => v.length > 10]}
          // validationMessage={["Card Numver is "]}
          onChangeText={(text: string) => setId(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View
          center
          marginV-20
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
          }}
        >
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
      <Button
        label={"Next"}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          if (selectImg && id && issueDate && expiryDate) {
            const data = {
              ID: ID,
              passportNumber: id,
              passportNumberIssueDate: issueDate,
              passportNumberExpDate: expiryDate,
              passportPicture: {
                fileName: "passportPicture.jpg",
                base64: selectImg,
                size: 0,
              },
            };
            console.log(data);

            const res = await updateProfile({ data });
            if (res != null) {
              dispatch(setUserDetails(res));
              setCurrentStep(4);
              dispatch(setIsLoading(true));
            }
            return;
          } else {
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

export default PassportInfo;
