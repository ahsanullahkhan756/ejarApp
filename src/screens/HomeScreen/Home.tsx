import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, SCREEN_WIDTH, theme } from "../../constants";
import { scale } from "react-native-size-matters";
import { SearchBar } from "../../components/atoms/SearchBar";
import { data } from "../../containers/dummy";
import { Typography } from "../../components/atoms/Typography";
import { Button, Card, Carousel, View } from "react-native-ui-lib";
import { commonStyles } from "../../containers/commStyles";
import { navigate } from "../../navigation/RootNavigation";
import { TopCarsComp } from "../../components/atoms/TopCarsComp";
import { RentCarsComp } from "../../components/atoms/RentCarsComp";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData, setHomeData } from "../../redux/slice/appData";
import { setIsLoading } from "../../redux/slice/user";
import { getHomeApi, topRatedCar } from "../../api/homeServices";
import { getFCMToken } from "../../api/auth.js";

const Home = () => {
  const dispatch = useDispatch();
  const details = useSelector((state: any) => state?.appData?.homeData);
  const filterData = useSelector((state: any) => state?.appData?.filterData);
  const [rentCars, setRentCars] = useState([]);
  const getUser = async () => {
    try {
      const resp = await getHomeApi();
      if (resp) {
        dispatch(setFilterData([]));
        console.log("homeData", resp);
        dispatch(setHomeData(resp));
        setRentCars(resp?.cars);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const topRatedCarApi = async () => {
  //   try {
  //     const resp = await topRatedCar();
  //     if (resp) {
  //       dispatch(setHomeData(resp));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    dispatch(setIsLoading(false));
    // topRatedCarApi();
  }, []);

  useEffect(() => {
    if (filterData != null) {
      setRentCars(filterData);
    } else {
      getUser();
    }
  }, [filterData]);

  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={IMAGES.logo}
            style={{
              width: scale(100),
              height: 60,
              tintColor: theme.color.white,
            }}
            resizeMode="contain"
          />
          <SearchBar />
        </View>
        <View padding-20>
          <Swiper
            style={{ height: 270 }}
            dotStyle={[
              styles.dotStyle,
              { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
            ]}
            activeDotStyle={styles.dotStyle}
          >
            {/* Categories Carousel */}
            <FlatList
              data={data.categories}
              numColumns={4}
              // scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  marginH-15
                  style={{ alignItems: "center", marginLeft: -2 }}
                >
                  <Image
                    source={
                      item.image?.url ? { uri: item.image?.url } : IMAGES.truck
                    }
                    style={{
                      width: SCREEN_WIDTH * 0.2,
                      height: 80,
                      borderRadius: 10,
                    }}
                    resizeMode='stretch'
                  />
                  <Typography size={theme.fontSize.extraSmall12}>
                    {item.name || "SUVs"}
                  </Typography>
                </View>
              )}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ marginBottom: 10 }}
            />
          </Swiper>

          <Typography
            align="center"
            size={theme.fontSize.large}
            textType="bold"
            style={{ marginBottom: 10 }}
          >
            Car For Rent
          </Typography>

          {/* CAR FOR RENT  */}
          <FlatList
            data={rentCars}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigate(SCREENS.RENT_CARS)}>
                  <Card
                    style={{
                      marginRight: 10,
                      flex: 1,
                      elevation: 4,
                    }}
                  >
                    <Image
                      source={
                        item.Media?.url
                          ? { uri: item.Media?.url }
                          : IMAGES.truck
                      }
                      style={{
                        width: "100%",
                        height: 120,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                      resizeMode="cover"
                    />

                    <View row spread padding-10>
                      <Typography
                        size={theme.fontSize.small}
                        textType="semiBold"
                      >
                        {`${item?.model} ${item?.carName}`}
                      </Typography>
                      <Typography
                        size={theme.fontSize.small}
                        textType="semiBold"
                      >
                        {item?.rentalPrice}
                      </Typography>
                    </View>
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
                          source={IMAGES.colorIcon}
                          style={{ width: 20, height: 20 }}
                          resizeMode="contain"
                        />
                        <Typography>{item?.color}</Typography>
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
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ marginBottom: 16 }}
          />

          <TouchableOpacity onPress={() => navigate(SCREENS.RENT_CARS)}>
            <Image
              source={IMAGES.viewAll}
              style={{
                width: scale(60),
                height: 30,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Typography
            align="center"
            size={theme.fontSize.large}
            textType="bold"
            style={{ marginVertical: 20 }}
          >
            Top Rated Cars
          </Typography>
          <TopCarsComp />

          <TouchableOpacity
            onPress={() => navigate(SCREENS.TOP_CARS)}
            style={{ marginVertical: 10 }}
          >
            <Image
              source={IMAGES.viewAll}
              style={{
                width: scale(60),
                height: 30,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={commonStyles.lineBar} />
          <Typography
            size={theme.fontSize.large}
            color={theme.color.blue}
            textType="bold"
          >
            Top Rated Companies
          </Typography>

          <Swiper
            style={{ height: 150 }}
            dotStyle={[
              styles.dotStyle,
              { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
            ]}
            activeDotStyle={styles.dotStyle}
          >
            <Image
              source={IMAGES.compaines}
              style={{
                width: "100%",
                height: 100,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />

            <Image
              source={IMAGES.compaines}
              style={{
                width: "100%",
                height: 100,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />

            <Image
              source={IMAGES.compaines}
              style={{
                width: "100%",
                height: 100,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </Swiper>

          <View style={commonStyles.lineBar} />
          <View row spread>
            <Typography
              size={theme.fontSize.large}
              color={theme.color.blue}
              textType="bold"
            >
              Reviews
            </Typography>
            <Image
              source={IMAGES.colun}
              style={{ width: 70, height: 20, alignSelf: "center" }}
              resizeMode="contain"
            />
          </View>

          <View row>
            {details?.rating ? (
              <>
                <Image
                  source={IMAGES.starIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
                <Typography>{details?.rating}</Typography>
              </>
            ) : null}
          </View>

          <Swiper
            style={{ height: 150 }}
            dotStyle={[
              styles.dotStyle,
              { backgroundColor: "rgba(0,0,0,.5)", width: 20 },
            ]}
            activeDotStyle={styles.dotStyle}
          >
            <Typography>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua”.
            </Typography>
          </Swiper>

          <TouchableOpacity
            style={{ marginVertical: 20 }}
            onPress={() => navigate(SCREENS.VIEW_REVIEWS)}
          >
            <Image
              source={IMAGES.viewAll}
              style={{
                width: scale(60),
                height: 30,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "ios" ? 20 : 50,
    paddingHorizontal: 20,
    backgroundColor: theme.color.blue,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dotStyle: {
    backgroundColor: theme.color.primary,
    width: 50,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default Home;
