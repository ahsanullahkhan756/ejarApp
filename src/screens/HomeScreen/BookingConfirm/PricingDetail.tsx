import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { onBack } from "../../../navigation/RootNavigation";
import { COMMON_TEXT, EJAR } from "../../../constants/screens";
import i18n from "../../../i18n";

const getValidationMessageWithTranslation = (key, values) => {
  // Get the message template from the i18n (assumes i18n.t() provides a translation for the key)
  let message = i18n.t(key);

  // Replace placeholders with translated values
  Object.keys(values).forEach((placeholder) => {
    message = message.replace(
      new RegExp(`\\$\\{${placeholder}\\}`, "g"),
      i18n.t(values[placeholder].toString())
    );
  });

  return message;
};

const PricingDetail = (props: any) => {
  const data = [
    {
      title: EJAR.TOTAL_RENT_FOR_DAYS,
      date: `AED ${props?.price}`,
    },
    ...(props?.item?.securityDeposit
      ? [
          {
            title: COMMON_TEXT.SECURITY_DEPOSIT,
            date: `AED ${props?.item?.securityDeposit}`,
          },
        ]
      : []),
    ...(props?.item?.tax
      ? [
          {
            title: `VAT ${props?.item?.tax}%`,
            date: `AED ${props?.item?.tax}`,
          },
        ]
      : []),
  ];

  return (
    <View>
      <View row spread style={{ alignItems: "center" }}>
        <Typography
          textType="bold"
          size={theme.fontSize.large20}
          color={theme.color.blue}
        >
         {COMMON_TEXT.PRICING_DETAILS}
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
              <Typography>
                {i.title == EJAR.TOTAL_RENT_FOR_DAYS
                  ? getValidationMessageWithTranslation(i.title, {
                      day: props?.daysInRange,
                    })
                  : i?.title}
              </Typography>
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
          <Typography textType="semiBold">{COMMON_TEXT.TOTAL}</Typography>
          <Typography> {"AED" + props?.totalPrice}</Typography>
        </View>
      </View>
    </View>
  );
};

export default PricingDetail;
