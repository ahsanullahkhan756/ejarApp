import React, { useState } from "react";
import {  Image } from "react-native";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../containers/commStyles";
import { DropDown } from "../../atoms/DropDown";
import { cityData } from "../../../containers/dummy";
import { InputText } from "../../atoms/InputText";
import { scale } from "react-native-size-matters";

const AdressFields = (props: any) => {
  return (
    <>
      <View style={commonStyles.fieldStyle}>
        <View row spread>
          <Typography color={theme.color.descColor}>Address</Typography>
          <Image
            source={IMAGES.addressIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </View>
      </View>
      <DropDown data={cityData} width={355} height={50} placeholder={"City"} />
      <View row spread>
        <InputText
          placeholder={"Zip Code"}
          style={{ width: scale(320), borderWidth: 0.5 }}
        />
      </View>
      <DropDown data={cityData} width={355} height={50} placeholder={"Country"} />

    </>
  );
};

export default AdressFields;
