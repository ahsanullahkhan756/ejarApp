import React, { useEffect, useState } from "react";
import { StyleSheet, SectionList, ActivityIndicator } from "react-native";
import { View } from "react-native-ui-lib";
import SafeAreaContainer from "../../containers/SafeAreaContainer";
import { IMAGES, theme } from "../../constants";
import { Header } from "../../components/atoms/Header";
import { SearchBar } from "../../components/atoms/SearchBar";
import { scale } from "react-native-size-matters";
import { Typography } from "../../components/atoms/Typography";
import { notificationApi } from "../../api/homeServices";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../redux/slice/user";

const Notification = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const isLoading = useSelector((state) => state?.user?.isLoading);

  const handleNotificationApi = async () => {
    dispatch(setIsLoading(true));
    try {
      const resp = await notificationApi();
      console.log("API Response:", resp);
      if (resp && resp.length > 0) {
        setNotifications(resp);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setNotifications([]);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    handleNotificationApi();
  }, []);

  return (
    <SafeAreaContainer safeArea={false}>
      <Header titleText="Notifications" centerImg={false} />
      <View margin-20>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.color.primary} />
        ) : notifications.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <Typography style={styles.noResultsText}>
              No notifications found
            </Typography>
          </View>
        ) : (
          <SectionList
            sections={notifications}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Typography>{item.title}</Typography>
                <Typography color={theme.color.descColor}>
                  {item.body || "Lorem ipsum dolor sit amet, consectetur"}
                </Typography>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Typography
                textType="bold"
                color={theme.color.blue}
                size={theme.fontSize.large20}
              >
                {title}
              </Typography>
            )}
          />
        )}
      </View>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: theme.color.descColor,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: theme.color.descColor,
    fontWeight: "bold",
  },
});

export default Notification;
