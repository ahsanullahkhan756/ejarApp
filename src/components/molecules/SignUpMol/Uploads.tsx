import React, { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { RNCamera } from 'react-native-camera';
import { Image, StyleSheet } from "react-native";

const Uploads = ({ onValidate }: any) => {
  const [uploads, setUploads] = useState([
    IMAGES.uploadLicense1,
    IMAGES.uploadLicense2,
  ]);
  const [selfie, setSelfie] = useState(null);
  const cameraRef = useRef(null);

  const removeImage = (index: any) => {
    const newUploads = uploads.filter((_, i) => i !== index);
    setUploads(newUploads);
  };

  const takeSelfie = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef?.current?.takePictureAsync(options);
      setSelfie(data.uri);
    }
  };

  const clearSelfie = () => {
    setSelfie(null);
  };

  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
        Face Verification
      </Typography>

      <View style={styles.circleContainer}>
        {selfie ? (
          <View style={styles.selfieContainer}>
            <Image source={{ uri: selfie }} style={styles.selfieImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={clearSelfie}>
              <Image source={IMAGES.cross} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
          >
            <TouchableOpacity style={styles.captureButton} onPress={takeSelfie}>
              <View style={styles.captureCircle} />
            </TouchableOpacity>
          </RNCamera>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    width: 200,
    height: 200,
    marginVertical: 20,
    overflow: 'hidden',
  },
  selfieContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  captureButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: theme.color.primary,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: 80,
    borderRadius: 15,
    padding: 5,

  
  },
  crossIcon: {
    width: 25,
    height: 25,
  },
});

export default Uploads;
