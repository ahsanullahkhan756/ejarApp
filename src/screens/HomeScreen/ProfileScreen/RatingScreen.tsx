import React, { useState } from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { Button, View } from "react-native-ui-lib";
import SafeAreaContainer from "../../../containers/SafeAreaContainer";
import { Header } from "../../../components/atoms/Header";
import StarRating from "react-native-star-rating-widget";
import { commonStyles } from "../../../containers/commStyles";
import { scale } from "react-native-size-matters";
import { IMAGES, theme } from "../../../constants";
import { onBack } from "../../../navigation/RootNavigation";
import { getHomeApi, giveRating } from "../../../api/homeServices";
import { showToast } from "../../../utils/toast";

const RatingScreen = ({ route }) => {
  const data = route?.params?.details;
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const sendRating = async() => {
    try {
      
    
    const obj = {
      refrence: data?.ID,
      email: "will reove that",
      comment: comment,
      stars: rating,
    };
    const response = await giveRating(obj);
    if (response != null) {
      showToast({title: "Rating Successfully Done", isError:false})
      onBack()
    }
  } catch (error) {
      
  }

  };

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={"Rating & Reviews"} centerImg={false} />

      <View marginH-20 style={{ alignItems: "center" }}>
        <StarRating
          rating={rating}
          onChange={setRating}
          color="#FEAD1D"
          starSize={40}
        />

        <View style={[commonStyles.cardWithShadow, styles.inputContainer]}>
          <Image
            source={IMAGES.editIcon}
            style={styles.icon}
            resizeMode="contain"
          />

          <TextInput
            onChangeText={(e) => {
              setComment(e);
            }}
            value={comment}
            placeholder="Leave review"
            style={styles.textInput}
            multiline
          />
        </View>

        <Button
          label="Submit Review"
          backgroundColor={theme.color.primary}
          borderRadius={30}
          onPress={() => {
            sendRating();
          }}
          // onPress={() => onBack()}
          style={{ height: 50, margin: 20, width: "50%", alignSelf: "center" }}
        />
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    marginTop: 20,
    borderWidth: 0.2,
    // height: '100%'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    height: 150,
    flex: 1,
  },
});

export default RatingScreen;
