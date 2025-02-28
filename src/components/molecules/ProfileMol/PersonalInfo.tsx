import React, { useState } from "react";
import { FlatList } from "react-native";
import { theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";
import { Button, View } from "react-native-ui-lib";
import { commonStyles } from "../../../containers/commStyles";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../../hooks/useTranslation";
import { COMMON_TEXT } from "../../../constants/screens";
import { onBack } from "../../../navigation/RootNavigation";
import { updateProfile } from "../../../api/auth";
import { InputText } from "../../atoms/InputText";
import { setUserDetails } from "../../../redux/slice/user";
import { showToast } from "../../../utils/toast";

const PersonalInfo = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state?.user?.userDetails);
  const ID = useSelector((state) => state?.user?.userDetails?.ID);
  const [firstname, setFirstname] = useState(userdata?.firstName);
  const [phoneNumber, setPhoneNumber] = useState(userdata?.phone);
  const [lastname, setLastname] = useState(userdata?.lastName);
  const [email, setEmail] = useState(userdata?.email);
  // const DATA = [
  //   {
  //     id: 1,
  //     title: userdata?.firstName,
  //   },
  //   {
  //     id: 2,
  //     title: userdata?.email,
  //   },
  //   {
  //     id: 3,
  //     title: userdata?.phone,
  //   },
  // ];

  // const _renderItem = ({ item, index }: any) => {
  //   return (
  //
  //       <Typography color={theme.color.descColor}>{item.title}</Typography>
  //     </View>
  //  <InputText
  //         label={COMMON_TEXT.ID_NUMBER}
  //         value={idCardNumber}
  //         onValidationFailed={(isValid: boolean) => {
  //           setValidated((prev) => {
  //             let copy = [...prev];
  //             return copy;
  //           });
  //         }}
  //         maxLength={15}
  //         keyboardType={"numeric"}
  //         placeholder="*** **** ******* *"
  //         onChangeText={(text: string) => setIdCardNumber(text)}
  //       />
  //   );
  // };

  return (
    <>
      {/* <FlatList
        data={DATA}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Typography textType="bold">
            {COMMON_TEXT.PERSONAL_DETAILS}
          </Typography>
        }
      /> */}

      <InputText
        label={t(COMMON_TEXT.FIRST_NAME)}
        value={firstname}
        maxLength={25}
        // keyboardType={"numeric"}
        placeholder={t(COMMON_TEXT.FIRST_NAME)}
        onChangeText={(text: string) => setFirstname(text)}
      />

      <InputText
        label={t(COMMON_TEXT.LAST_NAME)}
        value={lastname}
        maxLength={25}
        // keyboardType={"numeric"}
        placeholder={t(COMMON_TEXT.LAST_NAME)}
        onChangeText={(text: string) => setLastname(text)}
      />

      <InputText
        label={t(COMMON_TEXT.PHONE_NUMBER)}
        value={phoneNumber}
        maxLength={25}
        keyboardType={"numeric"}
        placeholder={t(COMMON_TEXT.PHONE_NUMBER)}
        onChangeText={(text: string) => setPhoneNumber(text)}
      />

      <InputText
        label={t(COMMON_TEXT.EMAIL)}
        value={email}
        maxLength={25}
        editable={false}
        // keyboardType={"numeric"}
        placeholder={t(COMMON_TEXT.EMAIL)}
        onChangeText={(text: string) => setEmail(text)}
      />

      <Button
        label={t(COMMON_TEXT.SAVE)}
        backgroundColor={theme.color.primary}
        borderRadius={30}
        onPress={async () => {
          const data = {
            ID: ID,
            firstName: firstname,
            lastName: lastname,
            phone: phoneNumber,
          };
          const res = await updateProfile({ data });
          if (res != null) {
            dispatch(setUserDetails(res));
            onBack();
          }
        }}
        style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
      />
    </>
  );
};

export default PersonalInfo;
