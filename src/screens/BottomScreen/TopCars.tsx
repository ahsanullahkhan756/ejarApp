import React from "react";
import { FlatList, Image } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { useSelector } from "react-redux";
import { EJAR } from "../../constants/screens";

const TopCars = () => {
  const details = useSelector((state: any) => state?.appData?.homeData);
  console.log("Top Rated", details?.topRatedCars);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={EJAR.TOP_RATED_CARS} centerImg={false} />
      <FlatList
        data={details?.topRatedCars}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View marginR-10 style={{}}>
            <Image
              // source={item.icon}
              source={
                item.Media?.url
                  ? { uri: item.Media?.url }
                  : IMAGES.truck
              }

              style={{ width: 100, height: 100, borderRadius: 10 }}
              resizeMode="contain"
            />
            <Typography width={0} backgroundColor={"red"} textType="semiBold" size={theme.fontSize.medium}>
              {item?.carName}
            </Typography>
            <View row gap-5 style={{ alignItems: "center" }}>
              <Image
                source={IMAGES.starIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Typography textType="semiBold" size={theme.fontSize.medium}>
               {item?.rating}
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
