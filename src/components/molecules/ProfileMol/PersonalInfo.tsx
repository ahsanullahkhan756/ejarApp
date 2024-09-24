import React, { useState } from "react";
import { FlatList} from "react-native";
import {  theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../containers/commStyles";

const PersonalInfo = (props: any) => {

  const DATA = [
    {
      id: 1,
      title: "Russell Austin",
    },
    {
      id: 2,
      title: "sheikh.fahad@gmail.com",
    },
    {
      id: 3,
      title: "+971  123 456 7890",
    },
   
  ];

  const _renderItem = ({ item, index }: any) => {
    return (
      <View style={commonStyles.fieldStyle}>
          <Typography color={theme.color.descColor}>{item.title}</Typography>
      </View> 
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Typography textType="bold" >Personal Details</Typography>}
    />
  );
};

export default PersonalInfo;
