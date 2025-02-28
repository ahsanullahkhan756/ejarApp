import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { IMAGES, SCREEN_WIDTH, theme, VARIABLES } from "../../../constants";
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
import Permissions, { PERMISSIONS } from "react-native-permissions";
import Geolocation, {
  GeolocationResponse,
} from "@react-native-community/geolocation";
import { setItem } from "../../../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../redux/slice/user";
const MyAddress = () => {
  const userDetails = useSelector((state) => state.user?.userDetails);

  const { t } = useTranslation();
  const [address, setAddress] = useState(userDetails?.address);
  const [city, setCity] = useState(userDetails?.city);
  const [zip, setZip] = useState(userDetails?.zip);
  const dispatch = useDispatch();
  const [country, setCountry] = useState(userDetails?.country);
  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  const getLocationPermission = async (): Promise<boolean> => {
    try {
      const permission = await Permissions.request(
        Platform.OS == "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (
        permission === "blocked" ||
        permission === "denied" ||
        permission === "unavailable"
      ) {
        Alert.alert(
          "Allow Permissions",
          "Please allow location permission to access your current location",
          [
            {
              text: "Go to Settings",
              onPress: () =>
                Platform.OS == "ios"
                  ? Linking.openURL("App-Prefs:LOCATION_SERVICES")
                  : Linking.openSettings(),
            },
            {
              text: "Cancel",
            },
          ]
        );
      }

      return permission === "granted";
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<GeolocationResponse | null> => {
    try {
      const hasPermission = await getLocationPermission();

      if (hasPermission) {
        return new Promise((resolve, reject) => {
          Geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        });
      }

      return null;
    } catch (error) {
      console.error("Error getting current location:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSave = async () => {
    try {
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
      if (res) {
        setItem(VARIABLES.USER_TOKEN, res?.token);
        dispatch(setUserDetails(res));
        showToast({
          title: t(COMMON_TEXT.ADDRESS_UPDATED_SUCCESSFULLY),
          isError: false,
        });
        onBack(); // Go back on success
      }
    } catch (error) {
      showToast({ title: t(EJAR.FAILED_TO_UPDATE_ADDRESS) });
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.MY_ADDRESS} centerImg={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginH-20>
          {/* <View
            style={[
              commonStyles.fieldStyle,
              {
                height: verticalScale(45),
                borderWidth: 0.2,
                marginVertical: 20,
              },
            ]}
          > */}
          {/* <View row spread>
              <Typography color={theme.color.descColor}>
                {COMMON_TEXT.ADDRESS}
              </Typography>
              <Image
                source={IMAGES.addressIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              /> */}

          <InputText
            // label={"Zip Code"}
            labelStyle={{ color: "red" }}
            placeholder={COMMON_TEXT.ADDRESS}
            value={address}
            onChangeText={setAddress}
            style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
          />
          {/* </View> */}
          {/* </View> */}

          {/* <InputText
          label={"Address"}
            placeholder={"Enter Address"}
            value={address}
            onChangeText={setAddress}
            style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
          /> */}
          {/* AIzaSyCc0JJNhebOnH_Cin36_3fatYdQF06LVIM */}
          {/* City Dropdown */}
          <View style={{ marginVertical: 10 }}>
            {/* <Typography color={theme.color.descColor}>City</Typography> */}
            {/* <DropDown
              data={cityData} // Assuming cityData is an array of cities
              value={city}
              width={SCREEN_WIDTH * 0.9}
              height={verticalScale(45)}
              placeholder={COMMON_TEXT.CITY}
              onChange={setCity}
            /> */}

            <InputText
              // label={"Zip Code"}
              labelStyle={{ color: "red" }}
              placeholder={COMMON_TEXT.CITY}
              value={city}
              onChangeText={setCity}
              style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
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
            {/* <DropDown
              data={cityData}
              value={country}
              width={SCREEN_WIDTH * 0.9}
              height={verticalScale(45)}
              placeholder={COMMON_TEXT.COUNTRY}
              onChange={setCountry}
            /> */}

            <InputText
              // label={"Zip Code"}
              labelStyle={{ color: "red" }}
              placeholder={COMMON_TEXT.COUNTRY}
              value={country}
              onChangeText={setCountry}
              style={{ width: SCREEN_WIDTH * 0.9, borderWidth: 0.2 }}
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
