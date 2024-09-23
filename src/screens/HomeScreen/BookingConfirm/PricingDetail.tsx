import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";

const PricingDetail = (props: any) => {
  const data = [
    {
      title: "Total Rent For 4 Days",
      date: "AED30,280",
    },
    {
      title: "Security Deposit",
      date: "AED5000",
    },
    {
      title: "VAT 15%",
      date: "AED3500",
    },
    {
      title: "Delivery",
      date: "Free",
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
          Pricing Details
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
            <View row spread padding-10>
              <Typography textType="semiBold">{i.title}</Typography>
              <Typography>{i.date}</Typography>
            </View>
          );
        })}
        <View
          style={{
            borderWidth: 0.5,
            borderColor: theme.color.descColor,
            width: "100%",
            marginVertical: 15,
          }}
        />
        <View row spread padding-10>
          <Typography textType="semiBold">Total</Typography>
          <Typography>AED28,780</Typography>
        </View>
      </View>
    </View>
  );
};

export default PricingDetail;
