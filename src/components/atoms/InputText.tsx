import { Image, TextField, TouchableOpacity, Text } from "react-native-ui-lib";
import { useState } from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Platform } from "react-native";
import { IMAGES, theme } from "../../constants";
import { useTranslation } from "../../hooks/useTranslation";

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
    label = "",
    multiline = false,
    onPressRight = () => {},
    containerStyle,
  } = props;
  const { t, isLangRTL } = useTranslation();
  return (
    <TextField
      small
      allowFontScaling={false}
      label={t(label)}
      labelStyle={{
        writingDirection: isLangRTL ? "rtl" : "ltr",
        fontSize: moderateScale(14),
      }}
      value={value}
      labelColor={theme.color.black}
      placeholder={t(placeholder)}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      secureTextInput={true}
      enableErrors
      validate={[(value: any) => value?.length > 6, ...validate]}
      validationMessage={["", t(...validationMessage)]}
      showCharCounter={showCharCounter}
      validateOnChange
      onChangeValidity={onValidationFailed}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      keyboardType={keyboardType}
      style={{
        fontFamily: isLangRTL ? theme.arabicFont.regular : theme.font.regular,
      }}
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
