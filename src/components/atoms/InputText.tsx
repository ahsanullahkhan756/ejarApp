import { Image, TextField, TouchableOpacity, Text } from "react-native-ui-lib";
import { useState } from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import { IMAGES, theme } from "../../constants";

export const InputText = (props: any) => {
  const {
    placeholder = "",
    placeholderTextColor = theme.color.tgray,
    maxLength = 30,
    onChangeText = () => {},
    validationMessage = "Field is required",
    validate = "email",
    leftIcon = false,
    rightText = false,
    rightTitle = "AED",
    leftImage,
    value,
    rightImage = false,
    showCharCounter = false,
    keyboardType = "default",
    onValidationFailed = () => {},
    secureTextEntry = false,
    style = {},
    label = true,
    multiline = false,
    onPressRight = () => {},
    containerStyle,
  } = props;

  return (
    <TextField
      small
      allowFontScaling={false}
      label={label}
      labelStyle={{
        fontSize: moderateScale(14),
      }}
      value={value}
      labelColor={theme.color.black}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      secureTextInput={true}
      enableErrors
      validate={[(value: any) => value?.length > 6, ...validate]}
      validationMessage={["", ...validationMessage]}
      showCharCounter={showCharCounter}
      validateOnChange
      onChangeValidity={onValidationFailed}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      keyboardType={keyboardType}
      containerStyle={containerStyle}
      fieldStyle={{
        height: verticalScale(45),
        marginVertical: 5,
        paddingHorizontal: 10,
        // paddingVertical: 20,
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: theme.color.tgray,

        // width : width,
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
      {...(rightImage
        ? {
            trailingAccessory: (
              <TouchableOpacity onPress={onPressRight}>
                <Image
                  source={secureTextEntry ? IMAGES.eyeOn : IMAGES.eyeOff}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    tintColor: theme.color.black,
                  }}
                />
              </TouchableOpacity>
            ),
          }
        : null)}
    />
  );
};
