import React, { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { IMAGES, SCREENS, theme } from "../../../constants";
import {FlatList, Image, TouchableOpacity} from "react-native";
import { navigate } from "../../../navigation/RootNavigation";

const CompletedBooking = () => {

  const _renderItem = () => {
    return (
      <TouchableOpacity onPress={()=>{navigate(SCREENS.USER_BOOKING_DETAIL)}}>

      <View gap-10 row marginV-20>
        <Image
          source={IMAGES.truck}
          style={{ width: 160, height: 110, borderRadius: 20 }}
          resizeMode="stretch"
        />
        <View>
          <Typography textType="bold" size={theme.fontSize.large20}>
          Ford Truck 2021
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
           AED 7,200/day
          </Typography>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  return (
   <>
    {_renderItem()}
    <Button label={"Leave a Review & Rating"} style={{height:50,width:320,alignSelf:"center",marginBottom:20}} backgroundColor={theme.color.blue} onPress={()=>navigate(SCREENS.RATING)}/>

    {_renderItem()}
    <Button label={"Leave a Review & Rating"} style={{height:50,width:320,alignSelf:"center",marginBottom:20}} backgroundColor={theme.color.blue} onPress={()=>navigate(SCREENS.RATING)}/>
   </>
  );
};

export default CompletedBooking;
