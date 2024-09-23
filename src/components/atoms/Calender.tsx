import React, { useState} from "react";
import {
  StyleSheet,
  Platform,
} from "react-native";
import { navigate, onBack } from "../../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { IMAGES, theme } from "../../constants";
import { Calendar } from "react-native-calendars";
export const Calender = (props: any) => {
  const navigation = useNavigation();
  const {
    titleColor = theme.color.black,
  } = props;
  const [selectedDate, setSelectedDate] = useState("");
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };
  return (
    <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: theme.color.blue,
            },
          }}
          style={{
            borderRadius: 10,
            elevation: 4,
            marginVertical: 10,
          }}
        />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS == "ios" ? 50 : 30,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: theme.fontSize.large,
    color: theme.color.black,
    alignSelf: "center",
  },
});
