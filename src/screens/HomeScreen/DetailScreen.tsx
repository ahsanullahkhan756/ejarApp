// import React from "react";
// import { View, StyleSheet, Image } from "react-native";
// import SafeAreaContainer from "../../containers/SafeAreaContainer";
// import { IMAGES, theme } from "../../constants";
// import { scale } from "react-native-size-matters";
// import { SearchBar } from "../../components/atoms/SearchBar";

// const Home = () => {
//   return (
//     <SafeAreaContainer safeArea={false}>
//       <View style={styles.container}>
//         <Image
//           source={IMAGES.logo}
//           style={{ width: scale(100), height: 60,tintColor:theme.color.white }}
//           resizeMode="contain"
//         />
//         <SearchBar />
//       </View>
//     </SafeAreaContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop:20,
//     paddingHorizontal:20,
//     backgroundColor:theme.color.blue,
//     borderBottomLeftRadius:30,
//     borderBottomRightRadius:30
//   },
// });

// export default Home;




import React, { useState } from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { Carousel,  Button } from 'react-native-ui-lib';
import { Calendar } from 'react-native-calendars';
import { IMAGES } from '../../constants';

const DetailScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    
    const vehicleSpecs = [
        { label: 'Year', value: '2021' },
        { label: 'Body Type', value: 'Truck' },
        { label: 'Engine Capacity', value: '2800cc' },
        { label: 'Color', value: 'White' },
        { label: 'Fuel', value: 'Diesel' },
    ];

    const handleDayPress = (day:any) => {
        setSelectedDate(day.dateString);
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            
            {/* Image Carousel */}
            <Carousel loop>
                <Image source={IMAGES.car1} style={{ width: '100%', height: 200 }} />
            </Carousel>

            {/* Vehicle Details */}
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>AED 7,200/day</Text>
                <Text>Jumeirah, Dubai - Automatic - 60,000 km</Text>
            </View>

            {/* Vehicle Specifications */}
            <FlatList
                data={vehicleSpecs}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text>{item.label}</Text>
                        <Text>{item.value}</Text>
                    </View>
                )}
                keyExtractor={item => item.label}
            />

            {/* Description */}
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Description</Text>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</Text>
            </View>

            {/* Calendar for Booking */}
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Book Now</Text>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            marked: true,
                            selectedColor: 'blue',
                        },
                    }}
                    style={{
                        borderRadius: 10,
                        elevation: 4,
                        marginVertical: 10,
                    }}
                />
                <Text style={{ fontSize: 16, paddingTop: 10 }}>
                    Selected Date: {selectedDate || 'None'}
                </Text>
            </View>

            {/* Rent Now Button */}
            <Button 
                label="Rent Now" 
                onPress={() => console.log('Booked on:', selectedDate)} 
                style={{ margin: 20 }}
            />
        </ScrollView>
    );
};

export default DetailScreen;
