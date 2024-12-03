const mongoose = require('mongoose');
// make sure to use your own URL to your own cloud database next
const dbURI = "mongodb+srv://romanhnatyshyn:roman12345@cluster0.z31d5.mongodb.net/Gamer2?retryWrites=true&w=majority";

try {
   
mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
	);
}
 catch (e) {
  console.log("could not connect");
}
require('./games');
require('./users');