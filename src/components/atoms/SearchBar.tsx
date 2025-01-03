import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { navigate } from "../../navigation/RootNavigation";
import { IMAGES, SCREENS, theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { scale } from "react-native-size-matters";
import { COMMON_TEXT } from "../../constants/screens";
import { useTranslation } from "../../hooks/useTranslation";

export const SearchBar = (props: any) => {
  const {
    backgroundColor = theme.color.blue,
    widthContaner = scale(200),
    onPress = () => navigate(SCREENS.FILTER_SCREEN),
  } = props;
  const { t } = useTranslation();

  return (
    <View marginB-30 row gap-10 spread style={{ alignItems: "center" }}>
      <View
        row
        style={[
          styles.container,
          { gap: 10, backgroundColor: backgroundColor },
        ]}
      >
        <Image
          source={IMAGES.searchIcon}
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
        />
        <TextInput
          placeholder={t(COMMON_TEXT.SEARCH)}
          placeholderTextColor={theme.color.white}
          style={{ width: widthContaner, color: theme.color.white }}
        />
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Image
          source={IMAGES.filter}
          style={{ height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: Platform.OS == "ios" ? 10 : 8,
    borderColor: theme.color.orange,
  },
  headerText: {
    fontSize: theme.fontSize.large,
    color: theme.color.black,
    alignSelf: "center",
  },
});
