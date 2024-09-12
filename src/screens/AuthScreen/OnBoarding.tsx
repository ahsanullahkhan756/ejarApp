import React, { useState, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { OnBoardingTamplet } from "../../components/templates";
import { ONBOARDING_DATA } from "../../containers/dummy";
import { OnBeardingBottomBtn } from "../../components/atoms/OnBeardingBottomBtn";
import { View } from "react-native-ui-lib";
import { navigate } from "../../navigation/RootNavigation";
import { SCREENS } from "../../constants";

const { width } = Dimensions.get("window");

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const renderItem = ({ item }: any) => {
    return (
      <OnBoardingTamplet
        image={item.image}
        title={item.title}
        description={item.description}
      />
    );
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < ONBOARDING_DATA.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      const lastInd = currentIndex;
      if(lastInd == currentIndex){
        navigate(SCREENS.LOGIN)
      }
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          pagingEnabled
          onScrollToIndexFailed={() => {}}
          onScroll={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />
        <OnBeardingBottomBtn onPress={handleNext} />
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
