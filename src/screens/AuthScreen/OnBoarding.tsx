import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { View } from "react-native-ui-lib";
import { OnBoardingTamplet } from "../../components/templates";
import { ONBOARDING_DATA } from "../../containers/dummy";
import { OnBeardingBottomBtn } from "../../components/atoms/OnBeardingBottomBtn";

const { width } = Dimensions.get("window");

const OnBoarding = () => {
  const renderItem = ({ item }: any) => {
    return (
      <OnBoardingTamplet
        image={item.image}
        title={item.title}
        description={item.description}
      />
    );
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <FlatList
          data={ONBOARDING_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          pagingEnabled
        />
      <OnBeardingBottomBtn />

      </View>


    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnBoarding;
