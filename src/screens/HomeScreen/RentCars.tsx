import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { Card, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";
import { navigate } from "../../navigation/RootNavigation";
import { topRatedCar } from "../../api/homeServices";

const RentCars = () => {
  const [list, setList] = useState([]);
  const topRatedCarApi = async () => {
    try {
      const resp = await topRatedCar();
      if (resp?.Data != null) {
        setList(resp?.Data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    topRatedCarApi();
  }, []);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Car For Rent" centerImg={false} />
      <View flex>
        <FlatList
          data={list}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigate(SCREENS.DETAIL_SCREEN, {
                  item: item,
                })
              }
            >
              <Card
                style={{
                  marginVertical: 20,
                  elevation: 4,
                }}
              >
                <Image
                  source={{ uri: item?.Media?.carPicture?.[0]?.base64 }}
                  style={{
                    width: "100%",
                    height: 150,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                  resizeMode="cover"
                />
                <View padding-10>
                  <Typography size={theme.fontSize.small} textType="semiBold">
                    {item?.carName}
                  </Typography>
                </View>
                <View
                  style={[
                    commonStyles.lineBar,
                    {
                      width: "100%",
                      borderColor: theme.color.descColor,
                      borderWidth: 0.5,
                    },
                  ]}
                />
                <View row spread gap-10 padding-10>
                  <View row gap-5 style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGES.calendarIcon}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                    <Typography>{item?.model}</Typography>
                  </View>

                  <View row gap-5 style={{ alignItems: "center" }}>
                    <Image
                      source={IMAGES.gauge}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                    <Typography>{item?.mile} km</Typography>
                  </View>
                </View>

                <View row marginL-10 gap-5>
                  <Image
                    source={IMAGES.colorIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item?.color}</Typography>
                </View>

                <View
                  style={[
                    commonStyles.lineBar,
                    {
                      width: "100%",
                      borderColor: theme.color.descColor,
                      borderWidth: 0.5,
                    },
                  ]}
                />
                <View row spread marginH-15 marginV-10>
                  <Typography size={theme.fontSize.small} textType="semiBold">
                    Hourly Rate
                  </Typography>
                  <Typography size={theme.fontSize.small} textType="semiBold">
                    {`AED ${item?.rentalPrice ?? 0}/day`}
                  </Typography>
                </View>
                <View
                  style={[
                    commonStyles.lineBar,
                    {
                      width: "100%",
                      borderColor: theme.color.black,
                      borderWidth: 0.3,
                    },
                  ]}
                />
                <View row gap-5 margin-10 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.mapPin}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography numberOfLines={1}>
                    {item?.location ?? item?.description}
                  </Typography>
                </View>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginHorizontal: 20 }}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default RentCars;
