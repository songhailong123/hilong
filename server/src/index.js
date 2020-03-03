const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const models = require('../models');//模型对象

// models.user.....
// models.Sequelize 静态类
// models.sequelize 实例对象
const app = express();
app.use(bodyParse.json());
app.use(morgan("combined"));

app.get('/create', async(req, res) => {
    const { firstName } = req.query;
    const user = await models.User.create({
        firstName
    });
    res.json({
        message:'success',
        user
    })
})

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

app.listen(3000, () => {
    console.log('start success')
})