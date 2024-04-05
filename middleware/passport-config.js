// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const { User } = require('../models/index');
const { User } = require('../models/database1/user');

console.log('User - ', User);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // console.log('hello:-',user.id);
      // const newPassword = 'Admin@54321'; // New password
      // const success = await changePassword(user.id, newPassword);
      // if (success) {
      //   console.log('Password updated successfully.');
      // } else {
      //   console.log('Failed to update password.');
      // }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// // Function to update user's password
// async function changePassword(userId, newPassword) {
//   try {
//     const hashedPassword = bcrypt.hashSync(newPassword, 10);
//     await User.update({ password: hashedPassword }, { where: { id: userId } });
//     return true; // Password updated successfully
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return false; // Failed to update password
//   }
// }
module.exports = passport;
