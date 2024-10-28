/* GET Register/Login page */
const register = function(req, res){
    res.render('register', { title: 'Welcome!' });
  };
  
  
  module.exports = {
    register
  };