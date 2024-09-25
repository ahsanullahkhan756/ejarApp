import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { useDispatch } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
import ForgotText from "./ForgotText";
import { InputDateTime } from "../../atoms/InputDateTime";
import { DropDown } from "../../atoms/DropDown";
import { country, gender } from "../../../containers/dummy";

const InformationIds = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState(true);
  const [expiryDate, setExpiryDate] = useState(true);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
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
        {dateFields()}
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
        {dateFields()}
        <View row gap-30 marginV-0 style={{ alignItems: "center" }}>
          <View>
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
          <DropDown data={gender} />
        </View>
        {/* Cmaera Icon */}
        <View center marginV-0>
          <Image
            source={IMAGES.cameraIcon}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
          <Typography color={theme.color.descColor}>Scan your License & ID card</Typography>
          <View style={[commonStyles.lineBar,{marginVertical:20, width:320,borderColor:theme.color.descColor,borderWidth:0.3}]}/>
       
          <Typography textType="bold" size={theme.fontSize.extraLarge} color={theme.color.black}>Or</Typography>
          <View style={commonStyles.cardWithShadow}>
          <Image
            source={IMAGES.upload}
            style={{ width: 200, height: 180 }}
            resizeMode="contain"
          />
        
        </View>
        <View style={{borderWidth:0.5,borderRadius:10,borderColor:theme.color.descColor,marginVertical:20}}>
        <Image
            source={IMAGES.uploadPdf}
            style={{ width: 320, height: 50 }}
            resizeMode="contain"
          />
          </View>
        </View>
        
      </View>
    </View>
  );
};

export default InformationIds;
