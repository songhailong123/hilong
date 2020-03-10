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
//查找用户是否已存在
app.post('/findUser', async(req, res) => {
    const { userName } = req.body;
    const result = await models.User.findOne({
        where:{userName:userName}
    });
    const data = result ? result :{};
    res.send({
        message:'success',
        user:data
    })

})

// 创新用户
app.post('/createUser', async (req, res) => {
    const { userName, passWord} = req.body;
    const user = await models.User.create({
        userName:userName,
        passWord:passWord
    });
    res.json({
        message:'success',
    })
})
// 添加列表
app.get('/addList', async (req,res) => {
    const detailData = req.query;
    const user = await models.List.create({
        ...detailData
    });
    res.send({
        message:'success',
        detailData
    })
});
// 查询列表
app.get('/searchList', async (req,res) => {
    const {page} = req.query;
    const where = {};
    const limit = 10;
    Object.keys(req.query).forEach(item => {
        if (item !== 'page'){
            if(item === 'date'){
                where[item] = req.query[item];
            } else {
                where[item] = Number(req.query[item]);
            }
        }
    });
    console.log(req.query);
    console.log(where)
    const offset = (page-1)*limit;
    const list = await models.List.findAndCountAll({
        where:where,
        offset,
        limit
    });
    res.send({
        message:'success',
        list
    })
});
// 查询详情
app.get('/detail', async (req,res) => {
    const {id} = req.query;
    const user = await models.List.findOne({
        where:{
            id
        }
    });
    res.send({
        message:'success',
        user
    })
});

// 更新列表
app.post('/updateList', async (req, res) => {
    const {id} = req.body;
    const list = await models.List.update(
        req.body,
        {
            where:{
                id
            }
    });
    res.json({
        message:'success',
    })
})

// 删除列表
app.get('/deleteList', async (req,res) => {
    const {id} = req.query;
    const user = await models.List.destroy({
        where:{
            id
        }
    });
    res.send({
        message:'success',
    })
});

app.listen(3000, () => {
    console.log('start success')
})