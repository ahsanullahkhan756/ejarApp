import React from "react";
import { Image } from "react-native";
import { View, Carousel } from "react-native-ui-lib";
import { IMAGES, theme } from "../../constants";
import { Typography } from "../../components/atoms/Typography";
import { commonStyles } from "../../containers/commStyles";

export const CompaniesCarousel = () => (
  <View padding-20>
    <View style={commonStyles.lineBar} />
    <Typography size={theme.fontSize.large} color={theme.color.blue} textType="bold">
      Top Rated Companies
    </Typography>

    <Carousel loop>
      <Image source={IMAGES.compaines} style={styles.companyImage} resizeMode="contain" />
      <Image source={IMAGES.compaines} style={styles.companyImage} resizeMode="contain" />
      <Image source={IMAGES.compaines} style={styles.companyImage} resizeMode="contain" />
    </Carousel>
  </View>
);

const styles = {
  companyImage: {
    width: "100%",
    height: 100,
    alignSelf: "center",
  },
};
