import React, {useEffect, useState} from 'react';
import {navigationRef} from './RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../containers/Splash';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';
import MyBooking from '../screens/HomeScreen/MyBooking';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoadings] = useState(true);
  const {isLoggedIn} = useSelector((state: any) => state.user);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadings(false);
    }, 3000);
  }, []);

  return isloading ? (
    <Splash />
  ) : (
    <>
      <NavigationContainer ref={navigationRef}>
        {/* {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />} */}
        <MyBooking />
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
