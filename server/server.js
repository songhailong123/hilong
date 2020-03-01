const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const sequelize = require('./models/index');

const app = express();
app.use(bodyParse.json());
app.use(morgan("combined"));


app.get('/api', (req,res) => {
    res.send({
        msg:'hilong'
    })
});

app.post('/user', (req, res) => {
   console.log(req.body);
   res.send({
       code:200,
       data:req.body
   });
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })
app.listen(8081,() => {
    console.log(1);
})