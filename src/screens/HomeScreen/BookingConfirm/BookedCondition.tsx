import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";

const BookedCondition = (props: any) => {
  const data = [
    {
      title: "Lorem Ipsum is simply dummy text",
    },
    {
      title: "The printing and typesetting industry."

    },
    {
      title: "Lorem Ipsum has been the industry's ",

    },
    {
      title: "Standard dummy text ever since."

    },
    {
      title: "When an unknown printer took a galley",

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
          Booking Conditions
        </Typography>
        <TouchableOpacity>
          <Image
            source={IMAGES.pencil}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{ borderWidth: 0.2, borderRadius: 10 }}>
        {data.map((i) => {
          return (
            <View row style={{alignItems:"center"}} gap-10 padding-10> 
            <View style={commonStyles.innerCircle} />
              <Typography >{i.title}</Typography>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BookedCondition;
