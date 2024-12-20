import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { navigate, onBack } from "../../navigation/RootNavigation";
import SignatureView from "react-native-signature-canvas";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { commonStyles } from "../../containers/commStyles";
import { useDispatch, useSelector } from "react-redux";
import { confirmBooking, getContractByOwnerId } from "../../api/homeServices";
import { setIsLoading } from "../../redux/slice/user";

const Contract = ({ route }) => {
  const startEndDates = route?.params?.startEndDates;
  const item = route?.params?.item;
  const selectedDates = route?.params?.selectedDates;
  const daysInRange = route?.params?.daysInRange;
  const card = route?.params?.card;
  const totalPrice = route?.params?.totalPrice;
  const userDetails = useSelector((state) => state.user?.userDetails);
  const dispatch = useDispatch();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const handleSignature = (signature: any) => {
    setIsSigned(true);
  };

  const [contractData, setContractData] = useState(null);
  const getConditions = async () => {
    try {
      const resp = await getContractByOwnerId(item?.createdBy);
      if (resp != null) {
        setContractData(resp);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const acknowledgement = async () => {
    try {
      const data = {
        bookingData: {
          BookCarId: item?.ID,
          CarOwnerId: item?.createdBy,
          StartDate: startEndDates?.start,
          EndDate: startEndDates?.end,
          PerDayPayment: 100,
          Payable: 300,
          ContractSignature: {
            base64: "https://placehold.co/400",
            fileName: "contract-signature.png",
          },
        },
        paymentData: {
          amount: 300,
          toID: item?.createdBy,
          card_secret: card?.id,
        },
      };

      console.log(data);

      const resp = await confirmBooking(data);
      if (resp != null) {
        console.log("booking hogai");
        console.log("booking hogai");
        console.log("booking hogai");
        console.log("booking hogai");
        console.log(resp);
        console.log("booking hogai");
        console.log("booking hogai");

        console.log("booking hogai");
      }
      dispatch(setIsLoading(false));

      // setModalVisible(true)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getConditions();
  }, []);

  const PERSONAL_DATA = [
    { title: "First Name:", subTitle: userDetails?.firstName },
    { title: "Last Name:", subTitle: userDetails?.lastName },
    { title: "VIN:", subTitle: item?.vin },
    { title: "Plate Number:", subTitle: item?.numberPlate },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <Header titleText="Contract" centerImg={false} />
      </View>

      {/* ScrollView only contains text */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View padding-20>
          {PERSONAL_DATA.map((i) => {
            return (
              <View row spread marginB-10>
                <Typography style={{ flex: 1 }}>{i.title}</Typography>
                <Typography style={{ flex: 1, textTransform: "capitalize" }}>
                  {i.subTitle}
                </Typography>
                <View />
              </View>
            );
          })}
          <Typography color={theme.color.descColor} size={theme.fontSize.small}>
            {contractData?.ContractDetail}
          </Typography>
        </View>
      </ScrollView>

      {/* Signature and Button fixed at the bottom */}
      <View style={styles.fixedBottomContainer}>
        <ScrollView scrollEnabled={scrollEnabled}>
          <View style={{ height: 250 }}>
            <SignatureView
              // onOK={handleSignature}
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => {
                setScrollEnabled(true);
                handleSignature();
              }}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              imageType="image/jpeg"
            />
          </View>
        </ScrollView>

        <View
          style={[
            commonStyles.lineBar,
            {
              width: "100%",
              marginVertical: 20,
              borderColor: theme.color.descColor,
              borderWidth: 0.3,
            },
          ]}
        />
        <Typography align="center">Signature</Typography>

        {/* Acknowledged Button */}
        <Button
          label="Acknowledged"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          style={styles.button}
          disabled={!isSigned} // Disable the button until signature is done
          onPress={() => {
            acknowledgement();
          }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={[
            commonStyles.centerView,
            {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          ]}
        >
          <View style={commonStyles.modalStyle}>
            <Image
              source={IMAGES.bookingImg}
              resizeMode="contain"
              style={{ width: 200, height: 200 }}
            />
            <Button
              label="View My Renting"
              backgroundColor={theme.color.primary}
              borderRadius={30}
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                navigate(SCREENS.USER_BOOKING);
              }}
            />
            <Button
              label="Back to Home"
              backgroundColor={theme.color.blue}
              borderRadius={30}
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                navigate(SCREENS.HOME);
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    flex: 1, // The text content is scrollable
  },
  fixedBottomContainer: {
    padding: 20,
    backgroundColor: theme.color.white,
  },
  button: {
    height: 50,
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Contract;
