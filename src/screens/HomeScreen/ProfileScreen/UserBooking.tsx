import React, { useState } from "react";
import {
  StyleSheet,
} from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { useNavigation } from "@react-navigation/native";
import TabList from "../../../components/atoms/TabList";
import ActiveBooking from "../../../components/molecules/MyBookingComp/ActiveBooking";
import UpcomingBooking from "../../../components/molecules/MyBookingComp/UpcomingBooking";
import CompletedBooking from "../../../components/molecules/MyBookingComp/CompletedBooking";

const UserBooking = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigation = useNavigation();
  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <ActiveBooking
            onSubmit={() => {
              setActiveTab(1);
            }}
          />
        );

      case 1:
        return (
          // <UpcomingBooking
          //   onSubmit={() => {
          //     setActiveTab(2);
          //   }}
          // />

          <ActiveBooking
            onSubmit={() => {
              setActiveTab(1);
            }}
          />
        );

      case 2:
        return (
          <CompletedBooking
            onSubmit={() => {
              setActiveTab(3);
            }}
          />
        );

      default:
        break;
    }
  };
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"My Booking"} centerImg={false} />
      <View paddingH-10>

      <View center marginV-20>
          <TabList
            data={[
              {
                id: 1,
                label: "Active",
              },
              {
                id: 2,
                label: "Upcoming",
              },
              {
                id: 3,
                label: "Completed",
              },
            ]}
            onSelect={setActiveTab}
            selected={activeTab}
          />
        </View>
        <View>{renderTab()}</View>

      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default UserBooking;
