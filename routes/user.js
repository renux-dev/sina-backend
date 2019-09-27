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

//queryData
//User
router.post('/getUser',(req,res)=>{
    var id = req.body.id
    
    knex('Users').where({
        //username: username
        id: id
    }).select('id','username','password','email','status_relawan','alamat','kokab','provinsi','gender','tgl_lahir','no_telp').then(data =>{
        // if(data[0][2] !== password){
        //     console.log(data[0][0])
        if(data[0].id == id){
            res.send({
                success : true,
                id : data[0].id,
                username : data[0].username,
                email : data[0].email,
                alamat: data[0].alamat,
                kokab: data[0].kokab,
                provinsi: data[0].provinsi,
                gender: data[0].gender,
                tgl_lahir: data[0].tgl_lahir,
                no_telp: data[0].no_telp,
                status_relawan : data[0].status_relawan
            })
        }else{
            //console.log('gagal')
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

//Posko
router.post('/getPosko',(req,res)=>{
    var id = req.body.id
    var valid = 1

    knex('Posko').where({
        //username: username
        id: id,
        valid: valid
    }).select('id_posko','nama_posko','alamat','kab_kota','provinsi','pengampu','no_telp','foto','id','valid').then(data =>{
        // if(data[0][2] !== password){
            // console.log(data)
        if(data[0].id == id && data[0].valid == 1){
            res.send({
                success : true,
                data : data
                // id_posko : data[0].id_posko,
                // nama_posko : data[0].nama_posko,
                // alamat : data[0].alamat,
                // kab_kota : data[0].kab_kota,
                // provinsi : data[0].provinsi,
                // pengampu : data[0].pengampu,
                // no_telp : data[0].foto,
                // id : data[0].id,
                // valid : data[0].valid
            })
        }else{
            //console.log('gagal')
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

//Artikel
router.post('/getArtikel', (req,res) => {
    var id = req.body.id
    var mark = 1

    knex('Artikel').where({
        //username: username
        id: id,
        mark: mark
    }).select('id_artikel','tittle','written','date','location','time','deskripsi','luka','meninggal','img','mark').then(data =>{
        //console.log(data)
        if(data[0].mark == 1){
            res.send({
                success : true,
                data : data
            })
        }else{
            //console.log('gagal')
            res.send({
                success : false
            })
        }
    }).catch(err => {
        res.send({
            success : false
        })
        //console.log(err) //uncomment to see err
    })
})

router.get('/getArtikelAll', (req,res) => {
    var mark = 1
    console.log("test")
    knex('Artikel').where({
        mark: mark
    }).select('id_artikel','tittle','written','date','location','time','deskripsi','luka','meninggal','img','mark').then(data =>{
        res.send({
            success : true,
            data : data
        })
    })   
})

// router.post('/getArtikelAll', (req,res) => {
//     var id = req.body.id
//     var mark = 1
//     knex('Users').where({
//         id : id
//     }).select('id').then(dataID =>{
//         if(dataID.length != 0){
//             knex('Artikel').where({
//                 mark: mark
//             }).select('id_artikel','tittle','written','date','location','time','deskripsi','luka','meninggal','img','mark').then(data =>{
//                 res.send({
//                     success : true,
//                     data : data
//                 })
//             })
//         }else{
//             //console.log('idSalah')
//             res.send({
//                 success : false
//             })
//         }
//     })
// })


router.post('/login', (req,res) => {
// router.post('/login', (req,res) => {
        //var username = req.body.username
        var email = req.body.email
        var password = req.body.password
    
        knex('Users').where({
            //username: username
            email: email
        }).select('id','password'/*'username','email','status_relawan'*/).then(data =>{
            // if(data[0][2] !== password){
            //     console.log(data[0][0])
            if(data[0].password == password){
                res.send({
                    success : true,
                    id : data[0].id
                    // username : data[0].username,
                    // email : data[0].email,
                    // status_relawan : data[0].status_relawan
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
    //var alamat = 0
    //var no_telp = 0
    var status_relawan = 0;
    
    knex.select("username").from("Users").where("username", username).then(data1 => {
        //console.log(data.length)
        if (data1.length === 0) {
            knex.select("email").from("Users").where("email", email).then(data2 => {
                if (data2.length === 0) {
                    knex('Users').insert({username,email,password,status_relawan}).then((newUserId) => {
                        res.send({
                            success: true, 
                            id: newUserId[0]
                            // username : username,
                            // email: email,
                            // status_relawan: status_relawan
                        })
                    })
                }else{
                    res.send({
                        success : false
                    })
                }
            })
        }else{
            res.send({
                success : false
            })
        }
    })

})

router.post('/updateProfile', (req,res) => {
    var id = req.body.id
    var username = req.body.username
    var alamat = req.body.alamat
    var kokab = req.body.kokab
    var provinsi = req.body.provinsi
    var gender = req.body.gender
    var tgl_lahir = req.body.tgl_lahir
    var no_telp = req.body.no_telp
    var status_relawan = 1

    knex.select("id").from("Users").where("id", id).then(data => {
        if (data.length != 0) {
            knex('Users').where({ id: id }).update({
                username: username,
                alamat: alamat,
                kokab: kokab,
                provinsi: provinsi,
                gender: gender,
                tgl_lahir: tgl_lahir,
                no_telp: no_telp
            }, ['id', 'username']
            ).then((updatedRows) => {
                // updatedRows === [{id: 42, title: 'The Hitchhiker's Guide to the Galaxy'}]
            })
            res.send({
                success : true
            })
        }else{
            res.send({
                success : false
            })
        }
    })

    knex.select("")
})


//Artikel

router.post('/createArtikel',(req,res) => {
	var tittle = req.body.tittle
	var written = req.body.written
	var date = req.body.date
	var location = req.body.location
	var time = req.body.time
	var deskripsi = req.body.deskripsi
	var luka = req.body.luka
    var meninggal = req.body.meninggal
    var id = req.body.id
    var img = req.body.img
    var mark = 0


    knex.select("tittle").from("Artikel").where("tittle", tittle).then(data => {
       // console.log(data)
        if (data.length === 0) {
            knex('Artikel').insert({
                tittle,
                written,
                date,
                location,
                time,
                deskripsi,
                luka,
                meninggal,
                img,
                id,
                mark
            }).then((newArtikelId) => {
                res.send({
                    success: true, 
                    id_artikel: newArtikelId[0]
                })
            })
        }else{
            res.send({
                success : false
            })
        }
    })
    
})

// router.post('/upload', function(req, res, next) {
//     let img = req.files.img
//     let name = req.body.name;
//     let link = 'D:\SiNa\img'+name
//     if (img == undefined ){
//          console.log("no file uploaded") 
//     }else {
//         // Use the mv() method to place the file somewhere on your server
//         img.mv(link, function(err) { 
//             if (err) return res.status(500).send(err);
//             res.send(
//                 succses : true,
//                 {"file" : "D:\SiNa\img"+name, "name" : name}
//             );
//         });
//     }
// });

// router.post('/upload', authenticationUser, function(req, res, next) {
//     let img = req.files.img; let name = req.body.name;
//     let link ='./public/images/'+name
//     if (img == undefined ){
//          console.log("no file uploaded") 
//     }else {
//         // Use the mv() method to place the file somewhere on your server
//         img.mv(link, function(err) { 
//             if (err) return res.status(500).send(err);
//             res.send({"file" : "D:\SiNa\img"+name, "name" : name});
//         });
//     }
// });


//modul posko

router.post('/createPosko', (req,res) => {
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