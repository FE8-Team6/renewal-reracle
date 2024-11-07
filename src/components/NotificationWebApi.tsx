import { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app, auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const NotificationWebApi = () => {
  useEffect(() => {
    const messaging = getMessaging(app);

    /**
     * @description 알림 권한 요청
     * @description Firestore에 유저의 FCM Token 저장 코드 추가
     */
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPID_KEY,
        });
        console.log("FCM Token:", token);
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          await setDoc(userDoc, { fcmToken: token }, { merge: true });
        }
      }
    };

    /**
     * @description 포그라운드 알림 수신
     */
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      if (
        payload.notification &&
        payload.notification.title &&
        payload.notification.body
      ) {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "REracle.svg",
        });
      }
    });

    requestPermission();
  }, []);

  return <div></div>;
};

export default NotificationWebApi;