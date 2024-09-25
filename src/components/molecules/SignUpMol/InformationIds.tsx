import React, { useEffect, useState } from "react";
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

const InformationIds = ({onValidate}:any) => {
  const [hasValidated, setValidated] = useState(new Array(3).fill(true));
  const [selectImg, setSelectImg] = useState(""); // State for selected image/pdf
  const [selectPdf, setSelectPdf] = useState(""); // State for selected PDF
  const [visible, setVisible] = useState(false);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);

  const [issueDate2, setIssueDate2] = useState(true);
  const [expiryDate2, setExpiryDate2] = useState(true);

  const [dob, setDob] = useState(true);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [sliderModal, setSliderModal] = useState(false);

  useEffect(() => {
     onValidate(!hasValidated.includes(false));
  }, [hasValidated]);


  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  // Open camera and set image
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setSelectImg({
          name: image.filename || `image_${new Date().getTime()}`,
          type: image.mime,
          uri: image.path,
        });
        setVisible(false);
      })
      .catch((error) => {
        console.log("Error opening camera: ", error);
        setVisible(false);
      });
  };

  // Open gallery and only allow PDF selection
  const choosePdfFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: "any", // To allow PDF selection
      multiple: false,
    })
      .then((file) => {
        if (file.mime === "application/pdf") {
          setSelectPdf({
            name: file.filename || `pdf_${new Date().getTime()}`,
            type: file.mime,
            uri: file.path,
          });
        } else {
          alert("Please select a PDF file.");
        }
        setVisible(false);
      })
      .catch((error) => {
        console.log("Error selecting file: ", error);
        setVisible(false);
      });
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectImg(""); // Clear image state
  };

  // Remove selected PDF
  const removeSelectedPdf = () => {
    setSelectPdf(""); // Clear PDF state
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
        <InputText
          label={"Passport Number"}
          width={350}
          value={email}
          onValidationFailed={(isValid: boolean) => {
            setValidated((prev) => {
              let copy = [...prev];
              copy[1] = isValid;
              return copy;
            });
          }}
          placeholder="**** *** *******  *****"
          // validate={["email"]}
          // validationMessage={["Email is invalid"]}
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

        {/* Image & PDF Upload Section */}
        <View center marginV-20>
          {/* Camera Icon for taking photos */}
          {selectImg ? (
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
          ) : (
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <Image
                source={IMAGES.cameraIcon}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

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

          {/* PDF Upload Section */}
          {selectPdf ? (
            <View>
              <Image
                source={{ uri: selectPdf.uri }}
                style={{ width: 320, height: 50 }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={removeSelectedPdf}
              >
                <Image
                  source={IMAGES.cross}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={choosePdfFromLibrary}>
              <Image
                source={IMAGES.upload}
                style={{ width: 320, height: 200 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        
      </View>
      {/* Modal for selecting image source */}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
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
              onPress={choosePdfFromLibrary}
            >
              <Typography style={styles.textStyle}>
                Choose from Gallery (PDF)
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={[styles.cancelStyle, { marginTop: 10 }]}>
            <TouchableOpacity onPress={() => setVisible(false)}>
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

export default InformationIds;
