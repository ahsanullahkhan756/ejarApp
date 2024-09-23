import React, { useState } from "react";
import {FlatList} from "react-native";
import {  IMAGES, theme } from "../../constants";
import { Card, Image, View, } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { data } from "../../containers/dummy";

export const RentCarsComp = () => {
  return (
  <>
   <FlatList
          data={data.carsForRent}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              style={{
                marginRight: 10,
                flex: 1,
                elevation: 4,
              }}
            >
              <Image
                source={item.img}
                style={{
                  width: "100%",
                  height: 100,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              <View row spread padding-10>
                <Typography size={theme.fontSize.small} textType="semiBold">
                  {item.name}
                </Typography>
                <Typography size={theme.fontSize.small} textType="semiBold">
                  {item.price}
                </Typography>
              </View>
              <View row spread gap-10 padding-10>
                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.calendarIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.date}</Typography>
                </View>

                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.colorIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.color}</Typography>
                </View>

                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.automatic}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.status}</Typography>
                </View>
              </View>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginBottom: 16 }}
        />
      </>
  );
};
