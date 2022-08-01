const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/movies', (req, res) => {
    connection.query(
      "SELECT * FROM MOVIE",
      (err, rows, fields) => {
          res.send(rows);
      }
    );
});

app.use('/image', express.static('./upload'));

app.post('/api/movies', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO MOVIE VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let title = req.body.title;
    let releaseYear = req.body.releaseYear;
    let runTime = req.body.runTime;
    let directorName = req.body.directorName;
    
    let params = [image, title, releaseYear, runTime, directorName];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
