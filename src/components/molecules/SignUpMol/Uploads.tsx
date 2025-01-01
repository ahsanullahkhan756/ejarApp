import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, SCREEN_HEIGHT, SCREEN_WIDTH, theme } from "../../../constants";
import { ActivityIndicator, Image, Linking, StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
} from "react-native-vision-camera";
import { COMMON_TEXT } from "../../../constants/screens";

const Uploads = ({ onValidate }: any) => {
  const camera = useRef(null);
  const cameraDevice = useCameraDevice("front");
  const { hasPermission } = useCameraPermission();
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState(null);
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

  // useEffect(() => {
  //   (async () => {
  //     const cameraPermissionStatus = await Camera.requestCameraPermission();
  //     setCameraPermission(cameraPermissionStatus);
  //     if (cameraPermissionStatus === "authorized") {
  //       setShowCamera(true);
  //     } else if (cameraPermissionStatus === "denied")
  //       await Linking.openSettings();
  //   })();
  // }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      try {
        const photo = await camera.current.takePhoto({});
        setSelfie(photo.path);
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    } else {
      console.warn("Camera ref is null.");
    }
  };

  const renderDetectorContent = () => {
    if (cameraDevice && hasPermission) {
      return (
        <TouchableOpacity
          onPress={() => {
            capturePhoto();
          }}
        >
          <Camera
            ref={camera}
            style={{
              borderRadius: 100,
              borderWidth: 1,
              borderStyle: "dashed",
              width: 200,
              height: 200,
            }}
            photo={true}
            device={cameraDevice}
            isActive={showCamera}
          />
        </TouchableOpacity>
      );
    }
    return <ActivityIndicator size="large" color="#1C6758" />;
  };

  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
        {COMMON_TEXT.FACE_VERIFICATION}
      </Typography>

      <View style={styles.circleContainer}>
        {selfie ? (
          <View style={styles.selfieContainer}>
            <Image
              source={{ uri: `file://${selfie}` }}
              style={styles.selfieImage}
            />
            <TouchableOpacity style={styles.deleteButton} onPress={clearSelfie}>
              <Image source={IMAGES.cross} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <>{renderDetectorContent()}</>
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
    overflow: "hidden",
  },
  selfieContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selfieImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    position: "absolute",
    top: 0,
    left: 0,
  },
  captureButton: {
    backgroundColor: "transparent",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  captureCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: theme.color.primary,
  },
  deleteButton: {
    position: "absolute",
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
