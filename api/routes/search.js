//new new search algorithm 2
const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/search', (req, res) => {
    var pageId = req.body.id;
    var district = req.body.district;
    var subject = req.body.subject;

    var sql3 = "update ViewCount set ReachCount = ReachCount + 1 where tutor = '"+result[i].email+"'";
    var sql4 = "insert into ViewCount(tutor, ReachCount) values ('"+email+"', '1')";
    var sql5 = "select ReachCount from ViewCount where tutor='"+email+"'"; 


    if (district === "all" && subject == "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where acc_status='1' order by priority desc";
        var sql6 = "select * from Tutor where acc_status='1' AND priority<=500 limit '"+pageId+"', order by priority desc";
    }
    else if (subject == "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND acc_status='1' order by priority desc";
        var sql6 = "select * from Tutor where Location like '%" + district + "%' AND acc_status='1' AND priority<=500 order by priority desc";
    }
    else if (district == "all" && subject != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Subject like '%" + subject + "%' AND acc_status='1' order by priority desc";
        var sql6 = "select * from Tutor where Subject like '%" + subject + "%' AND acc_status='1' AND priority<=500 order by priority desc";
    }
    else if (subject != "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND Subject like '%" + subject + "%' AND acc_status='1' order by priority desc";
        var sql6 = "select * from Tutor where Subject like '%" + subject + "%' AND Location like '%" + district + "%' AND acc_status='1' AND priority<=500 order by priority desc";

    }

    con.query(sql, (err,result)=>{
        if(err){
            res.json({
                success:false,
                user1:null,
                user2:null
            });
        }else if(result!=0){
           
           
        }else{
            var goldCount, silverCount, bronzeCount;
            goldCount = silverCount = bronzeCount = 1;
            var j = 0;

            for (var i = 0; i < result.length; i++){

                if (result[i].package == 'gold' && goldCount < 4) {

                    //gold profiles
                    boostedUser[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'gold',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        boostedUser[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        boostedUser[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        boostedUser[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        boostedUser[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        boostedUser[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        boostedUser[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        boostedUser[j].available = result[i].Available_time;
                    }
                    goldCount++;
                    j++;

                    con.query(sql2, function (err) {
                        if (err) throw err;
                    });

                } else if (result[i].package == 'silver' && silverCount < 2) {

                    //silver profiles
                    boostedUser[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'silver',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        boostedUser[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        boostedUser[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        boostedUser[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        useboostedUserr[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        boostedUser[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        boostedUser[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        boostedUser[j].available = result[i].Available_time;
                    }

                    silverCount++;
                    j++;

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });

                } else if (result[i].package == 'bronze' && bronzeCount < 2) {

                    //bronze profiles
                    boostedUser[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'bronze',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        boostedUser[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        boostedUser[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        boostedUser[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        boostedUser[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        boostedUser[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        boostedUser[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        boostedUser[j].available = result[i].Available_time;
                    }

                    bronzeCount++;
                    j++;

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });

                }
                // res.json({
                //     success :true,
                //     boostuser: boostedUser,
                    //    user: user

                // });
            }
        }
        con.query(sql6, (err,result2)=>{
            if(err){
                res.json({
                    success : null,
                    user1 : null,
                    user2 : null
                });
            }else{
                for(var i=0 ; i<result2.length ; i++){
                    nonboosteduser[i] = {
                        fname: result2[i].FirstName,
                        lname: result2[i].LastName,
                        email: result2[i].email,
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''
        
                    }
                    if (result2[i].Location) {
                        nonboosteduser[i].location = result2[i].Location;
                    }
                    if (result2[i].Mobile) {
                        nonboosteduser[i].mobile = result2[i].Mobile;
                    }
                    if (result2[i].Subject) {
                        nonboosteduser[i].subject = result2[i].Subject;
                    }
                    if (result2[i].Rate) {
                        nonboosteduser[i].rate = result2[i].Rate;
                    }
                    if (result2[i].ImgUrl) {
                        nonboosteduser[i].imgUrl = result2[i].ImgUrl;
                    }
                    if (result2[i].Price) {
                        nonboosteduser[i].price = result2[i].Price;
                    }
                    if (result2[i].Available_time) {
                        nonboosteduser[i].available = result2[i].Available_time;
                    }
        
                }
            }

        });
    });

});






// const express = require('express');
// const router = express.Router();
// const con = require('../../databse/db');

// router.post('/search', (req, res) => {
//     var district =req.body.district;
//     var subject = req.body.subject;

//     if(district === "all" && subject=="all"){
//         var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where acc_status='1' order by boostPriority desc"; 
//     }
//     else if (subject == "all" && district != "all") {
//        var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND acc_status='1' order by boostPriority desc"; 
//     }
//     else if (district == "all" && subject != "all") {
//         var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Subject like '%" + subject + "%' AND acc_status='1' order by boostPriority desc"; 
//     }
//     else if (subject != "all" && district != "all") {
//         var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND Subject like '%" + subject + "%' AND acc_status='1' order by boostPriority desc"; 
//     }

//     con.query(sql, function(err, result){
//         if(err){
//             res.json({
//                 success: false,
//                 user: null
//             });
//         } 
//         else{
            
//             var user = [];
//             var platinumCount, goldCount, silverCount;
//             platinumCount = goldCount = silverCount = 1;
//             var j=0;

//             for(var i=0; i<result.length; i++){
//                 var sql2 = "update ProfileBoost set boostPriority = boostPriority-1 where email='"+result[i].email+"'";
//                 // console.log(result[i].package);
               
//                 if(result[i].package == 'platinum' && platinumCount<4){

//                     // platinum profiles
//                     user[j] = {
//                         fname: result[i].FirstName,
//                         lname: result[i].LastName,
//                         email: result[i].email,
//                         package: 'platinum',
//                         location: '',
//                         subject: '',
//                         mobile: '',
//                         rate: '',
//                         imgUrl: '',
//                         price: '',
//                         available: ''
                
//                     }
//                     if (result[i].Location) {
//                         user[j].location = result[i].Location;
//                     }
//                     if (result[i].Mobile) {
//                         user[j].mobile = result[i].Mobile;
//                     }
//                     if (result[i].Subject) {
//                         user[j].subject = result[i].Subject;
//                     }
//                     if (result[i].Rate) {
//                         user[j].rate = result[i].Rate;
//                     }
//                     if (result[i].ImgUrl) {
//                         user[j].imgUrl = result[i].ImgUrl;
//                     }
//                     if (result[i].Price) {
//                         user[j].price = result[i].Price;
//                     }
//                     if (result[i].Available_time) {
//                         user[j].available = result[i].Available_time;
//                     }
//                     platinumCount++;
//                     j++;

//                     con.query(sql2, function(err){
//                         if(err) throw err;
//                     });

//                 }else if(result[i].package == 'gold' && goldCount<3){

//                     //Gold profiles
//                     user[j] = {
//                         fname: result[i].FirstName,
//                         lname: result[i].LastName,
//                         email: result[i].email,
//                         package: 'gold',
//                         location: '',
//                         subject: '',
//                         mobile: '',
//                         rate: '',
//                         imgUrl: '',
//                         price: '',
//                         available: ''
                
//                     }
//                     if (result[i].Location) {
//                         user[j].location = result[i].Location;
//                     }
//                     if (result[i].Mobile) {
//                         user[j].mobile = result[i].Mobile;
//                     }
//                     if (result[i].Subject) {
//                         user[j].subject = result[i].Subject;
//                     }
//                     if (result[i].Rate) {
//                         user[j].rate = result[i].Rate;
//                     }
//                     if (result[i].ImgUrl) {
//                         user[j].imgUrl = result[i].ImgUrl;
//                     }
//                     if (result[i].Price) {
//                         user[j].price = result[i].Price;
//                     }
//                     if (result[i].Available_time) {
//                         user[j].available = result[i].Available_time;
//                     }

//                     goldCount++;
//                     j++;

//                     con.query(sql2, function(err,result){
//                         if(err) throw err;
//                     });

//                 }else if(result[i].package =='silver' && silverCount<2){

//                     //silver profiles
//                     user[j] = {
//                         fname: result[i].FirstName,
//                         lname: result[i].LastName,
//                         email: result[i].email,
//                         package: 'silver',
//                         location: '',
//                         subject: '',
//                         mobile: '',
//                         rate: '',
//                         imgUrl: '',
//                         price: '',
//                         available: ''
                
//                     }
//                     if (result[i].Location) {
//                         user[j].location = result[i].Location;
//                     }
//                     if (result[i].Mobile) {
//                         user[j].mobile = result[i].Mobile;
//                     }
//                     if (result[i].Subject) {
//                         user[j].subject = result[i].Subject;
//                     }
//                     if (result[i].Rate) {
//                         user[j].rate = result[i].Rate;
//                     }
//                     if (result[i].ImgUrl) {
//                         user[j].imgUrl = result[i].ImgUrl;
//                     }
//                     if (result[i].Price) {
//                         user[j].price = result[i].Price;
//                     }
//                     if (result[i].Available_time) {
//                         user[j].available = result[i].Available_time;
//                     }

//                     silverCount++;
//                     j++;

//                     con.query(sql2, function(err,result){
//                         if(err) throw err;
//                     });

//                     }else if(result[i].package != 'platinum' && result[i].package != 'gold' && result[i].package != 'silver'){

//                     user[j] = {
//                         fname: result[i].FirstName,
//                         lname: result[i].LastName,
//                         email: result[i].email,
//                         package: 'null',
//                         location: '',
//                         subject: '',
//                         mobile: '',
//                         rate: '',
//                         imgUrl: '',
//                         price: '',
//                         available: ''
                
//                     }
//                     if (result[i].Location) {
//                         user[j].location = result[i].Location;
//                     }
//                     if (result[i].Mobile) {
//                         user[j].mobile = result[i].Mobile;
//                     }
//                     if (result[i].Subject) {
//                         user[j].subject = result[i].Subject;
//                     }
//                     if (result[i].Rate) {
//                         user[j].rate = result[i].Rate;
//                     }
//                     if (result[i].ImgUrl) {
//                         user[j].imgUrl = result[i].ImgUrl;
//                     }
//                     if (result[i].Price) {
//                         user[j].price = result[i].Price;
//                     }
//                     if (result[i].Available_time) {
//                         user[j].available = result[i].Available_time;
//                     }
//                     j++;
//                 }
//             }
//             res.json({
//                 success: true,
//                 user: user
//             });
//         }
//     });
// });

// router.post('/searchByName', (req, res) => {
//     var name = req.body.name;
//     var fname = (name.trim().split(/\s+/))[0];
//     var lname = (name.trim().split(/\s+/))[1];
//     var sql = "select * from Tutor where (FirstName like '%"+fname+"%' OR LastName like '%"+lname+"%') AND acc_status='1'";
//     con.query(sql, (err, result) => {
//         if(err){
//             console.log(err);
//             res.json({
//                 success: false,
//                 user: null
//             });
//         }
//         //console.log(result);
//         var user = [];
//         for (var i = 0; i < result.length; i++) {
//             user[i] = {
//                 fname: result[i].FirstName,
//                 lname: result[i].LastName,
//                 email: result[i].email,
//                 location: '',
//                 subject: '',
//                 mobile: '',
//                 rate: '',
//                 imgUrl: '',
//                 price: '',
//                 available: ''

//             }
//             if (result[i].Location) {
//                 user[i].location = result[i].Location;
//             }
//             if (result[i].Mobile) {
//                 user[i].mobile = result[i].Mobile;
//             }
//             if (result[i].Subject) {
//                 user[i].subject = result[i].Subject;
//             }
//             if (result[i].Rate) {
//                 user[i].rate = result[i].Rate;
//             }
//             if (result[i].ImgUrl) {
//                 user[i].imgUrl = result[i].ImgUrl;
//             }
//             if (result[i].Price) {
//                 user[i].price = result[i].Price;
//             }
//             if (result[i].Available_time) {
//                 user[i].available = result[i].Available_time;
//             }

//         }
//         res.json({
//             success: true,
//             user: user
//         });
//     });
// })



// module.exports = router;



// // const express = require('express');
// // const router = express.Router();
// // const con = require('../../databse/db');

// // router.post('/search', (req, res) => {
// //     var district =req.body.district;
// //     var subject = req.body.subject;

// //     if(district === "all" && subject=="all"){
// //         var sql = "select * from Tutor where acc_status='1'";
// //     }
// //     else if (subject == "all" && district != "all") {
// //         var sql = "select * from Tutor where Location like '%" + district + "%' and acc_status='1'";
// //     }
// //     else if (district == "all" && subject != "all") {
// //         var sql = "select * from Tutor where Subject like '%" + subject + "%' and acc_status='1'";
// //     }
// //     else if (subject != "all" && district != "all") {
// //         var sql = "select * from Tutor where (Location like '%" + district + "%' and Subject like '%" + subject + "%' and acc_status='1' )";
// //     }
// //     con.query(sql, function(err, result){
// //         if (err) throw err;
// //         else{
// //             var user = [];
// //             for(var i=0; i<result.length; i++){
// //                 user[i] = {
// //                     fname: result[i].FirstName,
// //                     lname: result[i].LastName,
// //                     email: result[i].email,
// //                     location: '',
// //                     subject: '',
// //                     mobile: '',
// //                     rate: '',
// //                     imgUrl: '',
// //                     price: '',
// //                     available: ''
            
// //                 }
// //                 if (result[i].Location) {
// //                     user[i].location = result[i].Location;
// //                 }
// //                 if (result[i].Mobile) {
// //                     user[i].mobile = result[i].Mobile;
// //                 }
// //                 if (result[i].Subject) {
// //                     user[i].subject = result[i].Subject;
// //                 }
// //                 if (result[i].Rate) {
// //                     user[i].rate = result[i].Rate;
// //                 }
// //                 if (result[i].ImgUrl) {
// //                     user[i].imgUrl = result[i].ImgUrl;
// //                 }
// //                 if (result[i].Price) {
// //                     user[i].price = result[i].Price;
// //                 }
// //                 if (result[i].Available_time) {
// //                     user[i].available = result[i].Available_time;
// //                 }
            
// //             }
// //             res.send({
// //                 user: user
// //             });
// //             //console.log(result);
// //         }
// //     });
// // });

// // router.post('/searchByName', (req, res) => {
// //     var name = req.body.name;
// //     var fname = (name.trim().split(/\s+/))[0];
// //     var lname = (name.trim().split(/\s+/))[1];
// //     var sql = "select * from Tutor where FirstName like '%"+fname+"%' or LastName like '%"+lname+"%'";
// //     con.query(sql, (err, result) => {
// //         if(err){
// //             console.log(err);
// //             res.json({
// //                 success: false,
// //                 user: null
// //             });
// //         }
// //         console.log(result);
// //         var user = [];
// //         for (var i = 0; i < result.length; i++) {
// //             user[i] = {
// //                 fname: result[i].FirstName,
// //                 lname: result[i].LastName,
// //                 email: result[i].email,
// //                 location: '',
// //                 subject: '',
// //                 mobile: '',
// //                 rate: '',
// //                 imgUrl: '',
// //                 price: '',
// //                 available: ''

// //             }
// //             if (result[i].Location) {
// //                 user[i].location = result[i].Location;
// //             }
// //             if (result[i].Mobile) {
// //                 user[i].mobile = result[i].Mobile;
// //             }
// //             if (result[i].Subject) {
// //                 user[i].subject = result[i].Subject;
// //             }
// //             if (result[i].Rate) {
// //                 user[i].rate = result[i].Rate;
// //             }
// //             if (result[i].ImgUrl) {
// //                 user[i].imgUrl = result[i].ImgUrl;
// //             }
// //             if (result[i].Price) {
// //                 user[i].price = result[i].Price;
// //             }
// //             if (result[i].Available_time) {
// //                 user[i].available = result[i].Available_time;
// //             }

// //         }
// //         res.json({
// //             success: true,
// //             user: user
// //         });
// //     });
// // })



// // module.exports = router;


