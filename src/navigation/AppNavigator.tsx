// import React, { useState } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { SCREENS } from "../constants";
// import Home from "../screens/HomeScreen/Home";
// import DetailScreen from "../screens/HomeScreen/DetailScreen";
// import FilterScreen from "../screens/HomeScreen/FilterScreen";

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return(
//   <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name={SCREENS.HOME} component={Home} />
//       <Stack.Screen name={SCREENS.DETAIL_SCREEN} component={DetailScreen} />
//       <Stack.Screen name={SCREENS.FILTER_SCREEN} component={FilterScreen} />
  

     
//     </Stack.Navigator>
// )}

// export default AppNavigator;




import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from "../constants";
import Home from "../screens/HomeScreen/Home";
import BottomTabs from "./BottomTabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DetailScreen from "../screens/HomeScreen/DetailScreen";
import FilterScreen from "../screens/HomeScreen/FilterScreen";
import SearchScreen from "../screens/DraweScreen/SearchScreen";
import Notification from "../screens/DraweScreen/Notification";
import Profile from "../screens/DraweScreen/Profile";
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
    </Tab.Navigator>
  );
};


export default AppNavigator;
