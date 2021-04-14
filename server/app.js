const express = require('express');
const app = express();
const port  = 3065;
const postRouter = require('./routes/post');


app.get('/', (req, res) => {
  res.send('hello exporess');
});

app.get('/api', (req, res) => {
  res.send('hello api');
})

app.get('/api/posts', (req, res) => {
  res.json([
    {id: 1, content: 'hello'},
    {id: 2, content: 'hello2'},
    {id: 3, content: 'hello3'},
  ])
});


app.use('/post', postRouter);


app.listen(port, () => {
  console.log(`server is running on port ${port}!`)
});