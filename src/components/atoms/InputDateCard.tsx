import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Appearance, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Typography } from "./Typography";
import moment from "moment";
import { theme } from "../../constants";

export const InputDateCard = (props: any) => {
  const {
    title = null,
    placeholder = "MM/YY",
    value,
    onChange = () => {},
    style = {},
    inputStyle = {},
    cardStyle = {},
    rightIcon = null,
    width = Platform.OS === 'ios' ? 165 : 170,
    minimumDate = new Date(),
    maximumDate = new Date(new Date().getFullYear() + 10, 11, 31),
  } = props;

  const [visible, setVisible] = useState(false);
  const colorScheme = Appearance.getColorScheme();

  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format("MM/YY");
    onChange(formattedDate);
    setVisible(false);
  };

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
      <View style={{ marginVertical: 20, ...style }}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            borderColor: theme.color.descColor,
            borderWidth: 0.3,
            ...cardStyle,
            height: 55,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            width: width
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
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setVisible(false)}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: -15,
  },
});
