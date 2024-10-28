const mongoose = require('mongoose');
const dbURI = "mongodb+srv://romanhnatyshyn:roman12345@cluster0.z31d5.mongodb.net/Gamer2?retryWrites=true&w=majority&appName=Cluster0";
try {
mongoose.connect(
    dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {console.log("Mongoose is connected")},
    err=> {console.log(err)}
    );
}
catch (e) {
    console.log("could not connect");
}
require('./games');
require('./users');