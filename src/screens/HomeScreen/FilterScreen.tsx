import React from "react";
import { View, StyleSheet, Image } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { scale } from "react-native-size-matters";
import { SearchBar } from "../../components/atoms/SearchBar";
import { Header } from "../../components/atoms/Header";

const FilterScreen = () => {
  return (
    <SafeAreaContainer safeArea={false}>
    <View style={styles.container}>
       <Header titleText="Filters" centerImg={false}/>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
 
  },
});

export default FilterScreen;




