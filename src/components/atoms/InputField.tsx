import { Image, TextField, TouchableOpacity, Text } from "react-native-ui-lib";
import { useState } from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import { IMAGES, SCREEN_WIDTH, theme } from "../../constants";
import { Typography } from "./Typography";
import { useTranslation } from "react-i18next";
import { COMMON_TEXT, EJAR } from "../../constants/screens";

export const InputField = (props: any) => {
  const {
    placeholder = "",
    placeholderTextColor = theme.color.tgray,
    maxLength = 50,
    onChangeText = () => {},
    validationMessage = "Field is required",
    validate = "email",
    leftIcon = false,
    rightText = false,
    rightTitle = "AED",
    leftImage,
    rightImage = false,
    showCharCounter = false,
    keyboardType = "default",
    onValidationFailed = () => {},
    secureTextEntry = false,
    style = {},
    label = EJAR.TRUE,
    multiline = false,
    onPressRight = () => {},
    width = 170,
  } = props;
  const { t } = useTranslation();
  return (
    <TextField
      small
      allowFontScaling={false}
      label={t(label)}
      labelStyle={{
        fontSize: moderateScale(14),
      }}
      labelColor={theme.color.black}
      placeholder={t(placeholder)}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      secureTextInput={true}
      enableErrors
      validate={[(value: any) => value.length > 6, ...validate]}
      validationMessage={["", ...validationMessage]}
      showCharCounter={showCharCounter}
      validateOnChange
      onChangeValidity={onValidationFailed}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      keyboardType={keyboardType}
      fieldStyle={{
        height: verticalScale(45),
        // marginVertical: 5,
        paddingHorizontal: 10,
        // paddingVertical: 20,
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: theme.color.descColor,
        width: width,
        // paddingRight:65,

        ...style,
      }}
      {...(leftIcon
        ? {
            leadingAccessory: (
              <Image
                source={leftImage}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 10,
                  resizeMode: "contain",
                }}
              />
            ),
          }
        : null)}
      {...(rightText
        ? {
            trailingAccessory: (
              <TouchableOpacity onPress={onPressRight}>
                <Typography
                  style={{
                    fontSize: moderateScale(14),
                    color: theme.color.descColor,
                    marginRight: 10,
                  }}
                >
                  {rightTitle}
                </Typography>
              </TouchableOpacity>
            ),
          }
        : null)}
    />
  );
};
