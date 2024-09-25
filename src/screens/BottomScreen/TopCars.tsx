import React from "react";
import { FlatList, Image } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";

const TopCars = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Top Rated Cars" centerImg={false} />
      <FlatList
        data={data.categories}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View marginR-20 style={{}}>
            <Image
              source={item.icon}
              style={{ width: 100, height: 100, borderRadius: 10 }}
              resizeMode="contain"
            />
            <Typography textType="semiBold" size={theme.fontSize.medium}>
              Rolem Ipsum
            </Typography>
            <View row gap-5 style={{ alignItems: "center" }}>
              <Image
                source={IMAGES.starIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Typography textType="semiBold" size={theme.fontSize.medium}>
                4.9
              </Typography>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ padding: 20 }}
      />
    </SafeAreaContainer>
  );
};

export default TopCars;
