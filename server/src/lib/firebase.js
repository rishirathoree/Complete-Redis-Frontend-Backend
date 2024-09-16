const admin = require('firebase-admin');
const serviceAccountJson = require("./serviceaccountkey.lib.js");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson)
  });
}

const sendFcmNotification = async (users, body) => {
  const payload = {
    notification: body
  };

  const response = await admin.messaging().send({
    token: users,
    ...payload,
  });
};

const sendFcmNotificationToEveryOne = async (users, body) => {
  const payload = {
    notification: body
  };

  const chunkedUsers = chunkArray(users, 1000); 

  const promises = chunkedUsers.map(async (chunk) => {
    const response = await admin.messaging().sendMulticast({
      tokens: chunk,
      ...payload,
    });
    console.log("Successfully sent notification:", response);
    return response;
  });

  return Promise.all(promises);
};

function chunkArray(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}

module.exports = {
  sendFcmNotification,
  admin
};


module.exports = {
  sendFcmNotification,
  sendFcmNotificationToEveryOne,
  admin,
};
