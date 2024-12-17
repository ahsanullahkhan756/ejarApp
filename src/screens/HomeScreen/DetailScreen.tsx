import React, { useEffect, useState } from "react";
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
import { getBookedDatesFunction, topRatedCar } from "../../api/homeServices";

const DetailScreen = ({ route }) => {
  const item = route?.params?.item;

  const [selectedDates, setSelectedDates] = useState([]);

  const getBookedDatesList = async () => {
    try {
      const response = await getBookedDatesFunction(item?.ID);
      if (response != null) {
        // setSelectedDates(response);
        setSelectedDates(["2024-12-05", "2024-12-08", "2024-12-12"]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBookedDatesList();
  }, []);

  const formattedDates = selectedDates.reduce((acc, date) => {
    acc[date] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: theme.color.blue, // Assuming theme.color.blue is defined
    };
    return acc;
  }, {});
  const vehicleSpecs = [
    { label: "Year", value: item?.model },
    { label: "Body Type", value: item?.bodyType },
    { label: "Engine Capacity", value: item?.capacity ?? 0 + " cc" },
    { label: "Color", value: item?.color },
    { label: "Fuel", value: item?.fuel },
  ];
  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView style={{ flex: 1 }}>
        {/* Image Carousel */}

        {item?.Media?.carPicture != null &&
        item?.Media?.carPicture?.length != 0 ? (
          <Swiper
            style={{ height: 300 }}
            dotStyle={[
              styles.dotStyle,
              { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
            ]}
            activeDotStyle={styles.dotStyle}
          >
            {item?.Media?.carPicture?.map((item) => (
              <ImageBackground
                source={{
                  uri: item?.base64,
                }}
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
            ))}
          </Swiper>
        ) : (
          <Swiper
            style={{ height: 300 }}
            dotStyle={[
              styles.dotStyle,
              { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
            ]}
            activeDotStyle={styles.dotStyle}
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
          </Swiper>
        )}

        {/* Vehicle Details */}
        <View style={{ padding: 20 }}>
          <Typography textType="bold" size={theme.fontSize.large20}>
            {item?.carName}
          </Typography>
          <Typography
            size={theme.fontSize.small}
            color={theme.color.descColor}
            numberOfLines={1}
          >
            {item?.description}
          </Typography>
          <Typography
            textType="bold"
            size={theme.fontSize.large20}
            color={theme.color.blue}
          >
            {`AED ${item?.rentalPrice ?? 0}/day`}
          </Typography>

          <VechileStatusItoms item={item} />
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
            {item?.description}
          </Typography>
        </View>

        {/* Calendar for Booking */}
        <View style={{ padding: 20 }}>
          <View style={commonStyles.lineBar} />
          <Typography textType="bold" size={theme.fontSize.large20}>
            Rent Now
          </Typography>

          <CustomCalender dates={formattedDates} />
        </View>

        {/* Rent Now Button */}
        <Button
          label="Rent Now"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() =>
            navigate(SCREENS.MY_BOOKING, {
              item: item,
              bookedDates: formattedDates,
            })
          }
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
