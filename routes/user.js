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

router.post('/login', (req,res) => {
// router.post('/login', (req,res) => {
        //var username = req.body.username
        var email = req.body.email
        var password = req.body.password
    
        knex('Users').where({
            //username: username
            email: email
        }).select('id','username','password','email','status_relawan').then(data =>{
            // if(data[0][2] !== password){
            //     console.log(data[0][0])
            if(data[0].password == password){
                res.send({
                    success : true,
                    id : data[0].id,
                    username : data[0].username,
                    email : data[0].email,
                    status_relawan : data[0].status_relawan
                })
            }else{
                console.log('gagal')
                res.send({
                    success : false
                })
            }
        // }
    }).catch(err => {
        res.send({
            success : false
        })
        //console.log(err) //uncomment to see err
    })
})

router.post('/register', (req,res) => {
    var username = req.body.username
    var password = req.body.password
    var email  = req.body.email
    var status_relawan = 0;
    
    knex.select("username").from("Users").where("username", username).then(data => {
        //console.log(data.length)
        if (data.length === 0) {
            knex('Users').insert({username,email,password,status_relawan}).then((newUserId) => {
                res.send({
                    success: true, 
                    id: newUserId[0],
                    username : username,
                    email: email,
                    status_relawan: status_relawan
                })
            })
        }else{
            res.send({
                success : false
            })
        }
    })

})


//modul posko

router.post('/getPosko', (req,res) => {
	var nama_posko =  req.body.nama_posko
	var alamat = req.body.alamat
	var kab_kota = req.body.kab_kota
	var provinsi = req.body.provinsi
	var pengampu = req.body.pengampu
	var no_telp = req.body.no_telp
    var foto = req.body.foto
    var id = req.body.id
    var valid = 0

    knex.select("nama_posko").from("Posko").where("nama_posko", nama_posko).then(data => {
        //console.log(data)
        if (data.length === 0) {
            knex('Posko').insert({
                nama_posko,
                alamat,
                kab_kota,
                provinsi,
                pengampu,
                no_telp,
                foto,
                id,
                valid
            }).then((err) => {
                res.send({
                    success: true,
                })
            })
        }else{
            res.send({
                success : false
            })
        }
    })
})

module.exports = router