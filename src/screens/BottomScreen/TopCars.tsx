import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { useSelector } from "react-redux";
import { EJAR } from "../../constants/screens";
import { navigate } from "../../navigation/RootNavigation";

const TopCars = () => {
  const details = useSelector((state: any) => state?.appData?.homeData);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={EJAR.TOP_RATED_CARS} centerImg={false} />
      <FlatList
        data={details?.topRatedCars}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              navigate(SCREENS.DETAIL_SCREEN, {
                item: item,
              });
            }}
          >
            <View marginR-10 style={{}}>
              {/* <Image
                // source={item.icon}
                source={
                  item.Media?.url ? { uri: item.Media?.url } : IMAGES.truck
                }
                style={{ width: 100, height: 100, borderRadius: 10 }}
                resizeMode="contain"
              /> */}

              <View
                style={{
                  flex: 1,
                  marginBottom: 5,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={
                    item.Media?.carPicture?.[0]?.base64
                      ? { uri: item.Media?.carPicture?.[0]?.base64 }
                      : IMAGES.truck
                  }
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  resizeMode="cover"
                />
              </View>
              <Typography
                width={0}
                backgroundColor={"red"}
                textType="semiBold"
                size={theme.fontSize.medium}
              >
                {item?.carName}
              </Typography>
              {item?.rating && (
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
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ padding: 20 }}
      />
    </SafeAreaContainer>
  );
};

export default TopCars;
