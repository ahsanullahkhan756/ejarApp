import React from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { data } from "../../../containers/dummy";
import { navigate } from "../../../navigation/RootNavigation";

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
      keyExtractor={(item) => item.id}
      style={{marginBottom:200}}
      contentContainerStyle={{ paddingBottom: 100 }} // Add padding to the bottom of the list
    />
  );
};

export default ActiveBooking;
