import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, theme } from "../../constants";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { useTranslation } from "../../hooks/useTranslation";
import { COMMON_TEXT } from "../../constants/screens";
export const DropDown = (props: any) => {
  const {
    data,
    height = 50,
    width = 150,
    placeholder = COMMON_TEXT.SELECT_ITEM,
    onSelect,
  } = props;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { t } = useTranslation();

  console.log('data =======>', data);
  

  return (
    // <Dropdown
    //   style={[styles.dropdown, { height: height, width: width }]}
    //   // placeholderStyle={styles.placeholderStyle}
    //   selectedTextStyle={styles.selectedTextStyle}
    //   itemTextStyle={{color: '#000'}}
    //   itemContainerStyle={{color: '#000'}}
    //   inputSearchStyle={styles.inputSearchStyle}
    //   iconStyle={styles.iconStyle}
    //   data={data}
    //   search={data?.length == 0 ? false : true}
    //   maxHeight={300}
    //   labelField={COMMON_TEXT.LABEL}
    //   valueField="value"
    //   // placeholder={!isFocus ? "Select item" : "..."}
    //   placeholder={"asdasas"}
    //   // placeholder={t(placeholder)}
    //   placeholderStyle={{ color: theme.color.black, fontSize: 16 }}
    //   // searchPlaceholder={t(COMMON_TEXT.SEARCH)}
    //   searchPlaceholder={"dasdasas"}
    //   value={value}
    //   onFocus={() => {
    //     if (data?.length == 0) return;
    //     setIsFocus(true);
    //   }}
    //   onBlur={() => setIsFocus(false)}
    //   onChange={(item) => {
    //     setValue(item?.value);
    //     setIsFocus(false);
    //     if (onSelect) {
    //       onSelect(item?.value);
    //     }
    //   }}
    // />

    <Dropdown
          style={[styles.dropdown,{ height: height, width: width }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          // placeholder={!isFocus ? 'Select item' : '...'}
          placeholder={t(placeholder)}
          searchPlaceholder="Search..."
          value={value}
          // onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
             onFocus={() => {
        if (data?.length == 0) return;
        setIsFocus(true);
      }}
         
        />
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
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
    // backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    backgroundColor:"red"

  },
  placeholderStyle: {
    fontSize: 16,
    color:'#000'

  },
  selectedTextStyle: {
    fontSize: 16,
       color:'#000'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
        color:'#000'
  },
});
