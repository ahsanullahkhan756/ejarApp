import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import TabList from "../../../components/atoms/TabList";
import ActiveBooking from "../../../components/molecules/MyBookingComp/ActiveBooking";
import CompletedBooking from "../../../components/molecules/MyBookingComp/CompletedBooking";
import { onBack, reset } from "../../../navigation/RootNavigation";
import { SCREENS } from "../../../constants";
import { getBookingsListApi } from "../../../api/homeServices";

const UserBooking = ({ route }: any) => {
  const isFromBooking = route?.params?.isFormBooking;
  const [activeTab, setActiveTab] = useState("Active");
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused()

  useEffect(() => {
    const getBookingsList = async () => {
      try {
        const response = await getBookingsListApi(activeTab);
        if (response?.Data) {
          setData(response?.Data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBookingsList();
    const onBackPress = () => {
      if (isFromBooking) {
        reset(SCREENS.HOME);
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", () => onBackPress());
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () => onBackPress());
    };
    // }, [isFocused]);
  }, [activeTab, isFocused]);

  const renderTab = () => {
    switch (activeTab) {
      case "Active":
        return (
          <ActiveBooking
            data={data}
            onSubmit={() => {
              setActiveTab("Active");
            }}
          />
        );

      case "Upcoming":
        return (
          <ActiveBooking
            data={data}
            onSubmit={() => {
              setActiveTab("Upcoming");
            }}
          />
        );

      case "Completed":
        return (
          <CompletedBooking
            data={data}
            onSubmit={() => {
              setActiveTab("Completed");
            }}
          />
        );

      default:
        break;
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header
        onPressLeft={() => {
          if (isFromBooking) {
            reset(SCREENS.HOME);
          } else {
            onBack();
          }
        }}
        titleText={"My Renting"}
        centerImg={false}
      />
      <View paddingH-10>
        <View center marginV-20>
          <TabList
            isFrombookList={true}
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
