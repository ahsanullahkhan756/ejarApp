import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import { Typography } from "../../components/atoms/Typography";
import { Button, View } from "react-native-ui-lib";
import { SCREENS, theme } from "../../constants";
import { InputText } from "../../components/atoms/InputText";
import { InputDateTime } from "../../components/atoms/InputDateTime";
import { DropDown } from "../../components/atoms/DropDown";
import {
  dealData,
  fuekData,
  munalData,
  spaceData,
  userData,
} from "../../containers/dummy";
import { navigate, onBack } from "../../navigation/RootNavigation";

const FilterScreen = () => {
  const [date, setDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const hidePicker = () => {
    setDatePickerVisible(false);
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Filters" centerImg={false} />
      <ScrollView bounces={false}>
        <View padding-20>
          {/* Price Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Price
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired price Range
            </Typography>
          </View>

          <View gap-10 row style={{ alignItems: "center" }}>
            <InputText
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputText
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
            />
          </View>

          {/* Year Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Year
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired year range
            </Typography>
          </View>
          <View gap-10 row style={{ alignItems: "center" }}>
            <InputDateTime
              title={"Select Date"}
              placeholder={"Date of birth"}
              mode={"date"}
              value={date}
              onChange={setDate}
              onConfirm={(selectedDate: any) => {
                console.log("Selected Date:", selectedDate);
                setDate(selectedDate);
                hidePicker();
              }}
              visible={datePickerVisible}
              style={{ width: 150 }}
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputDateTime
              title={"Select Date"}
              placeholder={"Date of birth"}
              mode={"date"}
              value={date}
              onChange={setDate}
              onConfirm={(selectedDate: any) => {
                console.log("Selected Date:", selectedDate);
                setDate(selectedDate);
                hidePicker();
              }}
              visible={datePickerVisible}
              style={{ width: 150 }}
            />
          </View>

          {/* Price Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Kilometers
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Set your desired kilometers range
            </Typography>
          </View>

          <View gap-10 row style={{ alignItems: "center" }}>
            <InputText
              placeholder="0"
              keyboardType="number-pad"
              rightText={true}
              rightTitle="km"
            />
            <Typography color={theme.color.descColor}>to</Typography>
            <InputText
              placeholder="Any"
              keyboardType="number-pad"
              rightText={true}
              rightTitle=""
            />
          </View>

          {/* Specs Field */}
          <Typography
            color={theme.color.blue}
            size={theme.fontSize.large24}
            textType="bold"
          >
            Specs
          </Typography>
          <View marginV-10>
            <Typography
              color={theme.color.descColor}
              size={theme.fontSize.small}
            >
              Apply
            </Typography>
          </View>
          <DropDown data={spaceData} width={350} />

          {/* Fuel Type*/}
          <View marginV-20>
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Fuel Type
            </Typography>
            <View marginV-10>
              <Typography
                color={theme.color.descColor}
                size={theme.fontSize.small}
              >
                Set your desired fuel type
              </Typography>
            </View>
            <DropDown data={fuekData} width={350} />
          </View>

          {/* Transmission Type*/}
          <View marginV-20>
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Transmission Type
            </Typography>
            <View marginV-10>
              <Typography
                color={theme.color.descColor}
                size={theme.fontSize.small}
              >
                Set your desired transmission type
              </Typography>
            </View>
            <DropDown data={munalData} width={350} />
          </View>

          {/* User Type*/}
          <View marginV-20>
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              User Type
            </Typography>
            <View marginV-10>
              <Typography
                color={theme.color.descColor}
                size={theme.fontSize.small}
              >
                Set your desired User type
              </Typography>
            </View>
            <DropDown data={userData} width={350} />
          </View>

          {/* Deal Type*/}
          <View marginV-20>
            <Typography
              color={theme.color.blue}
              size={theme.fontSize.large24}
              textType="bold"
            >
              Deal Type
            </Typography>
            <View marginV-10>
              <Typography
                color={theme.color.descColor}
                size={theme.fontSize.small}
              >
                Set your desired Deal Type
              </Typography>
            </View>
            <DropDown data={dealData} width={350} />
          </View>
          <Button
            label="Apply"
            backgroundColor={theme.color.primary}
            borderRadius={30}
            onPress={() => onBack()}
            style={{
              height: 50,
              margin: 20,
              width: "50%",
              alignSelf: "center",
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
