import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { navigate } from "../../../navigation/RootNavigation";
import { COMMON_TEXT } from "../../../constants/screens";

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
        {!item?.reviews?.length != 0 && (
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
        ListEmptyComponent={() => {
          return (
            <View style={styles.noResultsContainer}>
              <Typography style={styles.noResultsText}>
                {COMMON_TEXT.NO_ITEM_FOUND}
              </Typography>
            </View>
          );
        }}
        style={{ marginBottom: 200 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding to the bottom of the list
      />
    </>
  );
};

export default CompletedBooking;
const styles = StyleSheet.create({
  companyLogo: {
    width: 100,
    height: 70,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  companyName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.color.primary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    lineHeight: 40,
    color: theme.color.descColor,
    fontWeight: "bold",
  },
});
