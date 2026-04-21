const admin = require('firebase-admin');

var serviceAccount = require('./firebase_admin.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  if (token=='') {
    return res.status(401).send('Unauthorized');
  }
  
  console.log(`Got token from user: ${token.substring(0,15)}...`);

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // contains uid, email, etc.
    console.log("Token Verified");
    next();
  } catch (err) {
    console.log("Invalid token")
    return res.status(401).send('Invalid token');
  }
}

module.exports = {authenticate};
