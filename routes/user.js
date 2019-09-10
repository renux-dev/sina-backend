var express   = require('express');
var router    = express.Router();
// var moment    = require('moment-timezone');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'remotemysql.com',
        user : 'OmZxYRRUzD',
        password : 'Xl0XYzktCJ',
        database : 'OmZxYRRUzD'
    }
});

router.get('/', (req,res) => {
    console.log("test")
    knex.raw('select * from ayam').then(data => {
        res.send(data)
    })
})

router.post('/', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
})


module.exports = router