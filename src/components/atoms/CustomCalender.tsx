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
  const setStartEndDates = props?.setStartEndDates;
  const startEndDates = props?.startEndDates;
  const selectedDates = props?.selectedDates;
  const setSelectedDates = props?.setSelectedDates;
  const bookedDates = props?.bookedDates;
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const handleDayPress = (day: any) => {
    const date = day.dateString;
    if (startDate && endDate) {
      setStartDate(date);
      setSelectedDates({
        [date]: {
          startingDay: true,
          selectedColor: theme.color.primary,
          selected: true,
          marked: true,
        },
      });
      setStartEndDates({
        start: date,
        end: null,
      });
      setEndDate(null);
    }

    if (!startDate) {
      // First date clicked (start date)
      setStartDate(date);
      setStartEndDates({
        start: date,
        end: null,
      });
      setSelectedDates({
        [date]: {
          startingDay: true,
          selectedColor: theme.color.primary,
          selected: true,
          marked: true,
        },
      });
    } else if (!endDate && date > startDate) {
      // Second date clicked (end date)
      // Mark the range of dates between start and end as selected
      let markedDates: any = {};
      const start = new Date(startDate);
      const end = new Date(date);
      // Mark all dates between start and end as part of the selected period
      let currentDate = start;
      while (currentDate <= end) {
        const currentDateString = currentDate.toISOString().split("T")[0];
        if (
          bookedDates[currentDate.toISOString().split("T")[0]]
            ?.disableTouchEvent
        ) {
          return; // Do nothing if the date is disabled
        }
        markedDates[currentDateString] = {
          selectedColor: theme.color.primary,
          marked: true,
          selected: true,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Mark the starting and ending days explicitly
      markedDates[startDate] = {
        startingDay: true,
        selectedColor: theme.color.primary,
        marked: true,
        selected: true,
      };
      markedDates[date] = {
        endingDay: true,
        selectedColor: theme.color.primary,
        marked: true,
        selected: true,
      };
      setEndDate(date);
      setStartEndDates({
        ...startEndDates,
        end: date,
      });
      setSelectedDates(markedDates);
    } else if (endDate && date < startDate) {
      // If endDate is selected and a new start date is clicked, reset
      setStartDate(date);
      setStartEndDates({
        start: date,
        end: null,
      });
      setEndDate(null);
      setSelectedDates({
        [date]: {
          startingDay: true,
          selectedColor: theme.color.primary,
          marked: true,
          selected: true,
        },
      });
    }
  };

  // const handleDayPress = (day: any) => {
  //   const date = day.dateString;

  //   // Toggle the selected state of the date
  //   setSelectedDates((prevSelectedDates) => {
  //     const newSelectedDates = { ...prevSelectedDates };
  //     if (newSelectedDates[date]) {
  //       delete newSelectedDates[date]; // Deselect the date if already selected
  //     } else {
  //       newSelectedDates[date] = {
  //         selected: true,
  //         marked: true,
  //         // disableTouchEvent: true,

  //         selectedColor: theme.color.primary,
  //       }; // Select the date
  //     }
  //     return newSelectedDates;
  //   });
  // };

  return (
    <Calendar
      onDayPress={isDisabled ? undefined : handleDayPress}
      markedDates={isDisabled ? dates : selectedDates}
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
