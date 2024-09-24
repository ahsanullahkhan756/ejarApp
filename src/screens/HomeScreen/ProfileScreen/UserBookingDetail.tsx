import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import PersonalInfo from "../../../components/molecules/ProfileMol/PersonalInfo";
import ChangePassword from "../../../components/molecules/ProfileMol/ChangePassword";
import { IMAGES, theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import VechileStatusItoms from "../../../components/molecules/MyBookingComp/VechileStatusItoms";
import { Typography } from "../../../components/atoms/Typography";

const UserBookingDetail = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Booking"} centerImg={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
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
        {VechileStatusItoms()}
        <View marginV-20>
          <Typography size={theme.fontSize.large} textType="semiBold">
            No. of Days
          </Typography>
          <Typography size={theme.fontSize.small}>04 Days</Typography>
        </View>
        <View marginV-10>
          <Typography size={theme.fontSize.large} textType="semiBold">
            Booked Dates
          </Typography>
          <Typography size={theme.fontSize.small}>
            27, 28, 29, 30 of Augest
          </Typography>
        </View>

        {data.map((i) => {
          return (
            <>
              <View row spread marginT-20 style={{ alignItems: "center" }}>
                <Typography size={theme.fontSize.large} textType="semiBold">
                  {i.title}
                </Typography>
                <Typography size={theme.fontSize.large} textType="semiBold">
                  {i.subTitle}
                </Typography>
              </View>
            </>
          );
        })}
      </ScrollView>
    </SafeAreaContainer>
  );
};

const data = [
  { title: "Security Deposit", subTitle: "AED910" },
  { title: "Delivery Charges", subTitle: "Free" },
  { title: "Total Amount", subTitle: "AED30,280" },
];

export default UserBookingDetail;
