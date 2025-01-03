import React, { useEffect, useState } from "react";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { Typography } from "../../components/atoms/Typography";
import { Header } from "../../components/atoms/Header";
import { theme } from "../../constants";
import { View } from "react-native-ui-lib";
import { getPrivacyApi } from "../../api/auth";
import { setIsLoading } from "../../redux/slice/user";
import { useDispatch } from "react-redux";
import { COMMON_TEXT } from "../../constants/screens";

const Privacy = (props: any) => {
  const title = props?.route?.params?.type || COMMON_TEXT.PRIVACY_POLICY;
  const dispatch = useDispatch();
  const [data, setData] = useState<string>("");

  const handleApi = async () => {
    try {
      const resp = await getPrivacyApi();
      console.log("API Response:", resp);

      if (resp && resp.description) {
        setData(resp.description);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(false));
    handleApi();
  }, []);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText={title} centerImg={false} />
      <View padding-20>
        <Typography color={theme.color.primary}>{title}</Typography>
        <Typography>{data || COMMON_TEXT.LOADING}</Typography>
      </View>
    </SafeAreaContainer>
  );
};

export default Privacy;
