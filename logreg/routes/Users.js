const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sql = require('../database/db');
const bcrypt = require('bcrypt');

users.use(cors());

users.post('/register',function(req,res){
    console.log(req.body.email);
    const today = new Date();
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var created = today; 

    sql.query('select id from users where first_name = ? ',[first_name],function(err,result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                res.send('already registered');
            }
            else{
                bcrypt.hash(password,10,function(err1,hash){
                    sql.query('insert into users (first_name,last_name,email,password,created) values (?,?,?,?,?)',[first_name,last_name,email,password,created],function(err3,result3){
                        if(err3){
                            //throw err3;
                            res.send('error'+err)
                        }
                        else{
                            console.log(result3);
                            res.json(result3+'registered');
                        }
                    })
                })
                //const saltRounds = 10
 
                // bcrypt.genSalt(saltRounds, function (err, salt) {
                // if (err) {
                //     throw err
                // } else {
                //     bcrypt.hash(password, salt, function(err, hash) {
                //     if (err) {
                //         throw err
                //     } else {
                //         console.log(hash)
                //         sql.query('insert into users (first_name,last_name,email,password,created) values (?,?,?,?,?)',[first_name,last_name,email,hash,created],function(err3,result3){
                //             if(err3){
                //                 //throw err3;
                //                 res.send('error'+err)
                //             }
                //             else{
                //                 res.json(result3+'registered');
                //             }
                //         })
                //         //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
                //     }
                //     })
                // }
                // })
                
            }
        }
    })
});


users.post('/login',function(req,res){
    var password = req.body.password;
    var first_name = req.body.first_name;

    sql.query('select * from users where first_name = ?',[first_name],function(err,result){
        if(err){
            throw err;
        }
        else{
            if(result.length>0){
                var hash = result[0].password;
                // let xx = bcrypt.hashSync(hash,10);
                // console.log(hash);
                // console.log(xx);
                // bcrypt.compare(password, hash, function(err, isMatch) {
                //     if (err) {
                //       throw err
                //     } else if (!isMatch) {
                //       console.log("Password doesn't match!")
                //     } else {
                //       console.log("Password matches!")
                //     }
                //   })

                //   if(bcrypt.compareSync(password, hash)){
                //       console.log('log')
                //   }
                //   else{
                //       console.log('fuck');
                //   }
                console.log(';;;;;;;;;;;;;;;;;;;;;;')
                console.log(hash)
                console.log(password)
                if( hash == password ){
                    console.log('ddddddddddddddddd')
                    
                    console.log(result[0])
                    // let token = jwt.sign(result[0],'secret', {
                    //     expiresIn: 1440
                    // })
                    res.send(result[0])
                    //res.send('tilanga');
                    //res.send(result+'logged')
                }
                else{
                    console.log('aaaaaaaaaaaaaaaaaa')
                    res.send('wrong data');
                }
            }
        }
    })

    // bcrypt.hash(password,10,function(err1,hash){
    //     console.log(hash);
    //     sql.query('select email from users where first_name = ? and password = ?',[first_name,hash],function(err2,result2){
    //         if(err2){
    //             throw err2;
    //         }
    //         else{
    //             if(result2.length>0){
    //                 res.send('logged');
    //             }
    //             else{
    //                 res.send('worng data');
    //             }
    //         }
    //     })
    // })
    
})


module.exports = users;