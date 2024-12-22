// import React, { useEffect, useState } from "react";
// import { Platform, ScrollView, StyleSheet, TextInput } from "react-native";
// import SafeAreaContainer from "../../containers/SafeAreaContainer";
// import { Header } from "../../components/atoms/Header";
// import { Typography } from "../../components/atoms/Typography";
// import { Button, View } from "react-native-ui-lib";
// import { SCREENS, SCREEN_WIDTH, theme } from "../../constants";
// import { InputText } from "../../components/atoms/InputText";
// import { InputDateTime } from "../../components/atoms/InputDateTime";
// import { DropDown } from "../../components/atoms/DropDown";
// import {
//   dealData,
//   fuekData,
//   munalData,
//   spaceData,
//   userData,
// } from "../../containers/dummy";
// import { navigate, onBack } from "../../navigation/RootNavigation";
// import { InputField } from "../../components/atoms/InputField";
// import { useDispatch } from "react-redux";
// import { setIsLoading } from "../../redux/slice/user";
// import { filterApi } from "../../api/homeServices";
// import { showToast } from "../../utils/toast";

// const FilterScreen = () => {
//   const [date, setDate] = useState(null);
//   const [date2, setDate2] = useState(null);
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const hidePicker = () => {
//     setDatePickerVisible(false);
//   };
//   const dispatch = useDispatch();

//   const getFilterApi = async () => {
//     try {
//       const resp = await filterApi();
//       if (resp) {
//         console.log("res_filter", resp);
//         showToast({ title: resp });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <SafeAreaContainer safeArea={false}>
//       <Header titleText="Filters" centerImg={false} />
//       <ScrollView bounces={false}>
//         <View padding-20>
//           {/* Price Field */}
//           <Typography
//             color={theme.color.blue}
//             size={theme.fontSize.large24}
//             textType="bold"
//           >
//             Price
//           </Typography>
//           <View marginV-10>
//             <Typography
//               color={theme.color.descColor}
//               size={theme.fontSize.small}
//             >
//               Set your desired price Range
//             </Typography>
//           </View>

//           <View gap-5 row width={"100%"} style={{ alignItems: "center" }}>
//             <InputField
//               placeholder="0"
//               keyboardType="number-pad"
//               rightText={true}
//               maxLength={10}
//               width={SCREEN_WIDTH * 0.4}
//             />
//             <Typography color={theme.color.descColor}>to</Typography>
//             <InputField
//               placeholder="Any"
//               keyboardType="number-pad"
//               rightText={true}
//               maxLength={10}
//               // width={SCREEN_WIDTH * 0.4}
//             />
//           </View>

//           {/* Year Field */}
//           <Typography
//             color={theme.color.blue}
//             size={theme.fontSize.large24}
//             textType="bold"
//           >
//             Year
//           </Typography>
//           <View marginV-20>
//             <Typography
//               color={theme.color.descColor}
//               size={theme.fontSize.small}
//             >
//               Set your desired year range
//             </Typography>
//           </View>
//           <View gap-10 row marginV-10 style={{ alignItems: "center" }}>
//             <InputDateTime
//               title={"Select Date"}
//               placeholder={"Select Date"}
//               mode={"date"}
//               value={date}
//               onChange={setDate}
//               onConfirm={(selectedDate: any) => {
//                 console.log("Selected Date:", selectedDate);
//                 setDate(selectedDate);
//                 hidePicker();
//               }}
//               visible={datePickerVisible}
//               style={{ width: SCREEN_WIDTH * 0.4 }}
//             />
//             <Typography color={theme.color.descColor}>to</Typography>
//             <InputDateTime
//               title={"Select Date"}
//               placeholder={"Select Date"}
//               mode={"date"}
//               value={date2}
//               onChange={setDate2}
//               onConfirm={(selectedDate: any) => {
//                 console.log("Selected Date:", selectedDate);
//                 setDate(selectedDate);
//                 hidePicker();
//               }}
//               visible={datePickerVisible}
//               // style={{  width: SCREEN_WIDTH * 0.4 }}
//             />
//           </View>

//           {/* Price Field */}
//           <Typography
//             color={theme.color.blue}
//             size={theme.fontSize.large24}
//             textType="bold"
//           >
//             Kilometers
//           </Typography>
//           <View marginV-10>
//             <Typography
//               color={theme.color.descColor}
//               size={theme.fontSize.small}
//             >
//               Set your desired kilometers range
//             </Typography>
//           </View>

//           <View gap-5 row style={{ alignItems: "center" }}>
//             <InputField
//               placeholder="0"
//               keyboardType="number-pad"
//               rightText={true}
//               rightTitle="km"
//               maxLength={10}
//               width={SCREEN_WIDTH * 0.4}
//             />
//             <Typography color={theme.color.descColor}>to</Typography>
//             <InputField
//               placeholder="Any"
//               keyboardType="number-pad"
//               rightText={true}
//               rightTitle=""
//               maxLength={10}
//               // width={SCREEN_WIDTH * 0.45}
//             />
//           </View>

//           {/* Specs Field */}
//           <Typography
//             color={theme.color.blue}
//             size={theme.fontSize.large24}
//             textType="bold"
//           >
//             Specs
//           </Typography>
//           <View marginV-10>
//             <Typography
//               color={theme.color.descColor}
//               size={theme.fontSize.small}
//             >
//               Apply
//             </Typography>
//           </View>
//           <DropDown
//             data={spaceData}
//             height={Platform.OS == "ios" ? 50 : 60}
//             width={Platform.OS == "ios" ? 350 : 370}
//           />

//           {/* Fuel Type*/}
//           <View marginV-20>
//             <Typography
//               color={theme.color.blue}
//               size={theme.fontSize.large24}
//               textType="bold"
//             >
//               Fuel Type
//             </Typography>
//             <View marginV-10>
//               <Typography
//                 color={theme.color.descColor}
//                 size={theme.fontSize.small}
//               >
//                 Set your desired fuel type
//               </Typography>
//             </View>
//             <DropDown
//               data={fuekData}
//               height={Platform.OS == "ios" ? 50 : 60}
//               width={Platform.OS == "ios" ? 350 : 370}
//             />
//           </View>

//           {/* Transmission Type*/}
//           <View marginV-20>
//             <Typography
//               color={theme.color.blue}
//               size={theme.fontSize.large24}
//               textType="bold"
//             >
//               Transmission Type
//             </Typography>
//             <View marginV-10>
//               <Typography
//                 color={theme.color.descColor}
//                 size={theme.fontSize.small}
//               >
//                 Set your desired transmission type
//               </Typography>
//             </View>
//             <DropDown
//               data={munalData}
//               height={Platform.OS == "ios" ? 50 : 60}
//               width={Platform.OS == "ios" ? 350 : 370}
//             />
//           </View>

//           {/* User Type*/}
//           <View marginV-20>
//             <Typography
//               color={theme.color.blue}
//               size={theme.fontSize.large24}
//               textType="bold"
//             >
//               User Type
//             </Typography>
//             <View marginV-10>
//               <Typography
//                 color={theme.color.descColor}
//                 size={theme.fontSize.small}
//               >
//                 Set your desired User type
//               </Typography>
//             </View>
//             <DropDown
//               data={userData}
//               height={Platform.OS == "ios" ? 50 : 60}
//               width={Platform.OS == "ios" ? 350 : 370}
//             />
//           </View>

//           {/* Deal Type*/}
//           <View marginV-20>
//             <Typography
//               color={theme.color.blue}
//               size={theme.fontSize.large24}
//               textType="bold"
//             >
//               Deal Type
//             </Typography>
//             <View marginV-10>
//               <Typography
//                 color={theme.color.descColor}
//                 size={theme.fontSize.small}
//               >
//                 Set your desired Deal Type
//               </Typography>
//             </View>
//             <DropDown
//               data={dealData}
//               height={Platform.OS == "ios" ? 50 : 60}
//               width={Platform.OS == "ios" ? 350 : 370}
//             />
//           </View>
//           <Button
//             label="Apply"
//             backgroundColor={theme.color.primary}
//             borderRadius={30}
//             onPress={() => {
//               getFilterApi();
//               onBack();
//             }}
//             style={{
//               height: 50,
//               margin: 20,
//               width: "50%",
//               alignSelf: "center",
//               marginTop: 100,
//             }}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
// });

// export default FilterScreen;





import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { Typography } from "../../components/atoms/Typography";
import { Button, View } from "react-native-ui-lib";
import { SCREENS, SCREEN_WIDTH, theme } from "../../constants";
import { InputField } from "../../components/atoms/InputField";
import { InputDateTime } from "../../components/atoms/InputDateTime";
import { DropDown } from "../../components/atoms/DropDown";
import { dealData, fuekData, munalData, spaceData, userData } from "../../containers/dummy";
import { showToast } from "../../utils/toast";
import { onBack } from "../../navigation/RootNavigation";
import { filterApi } from "../../api/homeServices"; // API call function

const FilterScreen = () => {
  // State management for filters
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');
  const [fromKM, setFromKM] = useState('');
  const [toKM, setToKM] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [userType, setUserType] = useState('');
  const [dealType, setDealType] = useState('');
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  
  // Handle closing date picker
  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  // API call when Apply button is pressed
  const handleApplyFilters = async () => {
    try {
      const filterResponse = await filterApi({
        fromPrice,
        toPrice,
        fromYear,
        toYear,
        fromKM,
        toKM,
        fuelType,
        transmissionType,
        userType,
        dealType,
      });

      if (filterResponse && filterResponse.Data.length === 0) {
        showToast({ title: "No results found for the selected filters", type: "error" });
      } else {
        showToast({ title: "Filters Applied Successfully" });
        onBack(); // Navigate back or show filtered results
      }
    } catch (error) {
      showToast({ title: "Error applying filters. Please try again.", type: "error" });
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Filters" centerImg={false} />
      <ScrollView bounces={false}>
        <View padding-20>
          {/* Price Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Price
          </Typography>
          <View marginV-10>
            <Typography color={theme.color.descColor} size={theme.fontSize.small}>
              Set your desired price Range
            </Typography>
          </View>
          <View gap-5 row width={"100%"} style={{ alignItems: "center" }}>
            <InputField
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
              maxLength={10}
              width={SCREEN_WIDTH * 0.4}
              value={fromPrice}
              onChangeText={setFromPrice}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputField
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
              maxLength={10}
              value={toPrice}
              onChangeText={setToPrice}
            />
          </View>

          {/* Year Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Year
          </Typography>
          <View marginV-10>
            <Typography color={theme.color.descColor} size={theme.fontSize.small}>
              Set your desired year range
            </Typography>
          </View>
          <View gap-10 row marginV-10 style={{ alignItems: "center" }}>
            <InputDateTime
              // title={"Select Date"}
              placeholder={"Select Date"}
              mode={"date"}
              value={date}
              onChange={setDate}
              style={{ width: SCREEN_WIDTH * 0.4 }}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputDateTime
              // title={"Select Date"}
              placeholder={"Select Date"}
              mode={"date"}
              value={date2}
              onChange={setDate2}
            />
          </View>

          {/* Kilometers Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Kilometers
          </Typography>

            <Typography color={theme.color.descColor} size={theme.fontSize.small}>
              Set your desired kilometers range
            </Typography>
  
          <View gap-5 row style={{ alignItems: "center" }}>
            <InputField
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
              rightTitle="km"
              maxLength={10}
              width={SCREEN_WIDTH * 0.4}
              value={fromKM}
              onChangeText={setFromKM}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputField
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
              value={toKM}
              onChangeText={setToKM}
            />
          </View>
          <View marginV-10>
          {/* Fuel Type Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Fuel Type
          </Typography>
            <Typography color={theme.color.descColor} size={theme.fontSize.small}>
            Set your desired fuel type
            </Typography>
          </View>
          <DropDown
            data={fuekData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={fuelType}
            onChange={setFuelType}
          />
          <View marginV-10>
          {/* Transmission Type Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Transmission Type
          </Typography>
            <Typography color={theme.color.descColor} size={theme.fontSize.small}>
            Set your desired transmission type
            </Typography>
          </View>
          <DropDown
            data={munalData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={transmissionType}
            onChange={setTransmissionType}
          />

          {/* User Type Field */}
          <View marginV-20>
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            User Type
          </Typography>
          <Typography color={theme.color.descColor} size={theme.fontSize.small}>
          Set your desired User type
            </Typography>
          <DropDown
            data={userData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={userType}
            onChange={setUserType}
          />
</View>
<View marginV-20>
          {/* Deal Type Field */}
          <Typography color={theme.color.blue} size={theme.fontSize.large24} textType="bold">
            Deal Type
          </Typography>
          <Typography color={theme.color.descColor} size={theme.fontSize.small}>
          Set your desired Deal Type
            </Typography>
          <DropDown
            data={dealData}
            height={Platform.OS === "ios" ? 50 : 60}
            width={Platform.OS === "ios" ? 350 : 370}
            value={dealType}
            onChange={setDealType}
          />
</View>
          {/* Apply Button */}
          <Button
            label="Apply"
            backgroundColor={theme.color.primary}
            borderRadius={30}
            onPress={handleApplyFilters}
            style={{
              height: 50,
              margin: 20,
              width: "50%",
              alignSelf: "center",
              marginTop: 100,
            }}
            
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FilterScreen;
