const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json())

app.use('/user', require('./my_routes/UserRoute').router);
app.use('/cdn', require('./my_routes/UploadRoute').router);
app.use('/crLocation', require('./my_routes/CRLocationRoute').router);
app.use('/post', require('./my_routes/PostRoute').router);
app.use('/uploads',express.static("uploads"))


app.listen(port,()=>{console.log(`server running on port ${port}`)})