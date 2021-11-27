const mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'mysql5031.site4now.net',
    user     : 'a7a682_moncake',
    password : 'Klapaucius1.',
    database : 'db_a7a682_moncake'
  });

exports.pool = pool
exports.format = mysql.format

