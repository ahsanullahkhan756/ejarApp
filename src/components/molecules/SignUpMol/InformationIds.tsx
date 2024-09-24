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

const InformationIds = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(true);

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState(true);
  const [cvv, setCvv] = useState(true);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const hidePicker = () => {
    setDatePickerVisible(false);
  };
  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" align="center" size={theme.fontSize.large24}>
        Submit information regarding IDs and licenses
      </Typography>

      <View marginV-20>
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
        <View row gap-30 style={{ alignItems: "center" }}>
          <InputDateTime
            title={"Issue Date"}
            placeholder={"Date of birth"}
            placeholderColor={theme.color.descColor}
            mode={"date"}
            value={date}
            onChange={setDate}
            onConfirm={(selectedDate: any) => {
              console.log("Selected Date:", selectedDate);
              setDate(selectedDate);
              hidePicker();
            }}
            visible={datePickerVisible}
            style={{ width: 160, }}
            rightIcon={<Image source={IMAGES.calendarIcon} style={{width:20,height:20}} resizeMode='contain' />}
          />

          <InputDateTime
            title={"Issue Date"}
            placeholder={"Date of birth"}
            placeholderColor={theme.color.black}
            mode={"date"}
            value={date}
            onChange={setDate}
            onConfirm={(selectedDate: any) => {
              console.log("Selected Date:", selectedDate);
              setDate(selectedDate);
              hidePicker();
            }}
            visible={datePickerVisible}
            style={{ width: 160 }}
            rightIcon={<Image source={IMAGES.calendarIcon} style={{width:20,height:20}} resizeMode='contain' />}

          />
        </View>
      </View>
    </View>
  );
};

export default InformationIds;
