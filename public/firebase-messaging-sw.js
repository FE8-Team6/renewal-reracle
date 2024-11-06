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
    icon: "/REracle.svg",
  };

  self.registration.showNotification(title, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const redirectUrl = event?.notification?.data?.redirectUrl || "/announcement";

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
