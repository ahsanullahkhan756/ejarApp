import React from "react";
import { Image } from "react-native";
import { View, Carousel } from "react-native-ui-lib";
import { IMAGES, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";

export const ReviewsSection = () => (
  <View padding-20>
    <View row spread>
      <Typography>Rolem Ipsum</Typography>
      <Image source={IMAGES.colun} style={styles.colunImage} resizeMode="contain" />
    </View>

    <View row>
      <Image source={IMAGES.starIcon} style={styles.starImage} resizeMode="contain" />
      <Typography>4.9</Typography>
    </View>

    <Carousel loop>
      <Typography color={theme.color.descColor}>
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua”.
      </Typography>

      <Typography color={theme.color.descColor}>
        “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua”.
      </Typography>
    </Carousel>

    <Image source={IMAGES.slider} style={styles.sliderImage} resizeMode="contain" />
  </View>
);

const styles = {
  colunImage: {
    width: 70,
    height: 20,
    alignSelf: "center",
  },
  starImage: {
    width: 20,
    height: 20,
  },
  sliderImage: {
    width: 70,
    height: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
};
