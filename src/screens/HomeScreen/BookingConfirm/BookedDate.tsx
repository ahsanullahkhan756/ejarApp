import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { onBack } from "../../../navigation/RootNavigation";

const BookedDate = (props: any) => {
  const data = [
    {
      title: "Renting Period",
      date: `${props?.daysInRange} Days`,
    },
    {
      title: "Pick up date",
      date: props?.startEndDates?.start,
    },
    {
      title: "Return date",
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
          Rent Dates
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
