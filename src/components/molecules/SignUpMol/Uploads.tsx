import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Button } from "react-native-ui-lib";
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
import { useTranslation } from "../../../hooks/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../api/auth";
import {
  setIsLoading,
  setLoggedIn,
  setUserDetails,
} from "../../../redux/slice/user";
import { sendPicturetoS3 } from "../../../services/axios";

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

  const { isLoading } = useSelector((state) => state?.user);

  const cameraRef = useRef(null);
  const { t } = useTranslation();
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
  const dispatch = useDispatch();
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
    if (isLoading) return;
    if (camera.current !== null) {
      try {
        dispatch(setIsLoading(true));
        const photo = await camera.current.takePhoto({});
        const normalizeUri = (uri) => uri.replace("file://", ""); // Remove "file://" prefix if needed
        // const normalizeUri = (uri) =>
        //   uri.startsWith("file://") ? uri : `file://${uri}`;
        const image = {
          mime: "image/jpeg",
          path: normalizeUri(photo?.path),
        };
        const response = await sendPicturetoS3(image);
        if (response) {
          setSelfie(response);
        }
      } catch (error) {
        console.error("Error taking photo:", error);
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      console.warn("Camera ref is null.");
    }
  };
  const ID = useSelector((state) => state?.user?.userDetails?.ID);

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
            <Image source={{ uri: selfie }} style={styles.selfieImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={clearSelfie}>
              <Image source={IMAGES.cross} style={styles.crossIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <>{renderDetectorContent()}</>
        )}
      </View>
      <Button
        label={selfie ? t(COMMON_TEXT.NEXT) : ""}
        backgroundColor={theme.color.primary}
        onPress={async () => {
          if (selfie) {
            const data = {
              ID: ID,
              profilePicture: {
                fileName: "profile.jpg",
                base64: selfie,
                size: 0,
              },
            };
            const res = await updateProfile({ data });
            if (res != null) {
              dispatch(setLoggedIn(true));
              dispatch(setUserDetails(res));
              dispatch(setIsLoading(false));
            }
            return;
          } else {
            capturePhoto();
          }
        }}
        // borderRadius={30}
        style={{
          height: selfie ? 50 : 100,
          margin: 20,
          marginTop: 200,
          marginBottom: 200,
          width: selfie ? 300 : 100,
          borderRadius: selfie ? 30 : 50,
          borderWidth: selfie ? 0 : 15,
          borderColor: "#D9D9D9",
        }}
      />
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
