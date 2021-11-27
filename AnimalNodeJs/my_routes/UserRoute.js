var express = require('express');

const mySqlModule = require('../my_modules/MySqlModule');
const MyModels = require('../my_modules/MyModelModule');

var router = express.Router();


router.post('/addUser',(req,res)=>{
    var queryStringInsert = "insert into user(email,password) values(?,?)"
    var queryStringSelect = "select * from user where email = ?"
    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(mySqlModule.format(queryStringSelect,[req.body.email]),(err,result)=>{
            if (err){ 
                throw err.message;
            }
            if(result.length > 0){
                res.json(new MyModels.CustomResponseModel(400,""));
            }else{
                connection.query(mySqlModule.format(queryStringInsert,[req.body.email,req.body.password]),(err,result)=>{
                    if (err){ 
                        throw err.message;
                    }
                    res.json(new MyModels.CustomResponseModel(200,result.insertId));
                })
            }
        })  
    })
})

router.post('/getUser',(req,res)=>{
    var queryStringSelect = "select * from user where email = ? and password = ?"
    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(mySqlModule.format(queryStringSelect,[req.body.email,req.body.password]),(err,result)=>{
            if (err){ 
                throw err.message;
            }
            if(result.length > 0){
                res.json(new MyModels.CustomResponseModel(200,result[0]));
            }else{
                res.json(new MyModels.CustomResponseModel(400,""));
            }
        })  
    })
})

exports.router = router;