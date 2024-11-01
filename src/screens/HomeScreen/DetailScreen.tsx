import React, { useState } from "react";
import {
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import { Calendar } from "react-native-calendars";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";
import { navigate, onBack } from "../../navigation/RootNavigation";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import VechileStatusItoms from "../../components/molecules/MyBookingComp/VechileStatusItoms";
import { CustomCalender } from "../../components/atoms/CustomCalender";
import Swiper from "react-native-swiper";

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

        <Swiper
          style={{ height: 300 }}
          dotStyle={[
            styles.dotStyle,
            { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
          ]}
          activeDotStyle={styles.dotStyle}
        >
          <ImageBackground
            source={IMAGES.truck}
            style={{ width: "100%", height: 250 }}
          >
            <TouchableOpacity
              onPress={() => onBack()}
              style={{ position: "absolute", left: 20, top: 50 }}
            >
              <Image
                source={IMAGES.leftIcon}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            source={IMAGES.car2}
            style={{ width: "100%", height: 250 }}
          >
            <TouchableOpacity
              onPress={() => onBack()}
              style={{ position: "absolute", left: 20, top: 50 }}
            >
              <Image
                source={IMAGES.leftIcon}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            source={IMAGES.car3}
            style={{ width: "100%", height: 250 }}
          >
            <TouchableOpacity
              onPress={() => onBack()}
              style={{ position: "absolute", left: 20, top: 50 }}
            >
              <Image
                source={IMAGES.leftIcon}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>
        </Swiper>

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

          <VechileStatusItoms />
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
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry.
          </Typography>
        </View>

        {/* Calendar for Booking */}
        <View style={{ padding: 20 }}>
          <View style={commonStyles.lineBar} />
          <Typography textType="bold" size={theme.fontSize.large20}>
            Rent Now
          </Typography>

          <CustomCalender />
        </View>

        {/* Rent Now Button */}
        <Button
          label="Rent Now"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() => navigate(SCREENS.MY_BOOKING)}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: theme.color.primary,
    width: 50,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
export default DetailScreen;
