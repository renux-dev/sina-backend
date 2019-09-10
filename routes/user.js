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

router.get('/test', (req,res) => {
    console.log("test")
    knex.raw('select * from ayam').then(data => {
        res.send(data[0])
    })
})

router.get('/login', (req,res) => {
    var username = req.body.username
    var password = req.body.password

    knex('Users').where({
        username: username
    }).select('id','username','password').then(data =>{
        if(data[0][2] !== password){
            console.log(data[0][0])
        }else{
            console.log('gagal')
        }
    })
})

module.exports = router