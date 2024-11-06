importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBN3DWCVIUc05MLqFeY_FI5Y2x8UpmxJUI",
  authDomain: "web-game-5b1b6.firebaseapp.com",
  projectId: "web-game-5b1b6",
  storageBucket: "web-game-5b1b6.appspot.com",
  messagingSenderId: "512220286729",
  appId: "1:512220286729:web:32be683c83ad211b0d8dd8",
  measurementId: "G-080QL0GFHM",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + " (onBackgroundMessage)";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://avatars.githubusercontent.com/u/110236953?v=4",
  };

  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const redirectUrl = event?.notification?.data?.redirectUrl;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (const client of clientList) {
          if (client.url === redirectUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(redirectUrl);
        }
      })
  );
});

/**
 * @description 오프라인 지원
 */

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
