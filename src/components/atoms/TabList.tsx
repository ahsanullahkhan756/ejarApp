import React, { Component, useContext, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { theme } from "../../constants";

const TabList = (props: any) => {
  const { data = [], onSelect = () => {}, selected = 0 } = props;
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
                  selected == i ? theme.color.primary : theme.color.blue,
              },
            ]}
            onPress={() => {
              onSelect(i);
            }}
          >
            <Text extraSmall12 semibold color={"#fff"}>
              {item.label}
            </Text>
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
