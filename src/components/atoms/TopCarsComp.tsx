import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { IMAGES, theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { Typography } from "./Typography";
import { data } from "../../containers/dummy";

export const TopCarsComp = () => {
  const [selectedCar, setSelectedCar] = useState(null); // State to track selected car

  const handleSelectCar = (carId) => {
    setSelectedCar(carId); // Set the selected car's ID
  };

  return (
    <FlatList
      data={data.topRatedCars}
      numColumns={2}
      renderItem={({ item }) => {
        const isSelected = item.id === selectedCar; // Check if the car is selected
        return (
          <TouchableOpacity style={{flex:1}} onPress={() => handleSelectCar(item.id)}>
            <View
              style={{
                borderWidth: 2,
                flex: 1,
                marginVertical: 10,
                marginRight: 10,
                borderRadius:10,
                borderColor: isSelected ? theme.color.blue : "#fff", // Change border color if selected
              }}
            >
              <Image
                source={item.img}
                style={{ width: "100%", height: 160, borderRadius: 10 }}
                resizeMode="cover"
              />

              <Typography size={theme.fontSize.small} textType="semiBold">
                {item.name}
              </Typography>

              <View row>
                <Image
                  source={IMAGES.starIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
                <Typography>{item.rating}</Typography>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};
