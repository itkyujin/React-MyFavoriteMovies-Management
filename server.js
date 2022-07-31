const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/movies', (req, res) => {
    res.send([
        {
          'id': 1,
          'image': 'http://purekorea1.dothome.co.kr/avatar.jpg',
          'title': 'Avatar',
          'releaseYear': '2009',
          'runTime': '162',
          'directorName': 'James Cameron'
        },
        {
          'id': 2,
          'image': 'http://purekorea1.dothome.co.kr/Jurassic.jpg',
          'title': 'Jurassic World',
          'releaseYear': '2015',
          'runTime': '124',
          'directorName': 'Colin Trevorrow'
        },
        {
          'id': 3,
          'image': 'http://purekorea1.dothome.co.kr/LionKing.jpg',
          'title': 'The Lion King',
          'releaseYear': '2019',
          'runTime': '89',
          'directorName': 'Roger Allers'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
