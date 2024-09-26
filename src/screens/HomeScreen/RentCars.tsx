import React from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { Card, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";
import { navigate } from "../../navigation/RootNavigation";

const RentCars = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Car For Rent" centerImg={false} />
      <View flex>
        <FlatList
          data={data.carsForRent}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigate(SCREENS.DETAIL_SCREEN,{
              item : item.img
            })}>
            <Card
              style={{
                marginVertical: 20,
                elevation: 4,
              }}
            >
              <Image
                source={item.img}
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
                  {item.name}
                </Typography>
              </View>
              <View row spread gap-10 padding-10>
                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.calendarIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.date}</Typography>
                </View>

                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.colorIcon}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.color}</Typography>
                </View>

                <View row gap-5 style={{ alignItems: "center" }}>
                  <Image
                    source={IMAGES.automatic}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Typography>{item.status}</Typography>
                </View>
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
                  {item.price}
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
                <Typography>Jumeirah, Dubai</Typography>
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
