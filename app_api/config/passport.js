const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { comparePassword } = require('../utils/passwordUtils');

passport.use(new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  try {
    console.log('Attempting to authenticate user:', username); 
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username.' });
    }

    console.log('User found, comparing passwords...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password.'});
    }
    console.log('Authentication successful');
    return done(null, user);
  } catch (err) {
    console.error('Error during authentication:', err);
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});