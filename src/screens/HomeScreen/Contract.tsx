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
import {
  navigate,
  onBack,
  replace,
  reset,
} from "../../navigation/RootNavigation";
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
      dispatch(setIsLoading(true));
      const data = {
        bookingData: {
          BookCarId: item?.ID,
          CarOwnerId: item?.createdBy,
          StartDate: startEndDates?.start,
          EndDate: startEndDates?.end ?? startEndDates?.start,
          PerDayPayment: item?.rentalPrice,
          Payable: totalPrice,
          ContractSignature: {
            base64: "https://placehold.co/400",
            fileName: "contract-signature.png",
          },
        },
        paymentData: {
          amount: totalPrice,
          toID: item?.createdBy,
          card_secret: card?.id,
        },
      };

      console.log(data);

      const resp = await confirmBooking(data);
      if (resp?.result != null) {
        setModalVisible(true);
      }
      dispatch(setIsLoading(false));
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getConditions();
  }, []);

  const PERSONAL_DATA = [
    { title: "First Name:", subTitle: userDetails?.firstName },
    { title: "Last Name:", subTitle: userDetails?.lastName },
    { title: "Car Name:", subTitle: item?.carName },
    { title: "Email:", subTitle: item?.email },
    { title: "Nationality:", subTitle: item?.nationality },
    { title: "Address:", subTitle: item?.address },
    { title: "Date of birth:", subTitle: item?.dob },
    { title: "Passport Id:", subTitle: item?.passportId },
    { title: "VIN:", subTitle: item?.vin },
    { title: "Plate Number:", subTitle: item?.numberPlate },
    { title: "Total Amount:", subTitle: totalPrice + " AED" },
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
              <View row spread marginB-2>
                <Typography style={{ flex: 1 }}>{i.title}</Typography>
                <Typography style={{ flex: 1 }}>{i.subTitle}</Typography>
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

        <Typography>Note: I agree to all the conditions above.</Typography>

        <Button
          label="Pay"
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
                replace(SCREENS.USER_BOOKING, {
                  isFormBooking: true,
                });
              }}
            />
            <Button
              label="Back to Home"
              backgroundColor={theme.color.blue}
              borderRadius={30}
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                reset(SCREENS.HOME);
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
    fontSize: 10,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Contract;
