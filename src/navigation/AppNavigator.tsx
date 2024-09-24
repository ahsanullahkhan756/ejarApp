import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants";
import Home from "../screens/HomeScreen/Home";
import BottomTabs from "./BottomTabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailScreen from "../screens/HomeScreen/DetailScreen";
import FilterScreen from "../screens/HomeScreen/FilterScreen";
import SearchScreen from "../screens/BottomScreen/SearchScreen";
import Notification from "../screens/BottomScreen/Notification";
import Profile from "../screens/BottomScreen/Profile";
import TopCars from "../screens/BottomScreen/TopCars";
import RentCars from "../screens/HomeScreen/RentCars";
import MyBooking from "../screens/HomeScreen/MyBooking";
import BookingConfirmation from "../screens/HomeScreen/BookingConfirm/BookingConfirmation";
import Contract from "../screens/HomeScreen/Contract";
import MyInformation from "../screens/HomeScreen/ProfileScreen/MyInformation";
import MyAddress from "../screens/HomeScreen/ProfileScreen/MyAddress";
import UserBooking from "../screens/HomeScreen/ProfileScreen/UserBooking";
import RatingScreen from "../screens/HomeScreen/ProfileScreen/RatingScreen";
import ChangeLang from "../screens/HomeScreen/ProfileScreen/ChangeLang";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return(
  <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     <Stack.Screen name={SCREENS.HOME} component={BottomTabNavigation} />
     <Stack.Screen name={SCREENS.DETAIL_SCREEN} component={DetailScreen} />
     <Stack.Screen name={SCREENS.FILTER_SCREEN} component={FilterScreen} />
     <Stack.Screen name={SCREENS.RENT_CARS} component={RentCars} />
     <Stack.Screen name={SCREENS.MY_BOOKING} component={MyBooking} />
     <Stack.Screen name={SCREENS.BOOKING_CONFIRM} component={BookingConfirmation} />
     <Stack.Screen name={SCREENS.CONTRACT} component={Contract} />

     <Stack.Screen name={SCREENS.MY_INFORMATION} component={MyInformation} />
     <Stack.Screen name={SCREENS.MY_ADDRESS} component={MyAddress} />
     <Stack.Screen name={SCREENS.USER_BOOKING} component={UserBooking} />
     <Stack.Screen name={SCREENS.RATING} component={RatingScreen} />
     <Stack.Screen name={SCREENS.CHANGE_LANGUAGE} component={ChangeLang} />
     
    </Stack.Navigator>
)}

const BottomTabNavigation = (props: any) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      tabBar={(e: any) => <BottomTabs {...e} {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name={SCREENS.HOME} component={Home} />
      <Tab.Screen name={SCREENS.SEARCH_SCREEN} component={SearchScreen} />
      <Tab.Screen name={SCREENS.NOTIFICATION} component={Notification} />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
     <Stack.Screen name={SCREENS.TOP_CARS} component={TopCars} />

    </Tab.Navigator>
  );
};


export default AppNavigator;
