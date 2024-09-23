import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES } from "../../../constants";
import {Image} from "react-native";

const VechileStatusItoms = () => {
  return (
    <View row > 
      <View gap-10 paddingV-10 marginR-50>
        <View row gap-5 style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.mapPin}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Typography>Jumeirah, Dubai</Typography>
        </View>

        <View row gap-5 style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.calendarIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Typography>2021</Typography>
        </View>
      </View>
      <View gap-10 paddingV-10>
        <View row gap-5 style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.automatic}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Typography>Automatic</Typography>
        </View>

        <View row gap-5 style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.speed}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Typography>60,000 km</Typography>
        </View>
      </View>
    </View>
  );
};

export default VechileStatusItoms;
