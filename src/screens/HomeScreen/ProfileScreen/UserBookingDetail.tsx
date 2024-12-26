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

const UserBookingDetail = ({ route }) => {
  const detail = route?.params?.detail;
  if (!detail) return;

  const calculateDays = () => {
    // Extract the start and end date from the selectedDates object
    let startDate: string | null = null;
    let endDate: string | null = null;

    // Object.keys(selectedDates).forEach((date) => {
    //   if (selectedDates[date]?.startingDay) {
    //     startDate = date;
    //   }
    //   if (selectedDates[date]?.endingDay) {
    //     endDate = date;
    //   }
    // });

    if (detail?.StartDate == detail?.EndDate) {
      return 1;
    }

    // If either start or end date is missing, return 0
    if (!detail?.StartDate || !detail?.EndDate) {
      return 0;
    }

    // Calculate the difference in days
    const start = new Date(detail?.StartDate);
    const end = new Date(detail?.EndDate);

    // If start date is after the end date, return 0 (invalid range)
    if (start > end) {
      return 0;
    }

    // Calculate the number of days
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both start and end date

    return dayDiff;
  };

  const data = [
    ...(detail?.BookCar?.securityDeposit
      ? [
          {
            title: "Security Deposit",
            subTitle: `AED ${detail?.BookCar?.securityDeposit}`,
          },
        ]
      : []),
    ...(detail?.BookCar?.tax
      ? [
          {
            title: `VAT ${detail?.BookCar?.tax}%`,
            subTitle: `AED ${
              (detail?.PerDayPayment *
                calculateDays() *
                parseInt(detail?.BookCar?.tax)) /
              100
            }`,
          },
        ]
      : []),

    { title: "Total Amount", subTitle: `AED ${detail?.Payable}` },
  ];

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Renting"} centerImg={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View gap-10 row>
          <Image
            source={
              detail?.BookCar?.Media?.carPicture?.[0]?.base64
                ? { uri: detail?.BookCar?.Media?.carPicture?.[0]?.base64 }
                : IMAGES.truck
            }
            style={{ width: 160, height: 110 }}
            resizeMode="stretch"
          />
          <View>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              numberOfLines={1}
            >
              {detail?.BookCar?.carName ??
                " " + " " + detail?.BookCar?.model ??
                " "}
            </Typography>
            <Typography
              numberOfLines={2}
              size={theme.fontSize.extraSmall12}
              color={theme.color.descColor}
            >
              {detail?.BookCar?.shortDescription}
            </Typography>
            <Typography
              numberOfLines={1}
              textType="bold"
              size={theme.fontSize.large20}
              color={theme.color.blue}
            >
              {`AED ${detail?.BookCar?.rentalPrice ?? 0}/day`}
            </Typography>
          </View>
        </View>
        <VechileStatusItoms item={detail?.BookCar} />
        <View marginV-20>
          <Typography size={theme.fontSize.large} textType="semiBold">
            No. of Days
          </Typography>
          <Typography size={theme.fontSize.small}>
            {calculateDays()} Days
          </Typography>
        </View>
        <View marginV-10>
          <Typography size={theme.fontSize.large} textType="semiBold">
            Rented Dates
          </Typography>
          <Typography size={theme.fontSize.small}>
            {new Date(detail?.StartDate).toLocaleDateString()} {" - "}
            {new Date(detail?.EndDate).toLocaleDateString()}
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

export default UserBookingDetail;
