import React, { useState } from "react";
import { ScrollView, Image, FlatList } from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import { Calendar } from "react-native-calendars";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";
import { Calender } from "../../components/atoms/Calender";
import { navigate } from "../../navigation/RootNavigation";
import SafeAreaContainer from "../../containers/SafeAreaContainer";

const DetailScreen = (props: any) => {
  console.log("preops", props);

  const [selectedDate, setSelectedDate] = useState("");

  const vehicleSpecs = [
    { label: "Year", value: "2021" },
    { label: "Body Type", value: "Truck" },
    { label: "Engine Capacity", value: "2800cc" },
    { label: "Color", value: "White" },
    { label: "Fuel", value: "Diesel" },
  ];



  return (
    <SafeAreaContainer safeArea={false}>
    <ScrollView style={{ flex: 1 }}>
      {/* Image Carousel */}
      <Carousel loop>
        <Image source={IMAGES.truck} style={{ width: "100%", height: 250 }} />
        <Image source={IMAGES.car1} style={{ width: "100%", height: 250 }} />
        <Image source={IMAGES.car5} style={{ width: "100%", height: 250 }} />
      </Carousel>

      {/* Vehicle Details */}
      <View style={{ padding: 20 }}>
        <Typography textType="bold" size={theme.fontSize.large20}>
          Ford Truck 2021
        </Typography>
        <Typography size={theme.fontSize.small} color={theme.color.descColor}>
          Torem ipsum dolor sit amet, consectetur{" "}
        </Typography>
        <Typography
          textType="bold"
          size={theme.fontSize.large20}
          color={theme.color.blue}
        >
          AED 7,200/day
        </Typography>
        {/* <Typography>Jumeirah, Dubai - Automatic - 60,000 km</Typography> */}

        <View row spread gap-10 paddingV-10>
          <View row gap-5 style={{ alignItems: "center" }}>
            <Image
              source={IMAGES.mapPin}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Typography>Jumeirah, Dubai</Typography>
          </View>

          <View row gap-5 style={{ alignItems: "center" }}>
            <Image
              source={IMAGES.automatic}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Typography>Automatic</Typography>
          </View>
        </View>

        <View row spread gap-10 paddingV-10>
          <View row gap-5 style={{ alignItems: "center" }}>
            <Image
              source={IMAGES.calendarIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Typography>2021</Typography>
          </View>

          <View row gap-5 style={{ alignItems: "center" }}>
            <Image
              source={IMAGES.speed}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            <Typography>60,000 km</Typography>
          </View>
        </View>
      </View>

      {/* Vehicle Specifications */}
      <FlatList
        data={vehicleSpecs}
        renderItem={({ item, index }) => (
          <View
            row
            spread
            padding-20
            style={{
              backgroundColor:
                index % 2 === 0 ? theme.color.divider : theme.color.white,
            }}
          >
            <Typography>{item.label}</Typography>

            <Typography>{item.value}</Typography>
          </View>
        )}
        keyExtractor={(item) => item.label}
      />

      {/* Description */}
      <View style={{ padding: 20 }}>
        <View style={commonStyles.lineBar} />
        <Typography textType="bold" size={theme.fontSize.large20}>
          Description
        </Typography>
        <Typography color={theme.color.descColor}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry.
        </Typography>
      </View>

      {/* Calendar for Booking */}
      <View style={{ padding: 20 }}>
        <View style={commonStyles.lineBar} />
        <Typography textType="bold" size={theme.fontSize.large20}>
          Book Now
        </Typography>
        
       <Calender />
      </View>

      {/* Rent Now Button */}
      <Button
        label="Rent Now"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={() => navigate(SCREENS.MY_BOOKING)}
        style={{ height: 50, margin: 20,width:'50%',alignSelf:"center" }}
      />
    </ScrollView>
    </SafeAreaContainer>
  );
};

export default DetailScreen;
