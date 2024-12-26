import React from "react";
import { SCREENS, theme } from "../../constants";
import { Button, Text, View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { Pressable, TouchableOpacity } from "react-native";
import { navigate } from "../../navigation/RootNavigation";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/slice/user";
import { COMMON_TEXT } from "../../constants/screens";
import { useTranslation } from "../../hooks/useTranslation";

export const OnBeardingBottomBtn = (props: any) => {
  const { onPress = () => {} } = props;
  const { t } = useTranslation();
  return (
    <View margin-30 row spread>
      <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: theme.color.blue,
            marginTop: 10,
          }}
        >
          <Typography
            color={theme.color.blue}
            textType="bold"
            size={theme.fontSize.large}
          >
            {COMMON_TEXT.SKIP}
          </Typography>
        </View>
      </TouchableOpacity>
      <Button
        label={t(COMMON_TEXT.NEXT)}
        backgroundColor={theme.color.primary}
        onPress={onPress}
      />
    </View>
  );
};
