import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const PaymentCard = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState(true);
  const [cvv, setCvv] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <Typography
          textType="bold"
          color={theme.color.blue}
          size={theme.fontSize.large24}
        >
          Add Your Card Details
        </Typography>

        <View marginV-10>
          <InputText
            label={"Name on card"}
            value={name}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="Enter your name"
            // validate={["name"]}
            // validationMessage={["Name is invalid"]}
            onChangeText={(text: string) => setName(text)}
          />

          <InputText
            label={"Card Number"}
            value={card}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="**** **** **** 1234"
            // validate={["Card"]}
            // validationMessage={["Card is invalid"]}
            onChangeText={(text: string) => setCard(text)}
          />
          <View row spread flex gap-10>
            <InputText
              label={"Expiration Date"}
              value={date}
              onValidationFailed={(isValid: boolean) => {
                setValidated((prev) => {
                  let copy = [...prev];
                  copy[0] = isValid;
                  return copy;
                });
              }}
              placeholder="01/22"
              // validate={["email"]}
              // validationMessage={["Email is invalid"]}
              onChangeText={(text: string) => setDate(text)}
              style={{ width: 170 }}
              keyboardType="number-pad"
            />

            <InputText
              label={"CVV"}
              value={cvv}
              onValidationFailed={(isValid: boolean) => {
                setValidated((prev) => {
                  let copy = [...prev];
                  copy[0] = isValid;
                  return copy;
                });
              }}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentCard;
