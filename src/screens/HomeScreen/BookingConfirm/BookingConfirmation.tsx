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
import { showToast } from "../../../utils/toast";

const BookingConfirmation = ({ route }) => {
  const startEndDates = route?.params?.startEndDates;
  const item = route?.params?.item;
  const selectedDates = route?.params?.selectedDates;
  const daysInRange = route?.params?.daysInRange;
  const card = route?.params?.card;

  const totalPrice = item?.rentalPrice * daysInRange;

  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState(false);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Renting Confirmation" centerImg={false} />
      <ScrollView
        style={{ flex: 1, marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View gap-10 row>
            <Image
              source={{ uri: item?.Media?.carPicture?.[0]?.base64 }}
              style={{ width: 160, height: 110 }}
              resizeMode="stretch"
            />
            <View>
              <Typography textType="bold" size={theme.fontSize.large20}>
                {item?.carName}
              </Typography>
              <Typography
                size={theme.fontSize.extraSmall12}
                numberOfLines={1}
                color={theme.color.descColor}
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
            </View>
          </View>

          <View marginV-10>
            <VechileStatusItoms item={item} />
          </View>
          <View marginV-10>
            <BookedDate
              daysInRange={daysInRange}
              startEndDates={startEndDates}
            />
          </View>
          <View marginV-10>
            <PricingDetail item={item} totalPrice={totalPrice} />
          </View>
          <View marginV-10>
            {/* // TODO:: CHNAGE TO AGAINST USER ID */}
            <BookedCondition id={item?.ID} />
          </View>
          <View marginV-20>
            <CheckCondition
              setCheck={setCheck}
              check={check}
              status={status}
              setStatus={setStatus}
            />
          </View>
        </View>
        <View marginV-20>
          <Typography>
            Renting conditions must be agreed upon before proceeding to pay.
          </Typography>
        </View>
        <Button
          label="Confirm and Pay"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() => {
            if (status && check) {
              navigate(SCREENS.CONTRACT, {
                item: item,
              });
            } else {
              showToast({ title: "Please confirm the terms to proceed" });
            }
          }}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BookingConfirmation;
