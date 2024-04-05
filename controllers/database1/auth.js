const passport = require('../../middleware/passport-config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models/database1/user');

const secretKey = process.env.JWT_SECRET; // Retrieve the secret key from the .env file

const handleLogin = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: '1h', // Token expiration time
      });
  
      // res.json({ token });
      res.status(200).json({ id: user.id, fullname: user.fullname, username: user.username, token });
    })(req, res, next);
};

const handleRegister = async (req, res) => {
  try {
      const { fullname, username, password, description } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullname,  
        username,
        password: hashedPassword,
        description
      });
      res.json(newUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
  }
};

const handleLogout = (req, res) => {
  // Implement user logout logic
}

module.exports = { 
  handleLogin, 
  handleRegister,
  handleLogout
};