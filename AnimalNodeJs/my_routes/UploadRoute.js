var express = require('express');

const MyModels = require('../my_modules/MyModelModule');
const myMulterStorage = require('../my_modules/MyMulterStorageModule');

var router = express.Router();

router.post('/uploadFile',myMulterStorage.upload.single("fileSave"),(req,res)=>{
    res.json(new MyModels.CustomResponseModel(200,req.file.filename));
})

exports.router = router;