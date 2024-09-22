import React, { useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import * as Progress from "react-native-progress";
import { Button, View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { commonStyles } from "../../../containers/commStyles";

const ProgressBarComp = ({currentStep, steps}:any) => {
  return (
      <View style={styles.container}>
        <View style={[commonStyles.innerCircle,{position:'absolute',left:35,top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute',alignSelf:'center', top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute',right:35,top:18,backgroundColor:theme.color.primary}]} />
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={steps[currentStep].progress}
            width={320}
            color={theme.color.primary}
            borderWidth={1}
            borderColor={theme.color.tgray}
          />
        </View>
        <View style={styles.stepsContainer}>
          {steps.map((step:any, index:any) => (
            <View
              key={index}
              style={[
                styles.stepItem,
                { flex: index === steps.length - 0 ? -1 : 1 },
                index <= currentStep && styles.activeStep,
              ]}
            >
              <Text
                style={[
                  styles.stepLabel,
                  index === currentStep && styles.activeStepText,
                ]}
              >
                {step.label}
              </Text>
              {/* {index < steps.length - 1 && <View style={styles.separator} />} */}
            </View>
          ))}
        </View>
        
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 20,

  },
  currentStepLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color.primary,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  stepItem: {
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 14,
    color: theme.color.tgray,
  },
  separator: {
    height: 2,
    width: 20,
    backgroundColor: theme.color.tgray,
    marginHorizontal: 5,
  },
  activeStep: {
    flex: 1,
  },
  activeStepText: {
    color: theme.color.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProgressBarComp;
