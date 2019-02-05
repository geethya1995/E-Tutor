const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
var schedule = require('node-schedule');

router.post('/boostprofile', (req, res) =>{
    var tutor = req.body.tutor;
    var package = req.body.package;

     var sql = "select * from Tutor where Tutor.email='"+tutor+"' and Tutor.rate>=3";
     var sql2 = "insert into ProfileBoost(email, package, startDate, expiryDate) values('"+tutor+"','"+package+"', CURRENT_TIMESTAMP(), TIMESTAMPADD(DAY,7,CURRENT_TIMESTAMP()))";
     var sql3 = "select * from ProfileBoost where email = '"+tutor+"'";
     var sql7 = "update Tutor set Tutor.priority = 5000 where Tutor.email = '"+tutor+"'";
    

     con.query(sql, (err, result1) => {
        if(err){
            res.json({
               success: false,
               allowed: null,
            //    response: 'error!' 
            });
        }else if(result1.length==0){
            res.json({
               success: false,
               allowed: false,
            //    response: 'Insufficient Rating!' 
            });
        }else{
            con.query(sql3, (err,result2) =>{
                if(err){
                    res.json({
                        success: false,
                        allowed: null,
                     //    response: 'error!' 
                     });
                }
                else if(result2.length == 0){
                    con.query(sql2, (err, result3) =>{
                        if(err){
                            res.json({
                                success: false,
                                allowed: null,
                                // response: 'DB entry error!'
                            });
                        }else{ 
                            var today = new Date();
                            today.setHours(0, 0, 0, 0);
                            var expiry = new Date(new Date().getTime()+(7*24*60*60*1000));
                            var remaining = Math.floor((expiry.valueOf() - today.valueOf()) / (1000*60*60*24));
                            var user = {
                                tutor: tutor,
                                package:  package,
                                start: today,
                                end: expiry,
                                remaining : remaining

                             }
                            res.json({
                                success: true,
                                allowed: true,
                                user: user
                                // response: 'boosted!'
                            });
                            con.query(sql7, (err) => {
                                if(err){
                                    res.json({
                                        success: false,
                                        allowed: null
                                    });
                                }
                            });  
                        }
                    });
                }else{
                    var user = {
                        tutor: result2[0].email,
                        package:  result2[0].package,
                        start: result2[0].startDate,
                        end: result2[0].expiryDate,
                        remaining: (result2[0].expiryDate.valueOf()-result2[0].startDate.valueOf())/(1000*3600*24)
                    }
                    //  console.log(user);
                    res.json({
                        success: true,
                        allowed: false,
                        user: user
                        // response: 'Profile is already boosted!'
                    }); 
                }
            });
        }             
     });
});


 
module.exports = router;
