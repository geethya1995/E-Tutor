const express = require('express');
const router = express.Router();
const con = require('../databse/db');
var schedule = require('node-schedule');


////daily boost expiry schedule
function BoostExpiryDailyCheckup(){
    var sql4 = "select * from ProfileBoost where ProfileBoost.expiryDate < CURRENT_TIMESTAMP";

    con.query(sql4, (err, result) =>{
        if(err){
            console.log(err);   
        } 
        else{
            for(var i=0; i<result.length; i++){
                var sql5 = "delete from ProfileBoost where ProfileBoost.email = '"+result[i].email+"'";
                var sql6 = "update Tutor set Tutor.priority=200 where Tutor.email = '"+result[i].email+"'";

                con.query(sql5, (err) => {
                    if(err){
                        console.log(err);
                    } else{
                        con.query(sql6, (err) => {
                            if(err){
                                console.log(err);
                            }
                        });
                    }
                });
            } 
        }     
    });
}

// schedule.scheduleJob('0 0 * * *', BoostExpiryDailyCheckup);

///////===========================================================================================/////////



///hourly schedule for re-setting reach count and priority reductions

function HourlyPriorityReduction(){
    var sql = "select ViewCount.tutor,ViewCount.hourlyReachCount,Tutor.priority from ViewCount LEFT JOIN Tutor on Tutor.email=ViewCount.tutor where ViewCount.hourlyReachCount>0";
    con.query(sql, (err,result)=>{
        console.log(result);
        if(err){
            console.log(err);
        }else if(result.length=0){
            console.log("no searches in this hour");
        }else{
            for(var i = 0; i<result.length; i++){
                if(result[i].priority>500){
                    var sql2 = "update Tutor,ViewCount set priority=priority-'"+result[i].hourlyReachCount+"'*10,viewCount=viewCount+'"+result[i].hourlyReachCount+"' where Tutor.email='"+ result[i].tutor+"' AND ViewCount.tutor='"+ result[i].tutor+"'";
                    con.query(sql2, (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                }else{
                    var sql2 = "update Tutor,ViewCount set priority=priority-'"+result[i].hourlyReachCount+"',viewCount=viewCount+'"+result[i].hourlyReachCount+"' where Tutor.email='"+ result[i].tutor+"' AND ViewCount.tutor='"+ result[i].tutor+"'";
                    con.query(sql2, (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                }
                var sql3 = "update ViewCount set hourlyReachCount = 0 where tutor='"+ result[i].tutor+"'";
                con.query(sql3, (err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log("successfull");
                    }
                });
            }
        }
    });
}

//schedule.scheduleJob('0 * * * *', HourlyPriorityReduction);


module.exports = router;
