const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = mongoose.model('User');

const usersCreate = async function(req, res) {
  try {
    console.log('Received data:', req.body);

    const user = await User.create({
      username: req.body.username,
      password: req.body.password, 
      email: req.body.email
    });

    console.log('Created User:', user); 
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  
const login = function(req, res, next) {
  try {
      console.log('Login route called');
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          console.log('Error in passport authenticate:', err);
          return next(err);
        }
        if (!user) {
          console.log('Authentication failed:', info.message);
          return res.status(401).json({ message: info.message });
        }
        req.logIn(user, function(err) {
          if (err) {
            console.log('Error in req.logIn:', err);
            return next(err); 
          }
          req.session.user = user; 
          return res.status(200).json({ message: 'Authentication successful', user });
        });
      })(req, res, next);
  } catch (error) {
      console.error("Unexpected error in login:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};
  

const logout = function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.status(200).json({ success: true });  // Send success response on logout
    });
  });
};

  
  module.exports = {
    usersCreate,
    login,
    logout
  };