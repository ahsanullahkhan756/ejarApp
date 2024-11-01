import React, { useState } from "react";
import {
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { IMAGES, SCREENS, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import VechileStatusItoms from "../../../components/molecules/MyBookingComp/VechileStatusItoms";
import BookedDate from "./BookedDate";
import PricingDetail from "./PricingDetail";
import BookedCondition from "./BookedCondition";
import CheckCondition from "./CheckCondition";
import { navigate } from "../../../navigation/RootNavigation";

const BookingConfirmation = (props: any) => {
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
      <Header titleText="Renting Confirmation" centerImg={false} />
      <ScrollView style={{ flex: 1, marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <View>
          <View gap-10 row>
            <Image
              source={IMAGES.truck}
              style={{ width: 160, height: 110 }}
              resizeMode="stretch"
            />
            <View>
              <Typography textType="bold" size={theme.fontSize.large20}>
                Ford Truck 2021
              </Typography>
              <Typography
                size={theme.fontSize.extraSmall12}
                color={theme.color.descColor}
              >
                Torem ipsum dolor sit amet,{"\n"}consectetur
              </Typography>
              <Typography
                textType="bold"
                size={theme.fontSize.large20}
                color={theme.color.blue}
              >
                AED 7,200/day
              </Typography>
            </View>
          </View>

          <View marginV-10>
            <VechileStatusItoms />
          </View>
          <View marginV-10>
            <BookedDate />
          </View>
          <View marginV-10>
            <PricingDetail />
          </View>
          <View marginV-10>
            <BookedCondition />
          </View>
          <View marginV-20>
          <CheckCondition />
          </View>
          </View>
          <View marginV-20>
            <Typography >Booking conditions must be agreed upon before proceeding to pay.</Typography>
        </View>
        <Button
        label="Confirm and Pay"
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={() => navigate(SCREENS.CONTRACT)}
        style={{ height: 50, margin: 20,width:'50%',alignSelf:"center" }}
      />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BookingConfirmation;
