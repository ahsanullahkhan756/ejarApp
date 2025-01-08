import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { onBack } from "../../../navigation/RootNavigation";
import { COMMON_TEXT, EJAR } from "../../../constants/screens";

const BookedDate = (props: any) => {
  const data = [
    {
      title: EJAR.RENTING_PERIOD,
      date: `${props?.daysInRange} Days`,
    },
    {
      title: EJAR.PICK_UP_DATE,
      date: props?.startEndDates?.start,
    },
    {
      title: EJAR.RETURN_DATE,
      date: props?.startEndDates?.end ?? props?.startEndDates?.start,
    },
  ];

  return (
    <View>
      <View row spread style={{ alignItems: "center" }}>
        <Typography
          textType="bold"
          size={theme.fontSize.large20}
          color={theme.color.blue}
        >
          {EJAR.RENT_DATES}
        </Typography>
        {/* <TouchableOpacity
          onPress={() => {
            onBack();
          }}
        >
          <Image
            source={IMAGES.pencil}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
      <View style={{ borderWidth: 0.2, borderRadius: 10 }}>
        {data.map((i) => {
          return (
            <View row spread padding-10>
              <Typography>{i.title}</Typography>
              <Typography>{i.date}</Typography>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BookedDate;
