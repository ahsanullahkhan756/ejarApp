import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";

const CheckCondition = (props: any) => {


  return (
    <View gap-20>
      <View row style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => props?.setCheck(!props?.check)}
          style={commonStyles.boxStyle}
        >
          {props?.check && (
            <Image
              source={IMAGES.tick}
              style={{ width: 10, height: 10 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        <Typography
          textType="semiBold"
          color={theme.color.black}
          size={theme.fontSize.extraSmall12}
          style={{ marginLeft: 8, }}
        >
         I agree to all these requirements. I am eligible to{'\n'}Rent
        </Typography>
      </View>

      <View row style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => props?.setStatus(!props?.status)}
          style={commonStyles.boxStyle}
        >
          {props?.status && (
            <Image
              source={IMAGES.tick}
              style={{ width: 10, height: 10 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        <Typography
          textType="semiBold"
          color={theme.color.black}
          size={theme.fontSize.extraSmall12}
          style={{ marginLeft: 8 }}
        >
          I am older than 21 years
        </Typography>
      </View>
    </View>
  );
};

export default CheckCondition;
