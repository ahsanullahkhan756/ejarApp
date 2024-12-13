import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging"; // Import Firebase messaging library
import {
  messageHandler,
  onForegroundEvent,
  handleNotificationOpenedApp,
  requestNotificationPermission,
} from "../utils/notifications";
interface RemoteMessageData {
  custom?: string;
}

const useFirebaseMessaging = () =>
  //   messageHandler: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void,
  //   handleNotificationOpenedApp: (data: any, timeout?: number) => void,
  //   onForegroundEvent: () => () => void, // Assuming this is another function returning unsubscribe handler
  {
    requestNotificationPermission();
    useEffect(() => {
      const unsubscribeOnMessage = messaging().onMessage(
        async (remoteMessage) => {
          if (remoteMessage) {
            messageHandler(remoteMessage);
          }
        }
      );

      const unsubscribeOnNotificationOpenedApp =
        messaging().onNotificationOpenedApp((remoteMessage) => {
          if (remoteMessage) {
            const data: RemoteMessageData = JSON.parse(
              remoteMessage.data?.custom || "{}"
            );
            handleNotificationOpenedApp(data);
          }
        });

      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            const data: RemoteMessageData = JSON.parse(
              remoteMessage.data?.custom || "{}"
            );
            handleNotificationOpenedApp(data, 5000); // Adjust timeout as needed
          }
        });

      const unsubscribeForegroundEvent = onForegroundEvent();

      return () => {
        unsubscribeOnMessage();
        unsubscribeOnNotificationOpenedApp();
        unsubscribeForegroundEvent();
      };
    }, []);
  };

export default useFirebaseMessaging;
