import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { navigate } from "../../../navigation/RootNavigation";
import { commonStyles } from "../../../containers/commStyles";
import { COMMON_TEXT } from "../../../constants/screens";

const ForgotText = (props: any) => {
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(false);

  const { termsText = true, forgotPass = true } = props;

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
            {COMMON_TEXT.REMEMBER_ME}
          </Typography>
        </View>
        {forgotPass && (
          <TouchableOpacity onPress={() => navigate(SCREENS.FORGOT_PASS)}>
            <Typography
              size={theme.fontSize.extraSmall12}
              color={theme.color.danger}
            >
              {COMMON_TEXT.FORGOT_PASSWORD}
            </Typography>
          </TouchableOpacity>
        )}
      </View>

      {termsText && (
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.PRIVACY, {
                    type: COMMON_TEXT.PRIVACY_POLICY,
                  })
                }
              >
                <Typography
                  color={theme.color.black}
                  size={theme.fontSize.extraSmall12}
                  style={{ marginLeft: 8 }}
                >
                  {COMMON_TEXT.I_AGREE_WITH_THE_PRIVACY_POLICY}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate(SCREENS.PRIVACY, {
                    type: COMMON_TEXT.TERMS_AND_CONDITIONS,
                  })
                }
              >
                <Typography
                  color={theme.color.black}
                  size={theme.fontSize.extraSmall12}
                  style={{ marginLeft: 8 }}
                >
                  {COMMON_TEXT.TERMS_AND_CONDITIONS}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ForgotText;
