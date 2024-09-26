import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, theme } from "../../constants";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
export const DropDown = (props: any) => {
  const { data, height = 50, width = 150, placeholder = "Select item" } = props;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <Dropdown
      style={[styles.dropdown,{height: height,width: width}]}
      // placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      // placeholder={!isFocus ? "Select item" : "..."}
      placeholder={placeholder}
      placeholderStyle={{color:theme.color.tgray,fontSize:16}}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item?.value);
        setIsFocus(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    borderColor: theme.color.descColor,
    borderWidth: 0.3,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
