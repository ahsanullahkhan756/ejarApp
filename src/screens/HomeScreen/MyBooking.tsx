import React, { useState } from "react";
import {
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { DropDown } from "../../components/atoms/DropDown";
import PaymentCard from "../../components/molecules/PaymentCard";
import { navigate } from "../../navigation/RootNavigation";
import { CustomCalender } from "../../components/atoms/CustomCalender";
import { InputText } from "../../components/atoms/InputText";
import { InputDateTime } from "../../components/atoms/InputDateTime";
import { InputDateCard } from "../../components/atoms/InputDateCard";
const MyBooking = ({ route }) => {
  const item = route?.params?.item;
  const bookedDates = route?.params?.bookedDates;

  const data = [
    { label: "01", value: "1" },
    { label: "02", value: "2" },
    { label: "03", value: "3" },
    { label: "04", value: "4" },
  ];

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleExpiryDateChange = (selectedDate) => {
    console.log("Selected Date:", selectedDate);
    let dateObj;

    if (typeof selectedDate === "string") {
      const parts = selectedDate.split("-");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        dateObj = new Date(year, month, day); // Create Date object
      }
    } else if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      dateObj = selectedDate; // Use as is if it's already a Date object
    }

    if (dateObj) {
      const month = dateObj.getMonth() + 1; // Month is 0-indexed
      const year = dateObj.getFullYear().toString().slice(-2); // Get last two digits
      setExpiryDate(`${month < 10 ? `0${month}` : month}/${year}`);
    } else {
      console.warn("Invalid date selected:", selectedDate);
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="My Renting" centerImg={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View marginH-20>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              color={theme.color.blue}
            >
              Select Date
            </Typography>
            <CustomCalender />

            <View row spread marginV-20>
              <Typography
                textType="bold"
                size={theme.fontSize.large20}
                color={theme.color.blue}
              >
                No. of Days
              </Typography>
              <DropDown data={data} placeholder="01" />
            </View>
            {/* <PaymentCard /> */}

            {/* Add your card */}
            <Typography
              textType="bold"
              color={theme.color.blue}
              size={theme.fontSize.large24}
            >
              Add Your Card Details
            </Typography>

            <View marginV-10>
              <InputText
                width={360}
                label={"Name on card"}
                value={name}
                // onValidationFailed={(isValid: boolean) => {
                //   setValidated((prev) => {
                //     let copy = [...prev];
                //     copy[0] = isValid;
                //     return copy;
                //   });
                // }}
                placeholder="Enter your name"
                // validate={["name"]}
                // validationMessage={["Name is invalid"]}
                onChangeText={(text: string) => setName(text)}
              />

              <InputText
                width={360}
                label={"Card Number"}
                value={card}
                // onValidationFailed={(isValid: boolean) => {
                //   setValidated((prev) => {
                //     let copy = [...prev];
                //     copy[0] = isValid;
                //     return copy;
                //   });
                // }}
                keyboardType="number-pad"
                placeholder="**** **** **** 1234"
                // validate={["Card"]}
                // validationMessage={["Card is invalid"]}
                onChangeText={(text: string) => setCard(text)}
              />
              <View row spread flex gap-10>
                <View style={{ marginTop: 20 }}>
                  <InputDateCard
                    title={"Expiration Date"}
                    placeholder={"MM/YY"}
                    value={expiryDate}
                    onChange={setExpiryDate}
                  />
                </View>

                <InputText
                  label={"CVV"}
                  value={cvv}
                  // onValidationFailed={(isValid: boolean) => {
                  //   setValidated((prev) => {
                  //     let copy = [...prev];
                  //     copy[0] = isValid;
                  //     return copy;
                  //   });
                  // }}
                  placeholder="***"
                  // validate={["email"]}
                  // validationMessage={["Email is invalid"]}
                  onChangeText={(text: string) => setCvv(text)}
                  style={{ width: 170 }}
                  maxLength={3}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <Button
              label="Next"
              backgroundColor={theme.color.primary}
              borderRadius={30}
              onPress={() => navigate(SCREENS.BOOKING_CONFIRM)}
              style={{
                height: 50,
                margin: 20,
                width: "50%",
                alignSelf: "center",
                marginVertical: 50,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default MyBooking;
