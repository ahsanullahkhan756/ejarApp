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
import { COMMON_TEXT, EJAR } from "../../constants/screens";
import { useTranslation } from "../../hooks/useTranslation";
import { sendPicturetoS3 } from "../../services/axios";
import { showToast } from "../../utils/toast";
var RNFS = require("react-native-fs");

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
  const { t } = useTranslation();

  const handleSignature = () => {
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
    if (!signature) {
      return;
    }
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
            base64: signature,
            fileName: "contract-signature.png",
          },
        },
        paymentData: {
          amount: totalPrice,
          toID: item?.createdBy,
          card_secret: card?.id,
        },
      };
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
    { title: COMMON_TEXT.FIRST_NAME, subTitle: userDetails?.firstName },
    { title: COMMON_TEXT.LAST_NAME, subTitle: userDetails?.lastName },
    { title: EJAR.CAR_NAME, subTitle: item?.carName },
    { title: COMMON_TEXT.EMAIL, subTitle: userDetails?.email },
    { title: COMMON_TEXT.NATIONALITY, subTitle: userDetails?.nationality },
    { title: COMMON_TEXT.ADDRESS, subTitle: userDetails?.address },
    { title: COMMON_TEXT.DATE_OF_BIRTH, subTitle: userDetails?.dob },
    {
      title: COMMON_TEXT.PASSPORT_NUMBER,
      subTitle: userDetails?.passportNumber,
    },
    { title: EJAR.VIN, subTitle: item?.vin },
    { title: EJAR.PLATE_NUMBER, subTitle: item?.numberPlate },
    { title: COMMON_TEXT.TOTAL_AMOUNT, subTitle: totalPrice + " AED" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [signature, setSignature] = useState("");
  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <Header titleText={COMMON_TEXT.CONTRACT} centerImg={false} />
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
        {!isSigned && (
          <Button
            label={t(COMMON_TEXT.SIGNATURE)}
            backgroundColor={theme.color.primary}
            borderRadius={30}
            style={styles.button}
            onPress={() => {
              setIsSigned(true);
            }}
          />
        )}
      </ScrollView>

      {/* Signature and Button fixed at the bottom */}
      {isSigned && (
        <View style={styles.fixedBottomContainer}>
          <View style={{ height: 350 }}>
            <SignatureView
              // onOK={handleSignature}
              onBegin={() => setScrollEnabled(false)}
              onEnd={() => {
                setScrollEnabled(true);
                // handleSignature();
              }}
              onOK={async (img) => {
                try {
                  if (img) {
                    const str = `signature-booking-id-${Date.now()}`;
                    const path = `${
                      RNFS.DocumentDirectoryPath + "/" + str
                    }.png`;
                    console.log("path -- ", path);
                    await RNFS.writeFile(
                      path,
                      img.replace("data:image/png;base64,", ""),
                      "base64"
                    );
                    if (path) {
                      const response = await sendPicturetoS3({
                        mime: "image/jpeg",
                        path: path,
                      });
                      if (response) {
                        setSignature(response);
                      }
                    }
                  }
                } catch (error) {
                  showToast({ title: "Error Uploading Signature" });
                }
              }}
              descriptionText="Signature"
              clearText="Clear"
              onClear={() => {
                setSignature("");
              }}
              confirmText="Save"
              imageType="image/jpeg"
            />
          </View>

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
          <Typography align="center">{COMMON_TEXT.SIGNATURE}</Typography>

          <Typography>{EJAR.AGREE_TO_ALL_CONDITIONS}</Typography>

          <Button
            label={t(COMMON_TEXT.PAY)}
            backgroundColor={theme.color.primary}
            borderRadius={30}
            style={styles.button}
            disabled={!signature} // Disable the button until signature is done
            onPress={() => {
              acknowledgement();
            }}
          />
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => setModalVisible(false)}
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
              label={t(EJAR.VIEW_MY_EARNINGS)}
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
              label={t(COMMON_TEXT.BACK_TO_HOME)}
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
