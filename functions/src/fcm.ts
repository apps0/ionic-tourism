import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const sendNotification = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().sendToDevice(data.token, data.message);

    return true;
  }
);

export const subscribeToTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().subscribeToTopic(data.token, data.topic);

    return `subscribed to ${data.topic}`;
  }
);

export const unsubscribeFromTopic = functions.https.onCall(
  async (data, context) => {
    await admin.messaging().unsubscribeFromTopic(data.token, data.topic);

    return `unsubscribed from ${data.topic}`;
  }
);

export const sendOnFirestoreCreate = functions.firestore
  .document("tourismChats/{roomId}/{messageCollectionId}/{messageId}")
  // .document("tourismChats/{chatId}")
  .onCreate(async snapshot => {
    const chat = snapshot.data();

    const notification: admin.messaging.Notification = {
      title: chat.From.FullName,
      body: chat.MessageText
    };
    
    const payload: admin.messaging.Message = {
      notification,
      webpush: {
        notification: {
          vibrate: [200, 100, 200]
        }
      },
      token: chat.To.DeviceToken
    };
    console.log(chat);
    return admin.messaging().send(payload);
  });
