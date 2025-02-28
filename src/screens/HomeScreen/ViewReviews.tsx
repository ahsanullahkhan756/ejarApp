import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Typography } from "../../components/atoms/Typography";
import { Header } from "../../components/atoms/Header";
import { theme } from "../../constants";
import { commonStyles } from "../../containers/commStyles";
import { View, Card } from "react-native-ui-lib"; // Added Card for a better layout
import { ScrollView } from "react-native"; // For scrolling if reviews are long
import { COMMON_TEXT } from "../../constants/screens";
import StarRating from "react-native-star-rating-widget";

const ViewReviews = (props: any) => {
  console.log();

  // Sample reviews data
  const reviews = props?.route?.params?.item ?? [];

  console.log(props?.route?.params?.item?.[0]);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={COMMON_TEXT.REVIEWS} centerImg={false} />

      <ScrollView style={{ flex: 1 }}>
        <View paddingH-20>
          {reviews.map((review) => (
            <Card
              key={review.ID}
              style={{
                marginBottom: 20,
                padding: 10,
                gap: 10,
                backgroundColor: theme.color.white,
                borderRadius: 10,
                // shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2, // Android shadow
              }}
            >
              <StarRating
                starStyle={
                  {
                    // marginTop: 2,
                    // marginHorizontal: 1,
                  }
                }
                rating={review?.stars}
                onChange={() => {}}
                enableSwiping={false}
                color="#FEAD1D"
                starSize={30}
              />
              <Typography
                color={theme.color.descColor}
                style={{
                  marginLeft: 10,
                }}
              >
                {review?.comment}
              </Typography>

              <Typography
                textType="semiBold"
                size={16}
                color={theme.color.primary}
                style={{ marginTop: 10 }}
              >
                {review?.reviewer}
              </Typography>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default ViewReviews;
