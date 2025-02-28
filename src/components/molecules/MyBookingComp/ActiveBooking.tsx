import React from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { data } from "../../../containers/dummy";
import { navigate } from "../../../navigation/RootNavigation";
import { COMMON_TEXT } from "../../../constants/screens";

const ActiveBooking = ({ data }) => {
  const _renderItem = ({ item }: any) => {
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
              numberOfLines={1}
              textType="bold"
              size={theme.fontSize.large20}
            >
              {item?.BookCar?.carName ??
                " " + " " + item?.BookCar?.model ??
                " "}
            </Typography>
            <Typography
              numberOfLines={2}
              size={theme.fontSize.extraSmall12}
              color={theme.color.descColor}
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
      </TouchableOpacity>
    );
  };

  return (
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
      keyExtractor={(item) => item.id}
      style={{ marginBottom: 200 }}
      contentContainerStyle={{ paddingBottom: 100 }} // Add padding to the bottom of the list
    />
  );
};

export default ActiveBooking;
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
