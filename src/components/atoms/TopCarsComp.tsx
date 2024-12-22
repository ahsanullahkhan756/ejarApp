import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux"; // Add this to use Redux state
import { IMAGES, theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { Typography } from "./Typography";

export const TopCarsComp = () => {
  // Fetch the top-rated car data from Redux state
  const topRatedCars = useSelector((state) => state?.appData?.homeData?.topRatedCars || []);
  return (
    <FlatList
      data={topRatedCars}
      numColumns={2}
      renderItem={({ item }) => {
        const isAvailable = item.status === "Available"; 
        return (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => console.log("Car selected:", item.carName)}>
            <View
              style={{
                borderWidth: 2,
                flex: 1,
                marginVertical: 10,
                marginRight: 10,
                borderRadius: 10,
                borderColor: isAvailable ? theme.color.blue : "#fff",
              }}
            >
              <Image
                source={ item.Media?.url
                  ? { uri: item.Media?.url }
                  : IMAGES.truck}
                style={{ width: "100%", height: 160, borderRadius: 10 }}
                resizeMode="cover"
              />
            </View>
            <Typography style={{ marginLeft: 10 }} size={theme.fontSize.small} textType="semiBold">
              {item.carName}
            </Typography>
            <View row style={{ marginLeft: 5 }}>
              <Image
                source={IMAGES.starIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Typography>{item.rating ? item.rating : "No rating"}</Typography>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.ID}
    />
  );
};
