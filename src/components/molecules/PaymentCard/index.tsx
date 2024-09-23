import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { InputText } from "../../atoms/InputText";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const PaymentCard = () => {
  const [hasValidated, setValidated] = useState(new Array(2).fill(false));
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{flex:1}}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex:1}}
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
            value={email}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="Enter your name"
            validate={["email"]}
            validationMessage={["Email is invalid"]}
            onChangeText={(text: string) => setEmail(text)}
          />

          <InputText
            label={"Card Number"}
            value={email}
            onValidationFailed={(isValid: boolean) => {
              setValidated((prev) => {
                let copy = [...prev];
                copy[0] = isValid;
                return copy;
              });
            }}
            placeholder="**** **** **** 1234"
            validate={["email"]}
            validationMessage={["Email is invalid"]}
            onChangeText={(text: string) => setEmail(text)}
          />
          <View row spread flex gap-10>
            <InputText
              label={"Expiration Date"}
              value={email}
              onValidationFailed={(isValid: boolean) => {
                setValidated((prev) => {
                  let copy = [...prev];
                  copy[0] = isValid;
                  return copy;
                });
              }}
              placeholder="01/22"
              validate={["email"]}
              validationMessage={["Email is invalid"]}
              onChangeText={(text: string) => setEmail(text)}
              style={{ width: 170 }}
              keyboardType="number-pad"
            />

            <InputText
              label={"CVV"}
              value={email}
              onValidationFailed={(isValid: boolean) => {
                setValidated((prev) => {
                  let copy = [...prev];
                  copy[0] = isValid;
                  return copy;
                });
              }}
              placeholder="***"
              validate={["email"]}
              validationMessage={["Email is invalid"]}
              onChangeText={(text: string) => setEmail(text)}
              style={{ width: 170 }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentCard;
