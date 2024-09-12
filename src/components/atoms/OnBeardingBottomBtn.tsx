import React from "react";
import { SCREENS, theme } from "../../constants";
import { Button, Text, View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { Pressable, TouchableOpacity } from "react-native";
import { navigate } from "../../navigation/RootNavigation";

export const OnBeardingBottomBtn = (props: any) => {
  const {onPress = ()=>{}} = props;

  return (
    <View margin-30 row spread>
      <TouchableOpacity onPress={()=>navigate(SCREENS.LOGIN)}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: theme.color.black,
            marginTop: 10,
          }}
        >
          <Typography size={theme.fontSize.medium}>Skip</Typography>
        </View>
      </TouchableOpacity>
      <Button
        label="Next"
        backgroundColor={theme.color.primary}
        onPress={onPress}
      />
    </View>
  );
};
