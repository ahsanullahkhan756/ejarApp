import React, { useState } from "react";
import {  Image } from "react-native";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../containers/commStyles";
import { DropDown } from "../../atoms/DropDown";
import { cityData } from "../../../containers/dummy";
import { InputText } from "../../atoms/InputText";
import { scale, verticalScale } from "react-native-size-matters";

const AdressFields = (props: any) => {
  return (
    <>
      <View style={[commonStyles.fieldStyle,{
          height: verticalScale(45),
           borderWidth:0.2,
           marginVertical:20
      }]}>
        <View row spread>
          <Typography color={theme.color.descColor}>Address</Typography>
          <Image
            source={IMAGES.addressIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </View>
      </View>
      <DropDown data={cityData} width={SCREEN_WIDTH * 0.9}  height = {verticalScale(45)} placeholder={"City"} />
      <View row spread>
        <InputText
          placeholder={"Zip Code"}
          style={{ width :SCREEN_WIDTH * 0.9, borderWidth:0.2}}
        />
      </View>
      <DropDown data={cityData}  width={SCREEN_WIDTH * 0.9} height = {verticalScale(45)} placeholder={"Country"} />

    </>
  );
};

export default AdressFields;
