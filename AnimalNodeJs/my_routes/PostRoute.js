var express = require('express');

const mySqlModule = require('../my_modules/MySqlModule');
const MyModels = require('../my_modules/MyModelModule');
const Util = require('util');
const { Console } = require('console');

var router = express.Router();

router.post('/addPost',(req,res)=>{

    req.body
    var queryInsertPost = "insert into an_post(id_user,id_cr_province,id_cr_canton,text,type,status) values(?,?,?,?,?,?)"
    var queryInsertMedia = "insert into an_media_post(id_an_post,path) values(?,?)"
    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(mySqlModule.format(queryInsertPost,[req.body.user,req.body.province,req.body.canton,req.body.text,req.body.type,req.body.status]),async (err,resultPost)=>{
            if (err){ 
                throw err.message;
            }

            for (var path of req.body.paths) {  
                await new Promise((resolve, reject)=>{
                    connection.query(mySqlModule.format(queryInsertMedia,[resultPost.insertId,path]),(err,result)=>{})
                    resolve();
                })
            }

            res.json(new MyModels.CustomResponseModel(200,resultPost.insertId));
        })  
    })
    
})

router.get('/getPostList',(req,res)=>{

    var querySelectPost = "select an_post.id, an_post.id_user, user.email, an_post.id_cr_province, an_post.id_cr_canton, an_post.text, an_post.type, an_post.status   from an_post INNER JOIN user ON an_post.id_user = user.id where 1=1"
    var querySelectMedia = "select * from an_media_post where id_an_post = ?"

    if(req.query.province != null && req.query.canton != null){
        querySelectPost += " and id_cr_province = ? and id_cr_canton = ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.province),Number(req.query.canton)])
    }else if(req.query.province != null){
        querySelectPost += " and id_cr_province = ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.province)])
    }

    if(req.query.type != null){
        querySelectPost += " and type = ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.type)])
    }

    if(req.query.status != null){
        querySelectPost += " and status = ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.status)])
    }

    if(req.query.limit != null){
        querySelectPost += " LIMIT ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.limit)])
    }

    if(req.query.skip != null){
        querySelectPost += " OFFSET ?"
        querySelectPost = mySqlModule.format(querySelectPost,[Number(req.query.skip)])
    }

    mySqlModule.pool.getConnection((err, connection) => {
        connection.query(querySelectPost,async(err,resultSelectPost)=>{
            if (err){ 
                throw err.message;
            }

            if(resultSelectPost.length == 0){
                res.json(new MyModels.CustomResponseModel(200,[]));
            }else{
                var list = []

                var index = 0
    
                do{
    
                    var postModel = new MyModels.PostModel(
                        resultSelectPost[index].id,
                        resultSelectPost[index].id_user,
                        resultSelectPost[index].email,
                        resultSelectPost[index].id_cr_province,
                        resultSelectPost[index].id_cr_canton,
                        resultSelectPost[index].text,
                        resultSelectPost[index].type,
                        resultSelectPost[index].status
                        )
    
                    await new Promise((resolve, reject)=>{
                        connection.query(mySqlModule.format(querySelectMedia,[resultSelectPost[index].id]),(err,resultSelectMedia)=>{
    
                            for (const media of resultSelectMedia) {  
                                postModel.pathList.push(new MyModels.MediaPostModel(media.id,media.id_an_post,media.path))
                            }
                            
                            index++
                            resolve();
                        })
                    })
    
                        
                    list.push(postModel)
    
                } while (index < resultSelectPost.length)
    
                res.json(new MyModels.CustomResponseModel(200,list));
            }
        })  
    })
    
})


exports.router = router;