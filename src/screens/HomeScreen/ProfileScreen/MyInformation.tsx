import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import PersonalInfo from "../../../components/molecules/ProfileMol/PersonalInfo";
import ChangePassword from "../../../components/molecules/ProfileMol/ChangePassword";
import { theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import { COMMON_TEXT } from "../../../constants/screens";
import { useTranslation } from "../../../hooks/useTranslation";

const MyInformation = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.MY_INFORMATION} centerImg={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginH-20>
          <PersonalInfo />
        </View>
        <Button
          label={t(COMMON_TEXT.SAVE)}
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() => onBack()}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default MyInformation;
