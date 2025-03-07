import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { navigate } from "../../navigation/RootNavigation";
import { SCREENS } from "../../constants";


const chunkArray = (arr, size) => {
    return arr?.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size));
        return acc;
    }, []);
};

const MAX_SLIDES = 3;
const ITEMS_PER_SLIDE = 6;

const CompanySlider = ({ items = [] }) => {
    const chunks = chunkArray(items, ITEMS_PER_SLIDE).slice(0, MAX_SLIDES);

    return (
        <Swiper
            style={{ height: 150 }}
            dotStyle={{
                backgroundColor: "rgba(0,0,0,.5)",
                width: 20,
            }}
            activeDotStyle={{
                backgroundColor: "#fff",
            }}
        >
            {chunks.map((chunk, index) => (
                <View key={index} style={{ flex: 1, justifyContent: "center", }}>
                    <FlatList
                        data={chunk}
                        keyExtractor={(item) => item.id}
                        numColumns={3} // Adjust based on UI
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigate(SCREENS.RENTING_CARS_COMPANY, {
                                        item: item,
                                    });
                                }}
                            >
                                <Image
                                    source={{ uri: item?.companyLogo?.base64 }}
                                    style={{
                                        width: 100,
                                        height: 50,
                                        marginHorizontal: 10,
                                        marginBottom: 10,
                                        borderRadius: 10,
                                        alignSelf: "center",
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ))}
        </Swiper>
    );
};

export default CompanySlider;
