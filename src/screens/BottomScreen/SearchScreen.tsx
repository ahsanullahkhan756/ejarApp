import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { View, Text } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { SearchBar } from "../../components/atoms/SearchBar";
import { scale } from "react-native-size-matters";
import { commonStyles } from "../../containers/commStyles";
import { searchCompaniesApi } from "../../api/homeServices";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/slice/user";
import { COMMON_TEXT } from "../../constants/screens";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);
  const isLoading = useSelector((state) => state?.user?.isLoading);

  const handleSearchApi = async () => {
    dispatch(setIsLoading(true));
    try {
      const resp = await searchCompaniesApi();
      if (resp) {
        setCompanies(resp);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    handleSearchApi();
  }, []);

  const renderCompanyItem = ({ item }: any) => {
    const companyLogo = item.companyLogo?.base64
      ? { uri: item.companyLogo.base64 }
      : IMAGES.searchCompanies;

    return (
      <View style={commonStyles.cardWithShadow}>
        <Image
          source={companyLogo}
          style={styles.companyLogo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>{item?.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.SEARCH} centerImg={false} />
      <View marginH-10>
        <SearchBar
          backgroundColor={theme.color.blue}
          widthContaner={scale(230)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.color.primary} />
      ) : companies.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>{COMMON_TEXT.NO_ITEM_FOUND}</Text>
        </View>
      ) : (
        <FlatList
          data={companies}
          keyExtractor={(item) => item.ID}
          renderItem={renderCompanyItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  companyLogo: {
    width: 100,
    height: 100,
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
    color: theme.color.descColor,
    fontWeight: "bold",
  },
});

export default SearchScreen;
