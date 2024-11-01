import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Typography } from "../../components/atoms/Typography";
import { Header } from "../../components/atoms/Header";
import { theme } from "../../constants";
import { commonStyles } from "../../containers/commStyles";
import { View } from "react-native-ui-lib";

const Privacy = (props: any) => {
const title = props?.route?.params?.type
console.log('title',title);


  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={title || "Privacy Policy"} centerImg={false} />
      <View padding-20>
        <Typography
          size={22}
          textType="semiBold"
          color={theme.color.primary}
          style={{ marginVertical: 0 }}
        >
          {title || "Privacy Policy"}
        </Typography>

        <Typography color={theme.color.primary}>
          Lorem ipsum dolor sit amet
        </Typography>

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehe
          nderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui"
        </Typography>
      </View>
    </SafeAreaContainer>
  );
};

export default Privacy;
