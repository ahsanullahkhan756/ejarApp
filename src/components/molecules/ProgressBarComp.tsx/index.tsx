import React from "react";
import { StyleSheet, Platform } from "react-native";
import * as Progress from "react-native-progress";
import { View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { Typography } from "../../atoms/Typography";

const ProgressBarComp = ({ currentStep, steps }:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {Array(steps.length).fill(3).map((_, index) => (
          <>
          <View 
            key={index}
            style={{
              width: 12,
              height: 12,
              backgroundColor: index <= currentStep ? theme.color.primary  : "lightgray",
              borderRadius: 10,
            }} 
          />
       
          </>

          
        ))}
        <Progress.Bar
          progress={steps[currentStep].progress}
          width={Platform.OS === 'ios' ? 330 : 350}
          height={5}
          color={theme.color.primary}
          borderWidth={0.4}
          borderColor={theme.color.descColor}
          style={styles.progressBar}
        />
      </View>
      <View row spread marginH-20 marginV-10>
      <Typography color={theme.color.descColor} size={theme.fontSize.small}>Sign Up</Typography>
      <Typography color={theme.color.descColor} size={theme.fontSize.small}>Finish</Typography>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    position: "relative",
  },
  progressBar: {
    position: "absolute",
    top: 3,
    right: 0,
    bottom: 0,
    height: 5,
    zIndex: -1,
    width: "100%",
  },
});

export default ProgressBarComp;
