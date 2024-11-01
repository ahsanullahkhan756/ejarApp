import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";

const CheckCondition = (props: any) => {
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(false);

  return (
    <View gap-20>
      <View row style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setCheck(!check)}
          style={commonStyles.boxStyle}
        >
          {check && (
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
         I agree to all these requirements. I am eligible to Rent
        </Typography>
      </View>

      <View row style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setStatus(!status)}
          style={commonStyles.boxStyle}
        >
          {status && (
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
