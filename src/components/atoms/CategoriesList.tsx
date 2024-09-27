import React from "react";
import { FlatList, Image } from "react-native";
import { View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { SCREEN_WIDTH, theme } from "../../constants";

export const CategoriesList = ({ data }:any) => (
  <View padding-20>
    <FlatList
      data={data}
      numColumns={4}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View marginH-15 style={{ alignItems: "center", marginLeft: -2 }}>
          <Image source={item.icon} style={{ width: SCREEN_WIDTH * 0.2, height: 80, borderRadius: 10 }} resizeMode="cover" />
          <Typography size={theme.fontSize.extraSmall12}>{item.name}</Typography>
        </View>
      )}
      keyExtractor={(item) => item.id}
      columnWrapperStyle={{ marginBottom: 10 }}
    />
  </View>
);
