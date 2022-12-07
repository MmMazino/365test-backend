const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '365test'
});

app.use(cors());
app.use(express.json());

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to mysql database = ", err)
        return;
    }
    console.log("Mysql successfully connected!")
})

const product = require('./routes/dataproduct')
app.use(product)

app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
})