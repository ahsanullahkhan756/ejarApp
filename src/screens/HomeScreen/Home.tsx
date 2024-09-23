import React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { scale } from "react-native-size-matters";
import { SearchBar } from "../../components/atoms/SearchBar";
import { data } from "../../containers/dummy";
import { Typography } from "../../components/atoms/Typography";
import { Button, Card, View } from "react-native-ui-lib";
import { commonStyles } from "../../containers/commStyles";
import { navigate } from "../../navigation/RootNavigation";
import { TopCarsComp } from "../../components/atoms/TopCarsComp";
import { RentCarsComp } from "../../components/atoms/RentCarsComp";

const Home = () => {
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
        <View marginV-20 paddingH-20>
          <FlatList
            data={data.categories}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View marginR-20 style={{ alignItems: "center" }}>
                <Image
                  source={item.icon}
                  style={{ width: 70, height: 70, borderRadius: 10 }}
                  resizeMode="contain"
                />
                <Typography size={theme.fontSize.extraSmall12}>
                  {item.name}
                </Typography>
              </View>
            )}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ marginBottom: 10 }}
          />

          <Image
            source={IMAGES.slider}
            style={{ width: 70, height: 5, alignSelf: "center" }}
            resizeMode="contain"
          />

          {/* Cars for Rent Section */}
          <Typography
            align="center"
            size={theme.fontSize.large}
            textType="bold"
            style={{ marginVertical: 20 }}
          >
            Car For Rent
          </Typography>
          <RentCarsComp />
          <RentCarsComp />
          <TouchableOpacity onPress={() => navigate(SCREENS.RENT_CARS)}> 
            <Image
              source={IMAGES.viewAll}
              style={{
                width: scale(100),
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
                width: scale(100),
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
            source={IMAGES.slider}
            style={{ width: 70, height: 5, alignSelf: "center" }}
            resizeMode="contain"
          />

          <View style={commonStyles.lineBar} />
          <Typography
            size={theme.fontSize.large}
            color={theme.color.blue}
            textType="bold"
          >
            Reviews
          </Typography>
          <View row spread>
            <Typography>Rolem Ipsum</Typography>
            <Image
              source={IMAGES.colun}
              style={{ width: 70, height: 20, alignSelf: "center" }}
              resizeMode="contain"
            />
          </View>
          <Typography>⭐ 4.9</Typography>
          <Typography color={theme.color.descColor}>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua”.
          </Typography>
          <Image
            source={IMAGES.slider}
            style={{ width: 70, height: 5, alignSelf: "center" }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.color.blue,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default Home;
