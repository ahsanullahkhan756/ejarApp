import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { navigate } from "../../../navigation/RootNavigation";

const CompletedBooking = ({ data }) => {
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(SCREENS.USER_BOOKING_DETAIL, {
            detail: item,
          });
        }}
      >
        <View gap-10 row marginV-20>
          <Image
            source={
              item?.BookCar?.Media?.carPicture?.[0]?.base64
                ? { uri: item?.BookCar?.Media?.carPicture?.[0]?.base64 }
                : IMAGES.truck
            }
            style={{ width: 160, height: 110, borderRadius: 20 }}
            resizeMode="cover"
          />
          <View>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              numberOfLines={1}
            >
              {item?.BookCar?.carName ??
                " " + " " + item?.BookCar?.model ??
                " "}
            </Typography>
            <Typography
              size={theme.fontSize.extraSmall12}
              color={theme.color.descColor}
              numberOfLines={2}
            >
              {item?.BookCar?.shortDescription ?? " "}
            </Typography>
            <Typography
              textType="bold"
              size={theme.fontSize.medium}
              color={theme.color.blue}
            >
              {item.Payable + " AED"}
            </Typography>
          </View>
        </View>
        {!item?.reviews && (
          <Button
            label={"Leave a Review & Rating"}
            style={{
              height: 50,
              width: 320,
              alignSelf: "center",
              marginBottom: 20,
            }}
            backgroundColor={theme.color.blue}
            onPress={() =>
              navigate(SCREENS.RATING, {
                details: item,
              })
            }
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <FlatList
        data={data}
        renderItem={_renderItem}
        style={{ marginBottom: 200 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding to the bottom of the list
      />
    </>
  );
};

export default CompletedBooking;
