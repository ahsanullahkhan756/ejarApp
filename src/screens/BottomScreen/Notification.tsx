import React from "react";
import { StyleSheet, Image, SectionList, StatusBar } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { SearchBar } from "../../components/atoms/SearchBar";
import { scale } from "react-native-size-matters";
import { Typography } from "../../components/atoms/Typography";
import { NOTIFICATION_DATA } from "../../containers/dummy";

const Notification = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Notifications" centerImg={false} />
      <View marginH-10>
        <SearchBar
          backgroundColor={theme.color.blue}
          widthContaner={scale(230)}
        />
      </View>
      <View margin-20>
        <SectionList
          sections={NOTIFICATION_DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Typography>{item}</Typography>
              <Typography color={theme.color.descColor}>
                Lorem ipsum dolor sit amet, consectetur{" "}
              </Typography>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Typography
              textType="bold"
              color={theme.color.blue}
              size={theme.fontSize.large20}
            >
              {title}
            </Typography>
          )}
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: theme.color.descColor,
  },
});

export default Notification;
