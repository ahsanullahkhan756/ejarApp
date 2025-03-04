import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, SCREENS, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { data } from "../../containers/dummy";
import { Card, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";
import { navigate } from "../../navigation/RootNavigation";
import { carsByCategory, topRatedCar } from "../../api/homeServices";
import { useTranslation } from "../../hooks/useTranslation";
import { COMMON_TEXT, EJAR } from "../../constants/screens";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/slice/user";

const RentCarsCategories = ({ route }) => {
  const data = route?.params?.item;
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const { t } = useTranslation();
  const Api = async () => {
    try {
      dispatch(setIsLoading(true));
      const resp = await carsByCategory(data?.ID);
      if (resp != null) {
        setList(resp);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    Api();
  }, []);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={data?.name} centerImg={false} />
      <View flex>
        <FlatList
          data={list}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View style={styles.noResultsContainer}>
                <Typography style={styles.noResultsText}>
                  {COMMON_TEXT.NO_RESULTS}
                </Typography>
              </View>
            );
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
              }}
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
                  source={
                    item?.Media?.carPicture?.[0]?.base64
                      ? { uri: item?.Media?.carPicture?.[0]?.base64 }
                      : IMAGES.truck
                  }
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
                    <Typography>{item?.mile + " km"}</Typography>
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
                    {COMMON_TEXT.PRICE}
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
          // contentContainerStyle={{ marginHorizontal: 20 }}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default RentCarsCategories;

const styles = StyleSheet.create({
  companyLogo: {
    width: 100,
    height: 70,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  companyName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: theme.color.primary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    lineHeight: 40,
    color: theme.color.descColor,
    fontWeight: "bold",
  },
});
