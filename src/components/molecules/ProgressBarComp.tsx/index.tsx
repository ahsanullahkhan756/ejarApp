import React, { useState } from "react";
import { StyleSheet, Text, Image, Platform } from "react-native";
import * as Progress from "react-native-progress";
import { Button, View } from "react-native-ui-lib";
import { theme } from "../../../constants";
import { commonStyles } from "../../../containers/commStyles";
import { Typography } from "../../atoms/Typography";

const ProgressBarComp = ({currentStep, steps}:any) => {
  return (
      <View style={styles.container}>
        <View style={[commonStyles.innerCircle,{position:'absolute',left:20,top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute', left:100, top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute', left:180, top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute', right:100, top:18,backgroundColor:theme.color.primary}]} />
        <View style={[commonStyles.innerCircle,{position:'absolute',right:20,top:18,backgroundColor:theme.color.primary}]} />
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={steps[currentStep].progress}
            width={Platform.OS == 'ios' ? 330 : 350 }
            height={5}
            color={theme.color.primary}
            borderWidth={0.4}
            borderColor={theme.color.descColor}
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
              <Typography color={theme.color.tgray} size={theme.fontSize.extraSmall12}
                // style={[
                //   styles.stepLabel,
                //   index === currentStep && styles.activeStepText,
                // ]}
              >
                {step.label}
              </Typography>
              {/* {index < steps.length - 1 && <View style={styles.separator} />} */}
            </View>
          ))}
        </View>
        
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    // alignItems: "center",
    marginTop: 20,
    marginHorizontal: 0,
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
    color: theme.color.primary,
  },
  activeStepText: {
    color: theme.color.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProgressBarComp;
