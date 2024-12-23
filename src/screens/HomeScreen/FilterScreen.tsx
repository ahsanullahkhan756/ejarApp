import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { Typography } from "../../components/atoms/Typography";
import { Button, View } from "react-native-ui-lib";
import { SCREENS, SCREEN_WIDTH, theme } from "../../constants";
import { InputField } from "../../components/atoms/InputField";
import { InputDateTime } from "../../components/atoms/InputDateTime";
import { DropDown } from "../../components/atoms/DropDown";
import {
  dealData,
  fuekData,
  munalData,
  spaceData,
  userData,
} from "../../containers/dummy";
import { showToast } from "../../utils/toast";
import { onBack } from "../../navigation/RootNavigation";
import { filterApi } from "../../api/homeServices"; // API call function
import { useDispatch } from "react-redux";
import { setFilterData } from "../../redux/slice/appData";

const FilterScreen = () => {
  // State management for filters
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [fromKM, setFromKM] = useState("");
  const [toKM, setToKM] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [userType, setUserType] = useState("");
  const [dealType, setDealType] = useState("");
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

  // Handle closing date picker
  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  const handleApplyFilters = async () => {
    try {
      const filterParams = {};

      if (fromPrice) filterParams.fromPrice = fromPrice;
      if (toPrice) filterParams.toPrice = toPrice;
      if (fromYear) filterParams.fromYear = fromYear;
      if (toYear) filterParams.toYear = toYear;
      if (fromKM) filterParams.fromKM = fromKM;
      if (toKM) filterParams.toKM = toKM;
      if (fuelType) filterParams.fuelType = fuelType;
      if (transmissionType) filterParams.transmissionType = transmissionType;
      if (userType) filterParams.userType = userType;
      if (dealType) filterParams.dealType = dealType;
      if (date) filterParams.date = date;
      if (date2) filterParams.date2 = date2;

      const filterResponse = await filterApi(filterParams);
      if (filterResponse) {
        dispatch(setFilterData(filterResponse?.Data));
        onBack();
        // showToast({ title: "Filters Applied Successfully" });
      }
    } catch (error) {
      showToast({
        title: "Error applying filters. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Filters" centerImg={false} />
      <ScrollView bounces={false}>
        <View padding-20>
          {/* Price Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Price
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired price Range
            </Typography>
          </View>
          <View gap-5 row width={"100%"} style={{ alignItems: "center" }}>
            <InputField
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
              maxLength={10}
              width={SCREEN_WIDTH * 0.4}
              value={fromPrice}
              onChangeText={setFromPrice}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputField
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
              maxLength={10}
              value={toPrice}
              onChangeText={setToPrice}
            />
          </View>

          {/* Year Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Year
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired year range
            </Typography>
          </View>
          <View gap-10 row marginV-10 style={{ alignItems: "center" }}>
            <InputDateTime
              // title={"Select Date"}
              placeholder={"Select Date"}
              mode={"date"}
              value={date}
              onChange={setDate}
              style={{ width: SCREEN_WIDTH * 0.4 }}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputDateTime
              // title={"Select Date"}
              placeholder={"Select Date"}
              mode={"date"}
              value={date2}
              onChange={setDate2}
            />
          </View>

          {/* Kilometers Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Kilometers
          </Typography>

          <Typography color={theme.color.descColor} size={theme.fontSize.small}>
            Set your desired kilometers range
          </Typography>

          <View gap-5 row style={{ alignItems: "center" }}>
            <InputField
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
              rightTitle="km"
              maxLength={10}
              width={SCREEN_WIDTH * 0.4}
              value={fromKM}
              onChangeText={setFromKM}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputField
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
              value={toKM}
              onChangeText={setToKM}
            />
          </View>
          <View marginV-10>
            {/* Fuel Type Field */}
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Fuel Type
            </Typography>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired fuel type
            </Typography>
          </View>
          <DropDown
            data={fuekData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={fuelType}
            onChange={setFuelType}
          />
          <View marginV-10>
            {/* Transmission Type Field */}
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Transmission Type
            </Typography>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired transmission type
            </Typography>
          </View>
          <DropDown
            data={munalData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={transmissionType}
            onChange={setTransmissionType}
          />

          {/* User Type Field */}
          <View marginV-20>
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              User Type
            </Typography>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired User type
            </Typography>
            <DropDown
              data={userData}
              height={Platform.OS === "ios" ? 50 : 60}
              width={Platform.OS === "ios" ? 350 : 370}
              value={userType}
              onChange={setUserType}
            />
          </View>
          <View marginV-20>
            {/* Deal Type Field */}
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Deal Type
            </Typography>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired Deal Type
            </Typography>
            <DropDown
              data={dealData}
              height={Platform.OS === "ios" ? 50 : 60}
              width={Platform.OS === "ios" ? 350 : 370}
              value={dealType}
              onChange={setDealType}
            />
          </View>
          {/* Apply Button */}
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Button
              label="Clear Filters"
              backgroundColor={theme.color.tgray}
              borderRadius={30}
              onPress={() => {
                dispatch(setFilterData(null));
                onBack()
              }}
              style={{
                height: 50,
                width: "47%",
                marginVertical: 50,
              }}
            />
            <Button
              label="Apply"
              backgroundColor={theme.color.primary}
              borderRadius={30}
              onPress={handleApplyFilters}
              style={{
                height: 50,
                width: "47%",
                marginVertical: 50,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default FilterScreen;
