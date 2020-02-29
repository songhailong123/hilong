const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(bodyParse.json());
app.use(morgan("combined"));

app.get('/api', (req,res) => {
    res.send({
        msg:'hilong'
    })
})
app.post('/user', (req, res) => {
   console.log(req.body);
   res.send({
       code:200,
       data:req.body
   })
})
app.listen(8000,() => {
    console.log(1);
})