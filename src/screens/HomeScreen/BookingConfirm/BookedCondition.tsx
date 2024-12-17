import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native-ui-lib";
import { IMAGES, theme } from "../../../constants";
import { Typography } from "../../../components/atoms/Typography";
import { commonStyles } from "../../../containers/commStyles";
import { onBack } from "../../../navigation/RootNavigation";
import { getAllConditions } from "../../../api/homeServices";

const BookedCondition = (props: any) => {
  const [list, setList] = useState([]);
  const getConditions = async () => {
    try {
      const resp = await getAllConditions(props?.id);
      if (resp?.Data != null) {
        setList(resp?.Data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getConditions();
  }, []);

  // const data = [
  //   {
  //     title: "Lorem Ipsum is simply dummy text",
  //   },
  //   {
  //     title: "The printing and typesetting industry.",
  //   },
  //   {
  //     title: "Lorem Ipsum has been the industry's ",
  //   },
  //   {
  //     title: "Standard dummy text ever since.",
  //   },
  //   {
  //     title: "When an unknown printer took a galley",
  //   },
  // ];

  return (
    <View>
      {list?.length != 0 && (
        <>
          <View row spread style={{ alignItems: "center" }}>
            <Typography
              textType="bold"
              size={theme.fontSize.large20}
              color={theme.color.blue}
            >
              Renting Conditions
            </Typography>
            {/* <TouchableOpacity onPress={()=>{onBack()}}>
          <Image
            source={IMAGES.pencil}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
          </View>
          <View style={{ borderWidth: 0.2, borderRadius: 10 }}>
            {list.map((i) => {
              return (
                <View row style={{ alignItems: "center" }} gap-10 padding-10>
                  <View style={commonStyles.innerCircle} />
                  <Typography>{i?.conditions}</Typography>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

export default BookedCondition;
