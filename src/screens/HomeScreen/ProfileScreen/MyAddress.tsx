import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { IMAGES, SCREEN_WIDTH, theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import { showToast } from "../../../utils/toast";
import { myAdressApi } from "../../../api/homeServices";
import { verticalScale } from "react-native-size-matters";
import { commonStyles } from "../../../containers/commStyles";
import { Typography } from "../../../components/atoms/Typography";
import { DropDown } from "../../../components/atoms/DropDown";
import { cityData } from "../../../containers/dummy";
import { InputText } from "../../../components/atoms/InputText";
import { useTranslation } from "../../../hooks/useTranslation";
import { COMMON_TEXT, EJAR } from "../../../constants/screens";
import { VALIDATION_MESSAGES } from "../../../validationMessages";

const MyAddress = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  // Handle form submission
  const handleSave = async () => {
    // Validate form fields
    if (!address || !city || !zip || !country) {
      showToast({ title: t(VALIDATION_MESSAGES.PLEASE_FILL_ALL_THE_FEILDS) });
      return;
    }

    const data = {
      address,
      city,
      zip,
      country,
    };

    // API call to update the address
    const res = await myAdressApi(data);
    if (res?.message) {
      showToast({ title: res.message });
      onBack(); // Go back on success
    } else {
      showToast({ title: t(EJAR.FAILED_TO_UPDATE_ADDRESS) });
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.MY_ADDRESS} centerImg={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginH-20>
          <View
            style={[
              commonStyles.fieldStyle,
              {
                height: verticalScale(45),
                borderWidth: 0.2,
                marginVertical: 20,
              },
            ]}
          >
            <View row spread>
              <Typography color={theme.color.descColor}>
                {COMMON_TEXT.ADDRESS}
              </Typography>
              <Image
                source={IMAGES.addressIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* <InputText
          label={"Address"}
            placeholder={"Enter Address"}
            value={address}
            onChangeText={setAddress}
            style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
          /> */}

          {/* City Dropdown */}
          <View style={{ marginVertical: 10 }}>
            {/* <Typography color={theme.color.descColor}>City</Typography> */}
            <DropDown
              data={cityData} // Assuming cityData is an array of cities
              value={city}
              width={SCREEN_WIDTH * 0.9}
              height={verticalScale(45)}
              placeholder={COMMON_TEXT.CITY}
              onChange={setCity}
            />
          </View>

          {/* Zip Code Input */}
          <InputText
            // label={"Zip Code"}
            labelStyle={{ color: "red" }}
            placeholder={COMMON_TEXT.ZIP_CODE}
            value={zip}
            onChangeText={setZip}
            style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
          />

          {/* Country Dropdown */}
          <View style={{ marginVertical: 10 }}>
            {/* <Typography color={theme.color.descColor}>Country</Typography> */}
            <DropDown
              data={cityData}
              value={country}
              width={SCREEN_WIDTH * 0.9}
              height={verticalScale(45)}
              placeholder={COMMON_TEXT.COUNTRY}
              onChange={setCountry}
            />
          </View>
        </View>

        {/* Save Button */}
        <Button
          label={t(COMMON_TEXT.SAVE)}
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={handleSave} // Call save handler on press
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default MyAddress;
