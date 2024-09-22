import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { commonStyles } from "../../containers/commStyles";

const SearchScreen = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <View marginH-20 marginV-10>
        <Header title={"Notifications"} />
      </View>

      <View style={commonStyles.footerContainer}>
        {/* <NotificatonList /> */}
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
