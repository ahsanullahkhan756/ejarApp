import React, { useState } from "react";
import { ScrollView, Image, FlatList, StyleSheet } from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { DropDown } from "../../components/atoms/DropDown";
import PaymentCard from "../../components/molecules/PaymentCard";
import { navigate } from "../../navigation/RootNavigation";
import { CustomCalender } from "../../components/atoms/CustomCalender";
const MyBooking = (props: any) => {
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="My Booking" centerImg={false} />
      <ScrollView style={{ flex: 1 }}>
        <View marginH-20>
          <Typography
            textType="bold"
            size={theme.fontSize.large20}
            color={theme.color.blue}
          >
            Select Date
          </Typography>
          <CustomCalender />

          <View row spread marginV-20>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              color={theme.color.blue}
            >
              No. of Days
            </Typography>
            <DropDown data={data} />
          </View>
          <PaymentCard />
          
          <Button
            label="Next"
            backgroundColor={theme.color.primary}
            borderRadius={30}
            onPress={() => navigate(SCREENS.BOOKING_CONFIRM)}
            style={{
              height: 50,
              margin: 20,
              width: "50%",
              alignSelf: "center",
              marginVertical:50
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default MyBooking;
