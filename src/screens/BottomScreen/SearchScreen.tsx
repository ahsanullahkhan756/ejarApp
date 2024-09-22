import React from "react";
import { StyleSheet, Image } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { SearchBar } from "../../components/atoms/SearchBar";
import { scale } from "react-native-size-matters";

const SearchScreen = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Search" centerImg={false} />
      <View marginH-10>
        <SearchBar
          backgroundColor={theme.color.blue}
          widthContaner={scale(230)}
        />
      </View>
      <View marginH-20>
        <Image
          source={IMAGES.searchCompanies}
          style={{
            width: "100%",
            height: 250,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
