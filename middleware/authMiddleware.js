// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Retrieve the secret key from the .env file

const authenticateJWT = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization; 
  if(!authHeader) return res.sendStatus(401); // Unauthorized
  //console.log(authHeader); // Bearer Token

  if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };
