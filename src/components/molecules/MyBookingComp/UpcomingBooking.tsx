import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import {FlatList, Image, TouchableOpacity} from "react-native";
import { data } from "../../../containers/dummy";
import { navigate } from "../../../navigation/RootNavigation";

const UpcomingBooking = () => {
  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={()=>{navigate(SCREENS.USER_BOOKING_DETAIL)}}>

      <View gap-10 row marginV-20>
        <Image
          source={item.img}
          style={{ width: 160, height: 110, borderRadius: 20 }}
          resizeMode="stretch"
        />
        <View>
          <Typography textType="bold" size={theme.fontSize.large20}>
            {item.name}
          </Typography>
          <Typography
            size={theme.fontSize.extraSmall12}
            color={theme.color.descColor}
          >
            Torem ipsum dolor sit amet,{"\n"}consectetur
          </Typography>
          <Typography
            textType="bold"
            size={theme.fontSize.medium}
            color={theme.color.blue}
          >
            {item.price}
          </Typography>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data.topRatedCars}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default UpcomingBooking;
