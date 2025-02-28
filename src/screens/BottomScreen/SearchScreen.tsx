import React, { useEffect, useMemo, useState } from "react";
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
import { Typography } from "../../components/atoms/Typography";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState([]);
  const isLoading = useSelector((state) => state?.user?.isLoading);
  const [search, setSearch] = useState("");
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
      <View>
        <Image
          source={companyLogo}
          style={styles.companyLogo}
          resizeMode="cover"
        />
        <Typography
          numberOfLines={1}
          style={{
            textAlign: "center",
            marginBottom: 10,
            maxWidth: 110,
            marginRight: 1,
          }}
        >
          {item?.name}
        </Typography>
      </View>
    );
  };

  const filteredCompanies = useMemo(() => {
    const trimmedSearch = search?.trim()?.toLowerCase();
    return trimmedSearch
      ? companies.filter((company) =>
          company?.name?.toLowerCase().includes(trimmedSearch)
        )
      : companies;
  }, [search, companies]);
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.SEARCH} centerImg={false} />
      <View marginH-10>
        <SearchBar
          value={search}
          onChangeText={(text: string) => {
            setSearch(text);
          }}
          backgroundColor={theme.color.blue}
          hideFilter={true}
          widthContaner={scale(270)}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.color.primary} />
      ) : companies.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Typography style={styles.noResultsText}>
            {COMMON_TEXT.NO_ITEM_FOUND}
          </Typography>
        </View>
      ) : (
        <FlatList
          // data={
          //   search?.trim()
          //     ? companies.filter((company) =>
          //         company?.name.toLowerCase().includes(search.toLowerCase())
          //       )
          //     : companies
          // }
          data={filteredCompanies}
          numColumns={3}
          ListEmptyComponent={() => {
            return (
              <View style={styles.noResultsContainer}>
                <Typography style={styles.noResultsText}>
                  {COMMON_TEXT.NO_RESULTS}
                </Typography>
              </View>
            );
          }}
          keyExtractor={(item) => item?.ID}
          renderItem={renderCompanyItem}
          contentContainerStyle={{
            alignSelf: "center",
          }}
        />
      )}
    </SafeAreaContainer>
  );
};

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

export default SearchScreen;
