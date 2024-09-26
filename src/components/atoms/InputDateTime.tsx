import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Appearance, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Typography } from "./Typography";
import moment from "moment";
import { theme } from "../../constants";
import { commonStyles } from "../../containers/commStyles";

export const InputDateTime = (props: any) => {
  const {
    title = null,
    error,
    placeholder = "asdsad",
    placeholderColor = theme.color.black,
    inputRef = (input: any) => {},
    value,
    onChange = () => {},
    mode = "date",
    is24Hour = false,
    style = {},
    inputStyle = {},
    cardStyle = {},
    rightIcon = null,
    maximumDate = new Date(),
    width = Platform.OS == 'ios' ? 165 : 170
  } = props;

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  // const [day, month, year] = value?.split("-");
  // const SelectedDate = new Date(`${year}-${month}-${day}`);
  return (
    <View>
      {title && (
        <Typography
          textType={"light"}
          size={14}
          color={theme.color.black}
          style={styles.label}
        >
          {title}
        </Typography>
      )}
      <View
        style={{
          marginVertical: 10,
          // padding:10,
          ...style,
        }}
      >
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            // ...commonStyles.inputView,
            borderColor: theme.color.descColor,
            borderWidth: 0.3,
            ...cardStyle,
            height: 55,
            paddingHorizontal: 10,
            // padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            width:width
          }}
        >
          <Typography
            style={{
              flex: 1,
              fontSize: theme.fontSize.small,
              color: theme.color.descColor,
              ...inputStyle,
            }}
          >
            {value?.length ? value : placeholder}
          </Typography>

          {rightIcon}
        </TouchableOpacity>

        <DateTimePickerModal
          isDarkModeEnabled={colorScheme === "dark"}
          isVisible={visible}
          mode={mode}
          is24Hour={is24Hour}
          maximumDate={maximumDate}
          // maximumDate={SelectedDate ? SelectedDate : maximumDate}
          onConfirm={(e: any) => {
            onChange(
              moment(new Date(e)).format(
                mode == "date" ? "DD-MM-YYYY" : "hh:mm A"
              )
            );
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
          // minimumDate={new Date(moment().format("YYYY-MM-DD"))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: -15,
    // left: 15,
    // paddingHorizontal: 0,
    // backgroundColor: '#fff',
  },
});
