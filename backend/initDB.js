const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 

module.exports = () => {
 config();
 const uri = process.env.DB_URI;

 connect(uri, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connexion à MongoDB réussie !');
        })
        .catch(error => console.error(error.message));
}