import React from "react";
import { SCREENS, theme } from "../../constants";
import { Button, Text, View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { Pressable, TouchableOpacity } from "react-native";
import { navigate } from "../../navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slice/user";

export const OnBeardingBottomBtn = (props: any) => {
  const {onPress = ()=>{}} = props;
  const dispatch = useDispatch();

  return (
    <View margin-30 row spread>
      <TouchableOpacity  onPress={() => dispatch(setLoggedIn(true))}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: theme.color.blue,
            marginTop: 10,
          }}
        >
          <Typography color={theme.color.blue} textType="bold" size={theme.fontSize.large}>Skip</Typography>
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
