import React, { Component, useContext, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { theme } from "../../constants";
import { Typography } from "./Typography";

const TabList = (props: any) => {
  const {
    data = [],
    onSelect = () => {},
    selected = 0,
    isFrombookList = false,
  } = props;
  return (
    <View style={styles.tabView}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item: any, i: any) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.activeTabText,
              {
                backgroundColor:
                  item?.label == selected
                    ? theme.color.primary
                    : theme.color.blue,
              },
            ]}
            onPress={() => {
              if (isFrombookList) {
                onSelect(item.label);
              } else {
                onSelect(i);
              }
            }}
          >
            <Typography extraSmall12 semibold color={"#fff"}>
              {item.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabText: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginRight: 10,
  },
  tabText: {
    color: "#000",
  },
});

export default TabList;
