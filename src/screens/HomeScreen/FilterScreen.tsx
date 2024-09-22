// import React from "react";
// import { View, StyleSheet, Image } from "react-native";
// import SafeAreaContainer from "../../containers/SafeAreaContainer";
// import { IMAGES, theme } from "../../constants";
// import { scale } from "react-native-size-matters";
// import { SearchBar } from "../../components/atoms/SearchBar";
// import { Header } from "../../components/atoms/Header";

// const FilterScreen = () => {
//   return (
//     <SafeAreaContainer safeArea={false}>
//       <View style={styles.container}>
//        <Header titleText="Filters" centerImg={false}/>
//       </View>
//     </SafeAreaContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
 
//   },
// });

// export default FilterScreen;



import React from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-ui-lib';
import { IMAGES } from '../../constants';

const data = {
    categories: [
        { id: '1', name: 'Sedans', icon: IMAGES.car1 },
        { id: '2', name: 'SUVs', icon: IMAGES.car2},
        { id: '3', name: 'Trucks', icon:IMAGES.car3 },
        // Add more categories here
    ],
    carsForRent: [
        { id: '1', name: 'Ford Truck 2021', price: 'AED 7,200', img: IMAGES.car1, specs: ['2021', 'White', 'Automatic'] },
        { id: '2', name: 'Mercedes Benz', price: 'AED 7,200', img: IMAGES.car2, specs: ['2021', 'White', 'Automatic'] },
    ],
    topRatedCars: [
        { id: '1', name: 'Car 1', img: IMAGES.car1, rating: '4.9' },
        { id: '2', name: 'Car 2', img: IMAGES.car2, rating: '4.9' },
    ],
    companies: [
        { id: '1', name: 'Thrifty', logo: 'https://example.com/thrifty.png' },
        { id: '2', name: 'Sixt', logo: 'https://example.com/sixt.png' },
        // Add more companies here
    ],
    reviews: [
        { id: '1', name: 'Rolem Ipsum', rating: '4.9', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
    ]
};

const FilterScreen = () => {
    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            
            <FlatList
                data={data.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
                        <Image source={item.icon} style={{ width: 60, height: 60 }} />
                        <Text>{item.name}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginBottom: 16 }}
            />

            {/* Cars for Rent Section */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Car For Rent</Text>
            <FlatList
                data={data.carsForRent}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            width: 200,
                            marginHorizontal: 8,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 4,
                        }}>
                        <Image source={item.img} style={{ width: '100%', height: 100, borderRadius: 10 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                        <Text>{item.price}</Text>
                        <Text>{item.specs.join(' • ')}</Text>
                    </Card>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginBottom: 16 }}
            />

            <Button label="View All" style={{ marginBottom: 16 }} />

            {/* Top Rated Cars Section */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Top Rated Cars</Text>
            <FlatList
                data={data.topRatedCars}
                numColumns={2}
                renderItem={({ item }) => (
                    <Card
                        style={{
                            flex: 1,
                            margin: 8,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 4,
                        }}>
                        <Image source={{ uri: item.img }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                        <Text>⭐ {item.rating}</Text>
                    </Card>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginBottom: 16 }}
            />

            <Button label="View All" style={{ marginBottom: 16 }} />

            {/* Top Rated Companies Section */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Top Rated Companies</Text>
            <FlatList
                data={data.companies}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
                        <Image source={{ uri: item.logo }} style={{ width: 60, height: 60 }} />
                    </View>
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={{ marginBottom: 16 }}
            />

            {/* Reviews Section */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Reviews</Text>
            {data.reviews.map(review => (
                <Card
                    key={review.id}
                    style={{
                        padding: 16,
                        marginBottom: 16,
                        borderRadius: 10,
                        elevation: 4,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{review.name}</Text>
                    <Text>⭐ {review.rating}</Text>
                    <Text>"{review.review}"</Text>
                </Card>
            ))}
            
            <Button label="View All" style={{ marginBottom: 16 }} />
        </ScrollView>
    );
};

export default FilterScreen;

