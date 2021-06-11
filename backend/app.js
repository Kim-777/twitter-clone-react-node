const express = require('express');
const app = express();
const post = require('./routes/post');
const db = require('./models');
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
app.use('/post', post);

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('hello api');
})


app.listen(3065, () => {
    console.log('서버 실행 중');
});