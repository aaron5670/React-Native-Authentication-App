const mongoose = require('mongoose');
require('./database/model/users');
const db = mongoose.connection;
const Users = mongoose.model('Users');
const dbConfig = require('./config');

//First code line is for Localhost
mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection success")
    return seedUsers();
}).catch(err => {
    console.log(err);
}).then(() => {
    db.close();
});

async function seedUsers() {
    await Users.deleteMany();
}
