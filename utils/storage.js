const { v4 } = require("uuid");
const app = require("../config/firebase");
require("firebase/storage");

exports.uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const type = image.originalname.split(".")[1];
      const imageKey = `${image.fieldname}${v4()}.${type}`;
      const storage = app.storage().ref();
      const imageRef = storage.child(imageKey);
      const snapshot = await imageRef.put(image.buffer);
      const imageUrl = await snapshot.ref.getDownloadURL();
      resolve({ imageUrl, imageKey });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
