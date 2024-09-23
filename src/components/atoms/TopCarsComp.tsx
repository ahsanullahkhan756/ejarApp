import React, { useState } from "react";
import {FlatList, Image} from "react-native";
import {  theme } from "../../constants";
import { Card } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { data } from "../../containers/dummy";

export const TopCarsComp = () => {
  return (
    <FlatList
      data={data.topRatedCars}
      numColumns={2}
      renderItem={({ item }) => (
        <Card
          style={{
            flex: 1,
            margin: 8,
            padding: 10,
            borderRadius: 10,
            // elevation: 4,
          }}
        >
          <Image
            source={item.img}
            style={{ width: "100%", height: 100, borderRadius: 10 }}
        
          />
          <Typography size={theme.fontSize.small} textType="semiBold">
            {item.name}
          </Typography>
          <Typography>⭐ {item.rating}</Typography>
        </Card>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

