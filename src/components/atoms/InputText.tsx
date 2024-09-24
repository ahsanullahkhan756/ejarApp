import { Image, TextField, TouchableOpacity, Text } from "react-native-ui-lib";
import { useState } from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import { IMAGES, theme } from "../../constants";
import { Typography } from "./Typography";

export const InputText = (props: any) => {
  const {
    placeholder = "",
    placeholderTextColor = theme.color.tgray,
    maxLength = 50,
    onChangeText = () => {},
    validationMessage = "Field is required",
    validate = "email",
    leftIcon = false,
    rightText = false,
    rightTitle = 'AED',
    leftImage,
    rightImage = false,
    showCharCounter = false,
    keyboardType = "default",
    onValidationFailed = () => {},
    secureTextEntry = false,
    style = {},
    label = true,
    multiline = false,
    onPressRight = () => {},
    width= 150
  } = props;

  return (
    <TextField
      small
      allowFontScaling={false}
      label={label}
      labelStyle={{
        fontSize: moderateScale(14),
      }}
      labelColor={theme.color.black}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
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
        // height: verticalScale(45),
        // marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS == "ios" ? 20 : 0,
        borderWidth: 0.2,
        borderRadius: 10,
        borderColor: theme.color.tgray,
        width : width,
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
