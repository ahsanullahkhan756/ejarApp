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
import { SCREENS, VARIABLES } from "../../../constants";
import { getBookingsListApi } from "../../../api/homeServices";
import { COMMON_TEXT } from "../../../constants/screens";

const UserBooking = ({ route }: any) => {
  const isFromBooking = route?.params?.isFormBooking;
  const [activeTab, setActiveTab] = useState(VARIABLES.ACTIVE);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

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
      case VARIABLES.ACTIVE:
        return (
          <ActiveBooking
            data={data}
            onSubmit={() => {
              setActiveTab(VARIABLES.ACTIVE);
            }}
          />
        );

      case VARIABLES.UPCOMING:
        return (
          <ActiveBooking
            data={data}
            onSubmit={() => {
              setActiveTab(VARIABLES.UPCOMING);
            }}
          />
        );

      case VARIABLES.COMPLETED:
        return (
          <CompletedBooking
            data={data}
            onSubmit={() => {
              setActiveTab(VARIABLES.COMPLETED);
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
        titleText={COMMON_TEXT.MY_RENTINGS}
        centerImg={false}
      />
      <View paddingH-10>
        <View center marginV-20>
          <TabList
            isFrombookList={true}
            data={[
              {
                id: 1,
                name: COMMON_TEXT.ACTIVE,
                label: VARIABLES.ACTIVE,
              },
              {
                id: 2,
                name: VARIABLES.UPCOMING,
                label: VARIABLES.UPCOMING,
              },
              {
                id: 3,
                name: VARIABLES.COMPLETED,
                label: VARIABLES.COMPLETED,
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
