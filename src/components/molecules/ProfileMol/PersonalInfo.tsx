import React, { useState } from "react";
import { FlatList} from "react-native";
import {  theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { View } from "react-native-ui-lib";
import { commonStyles } from "../../../containers/commStyles";
import { useSelector } from "react-redux";
import { useTranslation } from "../../../hooks/useTranslation";
import { COMMON_TEXT } from "../../../constants/screens";

const PersonalInfo = (props: any) => {
  const userdata =  useSelector((state)=>state?.user?.userDetails)
  const DATA = [
    {
      id: 1,
      title: userdata?.firstName,
    },
    {
      id: 2,
      title: userdata?.email,
    },
    {
      id: 3,
      title: userdata?.phone,
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
      ListHeaderComponent={<Typography textType="bold" >{COMMON_TEXT.PERSONAL_DETAILS}</Typography>}
    />
  );
};

export default PersonalInfo;
