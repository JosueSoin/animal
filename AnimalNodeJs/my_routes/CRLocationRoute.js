var express = require('express');

const mySqlModule = require('../my_modules/MySqlModule');
const MyModels = require('../my_modules/MyModelModule');

var router = express.Router();


router.get('/getProvince',(req,res)=>{
    var queryStringSelect = "select * from cr_province"
    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(queryStringSelect,(err,result)=>{
            if (err){ 
                throw err.message;
            }
            res.json(new MyModels.CustomResponseModel(200,result));
        })  
    })

})

router.post('/getCanton',(req,res)=>{
    var queryStringSelect = "select * from cr_canton where id_province = ?"
    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(mySqlModule.format(queryStringSelect,[req.body.province]),(err,result)=>{
            if (err){ 
                throw err.message;
            }
            res.json(new MyModels.CustomResponseModel(200,result));
        })  
    })
    
})

exports.router = router;