import React, { useState } from "react";
import {
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Carousel, Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { IMAGES, SCREENS, STRIPE_KEY, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { DropDown } from "../../components/atoms/DropDown";
import PaymentCard from "../../components/molecules/PaymentCard";
import { navigate } from "../../navigation/RootNavigation";
import { CustomCalender } from "../../components/atoms/CustomCalender";
import { InputText } from "../../components/atoms/InputText";
import { InputDateTime } from "../../components/atoms/InputDateTime";
import { InputDateCard } from "../../components/atoms/InputDateCard";
import { setIsLoading } from "../../redux/slice/user";
import { useDispatch } from "react-redux";
import { post } from "../../services/axios";
import { showToast } from "../../utils/toast";
import { COMMON_TEXT, EJAR } from "../../constants/screens";
import { VALIDATION_MESSAGES } from "../../validationMessages";
import { useTranslation } from "../../hooks/useTranslation";
const MyBooking = ({ route }) => {
  const item = route?.params?.item;
  const bookedDates = route?.params?.bookedDates;
  const { t } = useTranslation();
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: any }>(
    {}
  );
  const [startEndDates, setStartEndDates] = useState({
    start: "",
    end: "",
  });
  const calculateSelectedDays = (selectedDates: any) => {
    // Extract the start and end date from the selectedDates object
    let startDate: string | null = null;
    let endDate: string | null = null;

    Object.keys(selectedDates).forEach((date) => {
      if (selectedDates[date]?.startingDay) {
        startDate = date;
      }
      if (selectedDates[date]?.endingDay) {
        endDate = date;
      }
    });

    if (startDate && !endDate) {
      return 1;
    }

    // If either start or end date is missing, return 0
    if (!startDate || !endDate) {
      return 0;
    }

    // Calculate the difference in days
    const start = new Date(startDate);
    const end = new Date(endDate);

    // If start date is after the end date, return 0 (invalid range)
    if (start > end) {
      return 0;
    }

    // Calculate the number of days
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include both start and end date

    return dayDiff;
  };
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // const handleExpiryDateChange = (selectedDate) => {
  //   console.log("Selected Date:", selectedDate);
  //   let dateObj;

  //   if (typeof selectedDate === "string") {
  //     const parts = selectedDate.split("-");
  //     if (parts.length === 3) {
  //       const day = parseInt(parts[0], 10);
  //       const month = parseInt(parts[1], 10) - 1;
  //       const year = parseInt(parts[2], 10);
  //       dateObj = new Date(year, month, day); // Create Date object
  //     }
  //   } else if (selectedDate instanceof Date && !isNaN(selectedDate)) {
  //     dateObj = selectedDate; // Use as is if it's already a Date object
  //   }

  //   if (dateObj) {
  //     const month = dateObj.getMonth() + 1; // Month is 0-indexed
  //     const year = dateObj.getFullYear().toString().slice(-2); // Get last two digits
  //     setExpiryDate(`${month < 10 ? `0${month}` : month}/${year}`);
  //   } else {
  //     console.warn("Invalid date selected:", selectedDate);
  //   }
  // };

  const daysInRange = calculateSelectedDays(selectedDates);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const CreateStripeTokenFunction = async () => {
    const date = expiryDate.split("/");
    const cardNumber = card.replace(/ /g, "");
    try {
      dispatch(setIsLoading(true));

      const stripeRequestBody = {
        // 'card[name]': "data.card_holder",
        "card[number]": cardNumber,
        "card[exp_month]": date[0],
        "card[exp_year]": `20${date[1]}`,
        "card[cvc]": cvv,
      };

      const headers = {
        Authorization: `Bearer ${STRIPE_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const config = {
        headers,
      };

      const response = await post({
        url: "https://api.stripe.com/v1/tokens",
        data: stripeRequestBody,
        config,
        includeToken: false,
      });

      if (response?.id) {
        navigate(SCREENS.BOOKING_CONFIRM, {
          startEndDates: startEndDates,
          item: item,
          selectedDates: selectedDates,
          daysInRange: daysInRange,
          card: response,
        });
        dispatch(setIsLoading(false));
      }
      return null;
    } catch (error) {
      console.log(error);

      showToast({ title: error?.message });
      dispatch(setIsLoading(false));
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.MY_RENTINGS} centerImg={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View marginH-20>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              color={theme.color.blue}
            >
              {COMMON_TEXT.SELECT_DATE}
            </Typography>
            <CustomCalender
              isDisabled={true}
              setSelectedDates={setSelectedDates}
              setStartEndDates={setStartEndDates}
              startEndDates={startEndDates}
              selectedDates={{ ...selectedDates, ...bookedDates }}
              bookedDates={bookedDates}
            />

            <View row spread marginV-20>
              <Typography
                textType="bold"
                size={theme.fontSize.large20}
                color={theme.color.blue}
              >
                {COMMON_TEXT.NO_OF_DAYS}
              </Typography>
              <DropDown data={[]} placeholder={daysInRange} />
            </View>
            {/* <PaymentCard /> */}

            {/* Add your card */}
            <Typography
              textType="bold"
              color={theme.color.blue}
              size={theme.fontSize.large24}
            >
              {COMMON_TEXT.ADD_YOUR_CARD_DETAILS}
            </Typography>

            <View marginV-10>
              <InputText
                width={360}
                label={COMMON_TEXT.ENTER_YOUR_NAME}
                value={name}
                // onValidationFailed={(isValid: boolean) => {
                //   setValidated((prev) => {
                //     let copy = [...prev];
                //     copy[0] = isValid;
                //     return copy;
                //   });
                // }}
                placeholder={COMMON_TEXT.ENTER_YOUR_NAME}
                // validate={["name"]}
                // validationMessage={["Name is invalid"]}
                onChangeText={(text: string) => setName(text)}
              />

              <InputText
                width={360}
                label={COMMON_TEXT.CARD_NUMBER}
                value={formatCardNumber(card)}
                maxLength={19}
                // onValidationFailed={(isValid: boolean) => {
                //   setValidated((prev) => {
                //     let copy = [...prev];
                //     copy[0] = isValid;
                //     return copy;
                //   });
                // }}
                keyboardType="number-pad"
                placeholder={COMMON_TEXT.ENTER_CARD_NUMBER}
                // validate={["Card"]}
                // validationMessage={["Card is invalid"]}
                onChangeText={(text: string) => setCard(text)}
              />
              <View row spread flex gap-10>
                <View style={{ marginTop: 20 }}>
                  <InputDateCard
                    title={COMMON_TEXT.EXPIRY_DATE}
                    placeholder={"MM/YY"}
                    value={expiryDate}
                    onChange={setExpiryDate}
                  />
                </View>

                <InputText
                  label={COMMON_TEXT.CVV}
                  value={cvv}
                  // onValidationFailed={(isValid: boolean) => {
                  //   setValidated((prev) => {
                  //     let copy = [...prev];
                  //     copy[0] = isValid;
                  //     return copy;
                  //   });
                  // }}
                  placeholder={COMMON_TEXT.ENTER_YOUR_CVV}
                  // validate={["email"]}
                  // validationMessage={["Email is invalid"]}
                  onChangeText={(text: string) => setCvv(text)}
                  style={{ width: 170 }}
                  maxLength={3}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <Button
              label={t(COMMON_TEXT.NEXT)}
              backgroundColor={theme.color.primary}
              borderRadius={30}
              onPress={() => {
                if (
                  card.length > 18 &&
                  name.length > 2 &&
                  expiryDate &&
                  cvv?.length > 2 &&
                  daysInRange != 0
                ) {
                  CreateStripeTokenFunction();
                } else {
                  showToast({
                    title: t(VALIDATION_MESSAGES.PLEASE_FILL_ALL_THE_FEILDS),
                  });
                }
              }}
              style={{
                height: 50,
                margin: 20,
                width: "50%",
                alignSelf: "center",
                marginTop: 0,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10, marginBottom: 30 }}>
            <Typography
              textType="bold"
              size={theme.fontSize.small}
              color={theme.color.blue}
            >
              {EJAR.NOTE_THE_PAYMENT_WILL_BE_CHARGED}
            </Typography>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default MyBooking;
