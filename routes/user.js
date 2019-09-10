var express   = require('express');
var router    = express.Router();
// var moment    = require('moment-timezone');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'sina'
    }
});

router.get('/', (req,res) => {
    console.log("test")
})

router.post('/', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
})


module.exports = router