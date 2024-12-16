// import React, { useState } from "react";
// import { StyleSheet, Platform } from "react-native";
// import { theme } from "../../constants";
// import { Calendar } from "react-native-calendars";
// export const CustomCalender = (props: any) => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const handleDayPress = (day: any) => {
//     setSelectedDate(day.dateString);
//   };
//   return (
//     <Calendar
//       onDayPress={handleDayPress}
//       markedDates={{
//         [selectedDate]: {
//           selected: true,
//           marked: true,
//           selectedColor: theme.color.primary,
//         },
//       }}
//       style={{
//         borderRadius: 10,
//         elevation: 4,
//         marginVertical: 10,
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS == "ios" ? 50 : 30,
//     paddingBottom: 20,
//   },
//   headerText: {
//     fontSize: theme.fontSize.large,
//     color: theme.color.black,
//     alignSelf: "center",
//   },
// });

import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { theme } from "../../constants";
import { Calendar } from "react-native-calendars";

export const CustomCalender = (props: any) => {
  const isDisabled = props?.isDisabled ? false : true;
  const dates = props?.dates;
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: any }>(
    {}
  );

  const handleDayPress = (day: any) => {
    const date = day.dateString;

    // Toggle the selected state of the date
    setSelectedDates((prevSelectedDates) => {
      const newSelectedDates = { ...prevSelectedDates };
      if (newSelectedDates[date]) {
        delete newSelectedDates[date]; // Deselect the date if already selected
      } else {
        newSelectedDates[date] = {
          selected: true,
          marked: true,
          // disableTouchEvent: true,

          selectedColor: theme.color.primary,
        }; // Select the date
      }
      return newSelectedDates;
    });
  };

  return (
    <Calendar
      onDayPress={isDisabled ? undefined : handleDayPress}
      markedDates={dates ?? selectedDates}
      
      // markingType="period"
      // markedDates={{
      //   "2012-05-21": {
      //     startingDay: true,
      //     color: "#50cebb",
      //     textColor: "white",
      //   },
      //   "2012-05-22": { color: "#70d7c7", textColor: "white" },
      //   "2012-05-23": {
      //     color: "#70d7c7",
      //     textColor: "white",
      //     marked: true,
      //     dotColor: "white",
      //   },
      //   "2012-05-24": { color: "#70d7c7", textColor: "white" },
      //   "2012-05-25": { endingDay: true, color: "#50cebb", textColor: "white" },
      // }}
      // markedDates={selectedDates} // Pass the selected dates to the calendar
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
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: theme.fontSize.large,
    color: theme.color.black,
    alignSelf: "center",
  },
});
