import React, { useEffect, useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { InputDateTime } from "../../atoms/InputDateTime";
import ImagePicker from "react-native-image-crop-picker";
import { setIsLoading } from "../../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../api/auth";

const LicenseInfo = ({ onValidate, setCurrentStep }: any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [selectImg, setSelectImg] = useState("");
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const ID = useSelector((state)=>state?.user?.userDetails?.ID)

  useEffect(() => {
    dispatch(setIsLoading(false));
    onValidate(!hasValidated.includes(false));
  }, [hasValidated]);

  const hidePicker = () => {
    setDatePickerVisible(false);
  };
  const removeSelectedImage = () => {
    setSelectImg("");
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
  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        License Information
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
          <Typography>Take Picture</Typography>
        </View>
      </TouchableOpacity>

      <View paddingV-20>
        <InputText
          label={"License Number"}
          value={id}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[0] = isValid;
              return copy;
            });
          }}
          placeholder="123 456 7890"
          // validate={[(v) => v.length > 10]}
          // validationMessage={["Card Numver is "]}
          onChangeText={(text: string) => setId(text)}
        />

        <View marginV-10>{dateFields()}</View>

        <View center marginV-20>
          {selectImg && (
            <View>
              <Image
                source={{ uri: selectImg.uri }}
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
              const data = {
                ID: ID,
                licenseNumber:id,
                licenseNumberIssueDate: issueDate,
                licenseNumberExpDate:expiryDate,
                idcardPicture: {
                  fileName: "id_card.jpg",
                  base64:
                    "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
                  size: 0,
                },
              };

              const res = await updateProfile({ data });
              if (res != null) {
                setCurrentStep(3);
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
