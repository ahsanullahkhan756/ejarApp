import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { navigate } from "../../../navigation/RootNavigation";
import { commonStyles } from "../../../containers/commStyles";

const ForgotText = () => {
  const [check, setCheck] = useState(true);
  const [status, setStatus] = useState(true);

  return (
    <>
      <View row spread marginV-0 style={{ alignItems: "center" }}>
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
            color={theme.color.black}
            size={theme.fontSize.extraSmall12}
            style={{ marginLeft: 8 }}
          >
            Remember me
          </Typography>
        </View>
        <TouchableOpacity
          style={{ borderBottomWidth: 0.2, borderColor: theme.color.tgray }}
          onPress={() => navigate(SCREENS.HOME)}
        >
          <Typography
            size={theme.fontSize.extraSmall12}
            color={theme.color.danger}
          >
            Forgot Password
          </Typography>
        </TouchableOpacity>
      </View>

      <View row marginV-20>
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
          color={theme.color.black}
          size={theme.fontSize.extraSmall12}
          style={{ marginLeft: 8 }}
        >
          I agree with the Privacy Policy and{"\n"}Terms & Conditions
        </Typography>
      </View>
    </>
  );
};

export default ForgotText;
