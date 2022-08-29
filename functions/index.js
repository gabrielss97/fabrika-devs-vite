/* eslint-disable arrow-body-style */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Pegar o usuário e adicionar um Custom Claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Sucesso! ${data.email} se tornou um administrador`,
      };
    })
    .catch((err) => {
      return err;
    });
});
