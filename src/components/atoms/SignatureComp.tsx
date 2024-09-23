import React, { useState, useRef } from "react";
import { StyleSheet, Text, Image, Alert } from "react-native";
import Signature from "react-native-signature-canvas";
import { SCREEN_WIDTH, theme } from "../../constants";
import { scale } from "react-native-size-matters";
import { Button, View } from "react-native-ui-lib";

export const SignatureComp = () => {
  const [signature, setSign] = useState(null);
  const ref = useRef(null);

  const handleOK = (signature: any) => {
    console.log(signature);
    setSign(signature);  // Base64 string
  };

  const handleEmpty = () => {
    Alert.alert("Signature is empty", "Please provide your signature.");
  };

  const handleClear = () => {
    ref.current.clearSignature();  // Clear the signature on the canvas
    setSign(null);                 // Clear the saved signature
  };

  const style = `
    .m-signature-pad--footer {
      display: none;
    }
    .m-signature-pad {
      box-shadow: none;
      border: none;
    }
    .m-signature-pad--body {
      border: 2px solid red;
    }
  `;

  return (
    <View flex>
      <View style={styles.preview}>
        {signature ? (
          <Image
            resizeMode="contain"
            style={{ width: 335, height: 114 }}
            source={{ uri: `data:image/png;base64,${signature}` }}
          />
        ) : null}
      </View>
      <Signature
        ref={ref}
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Sign here"
        clearText="Clear"
        confirmText="Save"
        webStyle={style}
      />
      {/* <View style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginTop: 20 }}>
        <Button label="Clear Signature" onPress={handleClear} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    width: scale(320),
    height: 200,
    backgroundColor: theme.color.white,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
});
