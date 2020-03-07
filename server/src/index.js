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


//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/create', async(req, res) => {
    const { userName } = req.query;
    const user = await models.User.create({
        userName
    });
    res.json({
        message:'success',
        user
    })
})

app.get('/test', (req,res) => {
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