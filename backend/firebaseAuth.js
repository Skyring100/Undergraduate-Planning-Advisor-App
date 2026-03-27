const admin = require('firebase-admin');

var serviceAccount = require('./firebase_admin.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;