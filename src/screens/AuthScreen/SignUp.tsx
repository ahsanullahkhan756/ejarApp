// import React, { useState } from "react";
// import { StyleSheet, Text, Image } from "react-native";
// import SafeAreaContainer from "../../containers/SafeAreaContainer";
// import { Header } from "../../components/atoms/Header";
// import * as Progress from "react-native-progress";
// import { IMAGES, theme } from "../../constants";
// import { scale, verticalScale } from "react-native-size-matters";
// import { Button, View } from "react-native-ui-lib";
// import { Typography } from "../../components/atoms/Typography";

// const steps = [
//   { label: "Sign Up", progress: 0 },
//   { label: "Upload License", progress: 0.5 },
//   { label: "Finish", progress: 1.0 },
// ];

// const SignUp = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const handleNextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   return (
//     <SafeAreaContainer safeArea={false}>
//       <View center>
//         <Image
//           source={IMAGES.logo}
//           style={{ width: scale(180), height: verticalScale(45), top: 40 }}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={styles.container}>
//         <View style={styles.progressContainer}>
//           <Progress.Bar
//             progress={steps[currentStep].progress}
//             width={320}
//             color={theme.color.primary}
//             borderWidth={1}
//             borderColor={theme.color.tgray}
//           />
  
//           <Typography>{steps[currentStep].label}</Typography>
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button
//             label="Next Step"
//             backgroundColor={theme.color.primary}
//             onPress={handleNextStep}
//             disabled={currentStep === steps.length - 1}
//             borderRadius={30}
//             style={{height:50}}
//           />
//         </View>
//       </View>
//     </SafeAreaContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginVertical: 20,
//   },
//   progressContainer: {
//     alignItems: "center",
//     marginTop: 40,
//   },
//   stepLabel: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//     color: theme.color.primary,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     marginHorizontal:20
//   },
// });

// export default SignUp;


import React, { useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Header } from "../../components/atoms/Header";
import * as Progress from "react-native-progress";
import { IMAGES, theme } from "../../constants";
import { scale, verticalScale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";
import { Typography } from "../../components/atoms/Typography";

const steps = [
  { label: "Sign Up", progress: 0 },
  { label: "Upload License", progress: 0.5 },
  { label: "Finish", progress: 1.0 },
];

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <SafeAreaContainer safeArea={false}>
      <View center>
        <Image
          source={IMAGES.logo}
          style={{ width: scale(180), height: verticalScale(45), marginTop: 40 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={steps[currentStep].progress}
            width={320}
            color={theme.color.primary}
            borderWidth={1}
            borderColor={theme.color.tgray}
          />
          {/* <Typography style={styles.currentStepLabel}>
            {steps[currentStep].label}
          </Typography> */}
        </View>
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepItem,
                { flex: index === steps.length - 1 ? 1 : 0 },
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
        <View style={styles.buttonContainer}>
          <Button
            label="Next Step"
            backgroundColor={theme.color.primary}
            onPress={handleNextStep}
            disabled={currentStep === steps.length - 1}
            borderRadius={30}
            style={{ height: 50 }}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginVertical: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 40,
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
    flexDirection: "row",
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
    justifyContent:'center',
    flex: 1,
  },
  activeStepText: {
    fontWeight: "bold",
    color: theme.color.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SignUp;
