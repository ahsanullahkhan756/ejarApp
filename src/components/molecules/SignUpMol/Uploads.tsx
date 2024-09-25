import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import { Typography } from "../../atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { IMAGES, theme } from "../../../constants";
import { Image, ImageBackground, TouchableOpacity } from "react-native";

const Uploads = () => {
  // Array to manage the images
  const [uploads, setUploads] = useState([IMAGES.uploadLicense1, IMAGES.uploadLicense2]);

  // Function to handle removing an image
  const removeImage = (index) => {
    const newUploads = uploads.filter((_, i) => i !== index); // Filter out the image by index
    setUploads(newUploads);
  };

  return (
    <View marginH-20 center>
      <View style={commonStyles.lineBar} />
      <Typography textType="bold" size={theme.fontSize.large24}>
        Confirmed Uploads
      </Typography>
      <View row gap-20 marginV-20>
        {uploads.map((image, index) => (
          <View key={index}>
            <ImageBackground
              source={image}
              style={{ width: 160, height: 180 }}
              resizeMode="contain"
            >
              <TouchableOpacity
                style={{ position: "absolute", right: 0, top: -10 }}
                onPress={() => removeImage(index)} // Remove image on click
              >
                <Image
                  source={IMAGES.cross}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Uploads;
