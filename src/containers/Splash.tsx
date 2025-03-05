import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import SafeAreaContainer from "./SafeAreaContainer";
import { IMAGES } from "../constants";
import Video, { VideoRef } from "react-native-video";

const Splash = ({ setIsLoadings }) => {
  const background = require("../assets/images/video.mp4");
  const videoRef = useRef<VideoRef>(null);

  return (
    <SafeAreaContainer safeArea={false}>
      <View style={styles.container}>
        <Video
          // Can be a URL or a local file.
          source={background}
          // Store reference
          ref={videoRef}
          // Callback when remote video is buffering
          onBuffer={() => {}}
          // Callback when video cannot be loaded
          onError={() => {}}
          style={styles.backgroundVideo}
        />
        {/* <Image
          source={IMAGES.SplashImg}
          style={{ width: "70%", height: "20%", marginTop: 100 }}
          resizeMode="contain"
        />
        <Image
          source={IMAGES.SplashText}
          style={{ width: "70%", height: "20%", marginVertical: 80 }}
          resizeMode="contain"
        /> */}
        <TouchableOpacity
          style={{
            width: "30%",
            position: "absolute",
            bottom: Platform.OS == "ios" ? 75 : 120,
            height: "15%",
          }}
          onPress={() => {
            setIsLoadings(false);
          }}
        >
          <Image
            source={IMAGES.SplashButton}
            style={{ width: "100%", height: "100%", marginTop: 50 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },

  backgroundVideo: {
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Splash;
