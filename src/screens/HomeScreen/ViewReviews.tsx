import React, { useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Typography } from "../../components/atoms/Typography";
import { Header } from "../../components/atoms/Header";
import { theme } from "../../constants";
import { commonStyles } from "../../containers/commStyles";
import { View, Card } from "react-native-ui-lib"; // Added Card for a better layout
import { ScrollView } from "react-native"; // For scrolling if reviews are long

const ViewReviews = (props: any) => {

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      review:
        "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua”.",
      reviewer: "John Doe",
    },
    {
      id: 2,
      review:
        "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur”.",
      reviewer: "Jane Smith",
    },
    {
      id: 3,
      review:
        "“Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum”.",
      reviewer: "Michael Brown",
    },
  ];

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Reviews" centerImg={false} />
      
      <ScrollView style={{flex:1}}>
        <View paddingH-20>
          <Typography
            size={22}
            textType="semiBold"
            color={theme.color.primary}
            style={{ marginVertical: 0 }}
          >
            User Reviews
          </Typography>

          {reviews.map((review) => (
            <Card
              key={review.id}
              style={{
                marginBottom: 0,
                paddingVertical: 5,
                backgroundColor: theme.color.white,
                borderRadius: 10,
                // shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2, // Android shadow
              }}
            >
              <Typography color={theme.color.descColor}>
                {review.review}
              </Typography>

              <Typography
                textType="semiBold"
                size={16}
                color={theme.color.primary}
                style={{ marginTop: 10 }}
              >
                - {review.reviewer}
              </Typography>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default ViewReviews;
