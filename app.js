const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const schedule = require('node-schedule');

const con = require('./databse/db');
const keys = require('./config/keys');
const userRoutes = require('./api/routes/user');
const profileEdit = require('./api/routes/profileEdit');
const searchRoutes = require('./api/routes/search');
const reviewsRoute = require('./api/routes/review');
const rateRoute = require('./api/routes/rate');
const resetPassword = require('./api/routes/resetPassword');
const subjectRoutes = require('./api/routes/subject');
const requestRoutes = require('./api/routes/request');
//const viewClass = require('./api/routes/viewClassroom');
const passportSetup = require('./config/passport-setup');
const profileBoostRoute = require('./api/routes/boostProfile');
//const boostPaymentRoute = require('./api/routes/boostPayment');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

con.connect((err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    else{
        console.log('Database connected');  
    }

});

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoutes);
app.use('/', profileEdit);
app.use('/', searchRoutes);
app.use('/', reviewsRoute);
app.use('/', rateRoute);
app.use('/', resetPassword);
app.use('/', subjectRoutes);
app.use('/', requestRoutes);
//app.use('/', viewClass);
app.use('/', profileBoostRoute);
//app.use('/', boostPaymentRoute );

app.use((req, res, next)=>{
    const error = {
        message: 'Not found',
        status: 404
    };
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});  

//schedule functions
////daily boost expiry schedule
function BoostExpiryDailyCheckup() {
    var sql4 = "select * from ProfileBoost where ProfileBoost.expiryDate < CURRENT_TIMESTAMP";

    con.query(sql4, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var sql5 = "delete from ProfileBoost where ProfileBoost.email = '" + result[i].email + "'";
                var sql6 = "update Tutor set Tutor.priority=200 where Tutor.email = '" + result[i].email + "'";

                con.query(sql5, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        con.query(sql6, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
        }
    });
}

///hourly schedule for re-setting reach count and priority reductions
function HourlyPriorityReduction() {
    var sql = "select ViewCount.tutor,ViewCount.hourlyReachCount,Tutor.priority from ViewCount LEFT JOIN Tutor on Tutor.email=ViewCount.tutor where ViewCount.hourlyReachCount>0";

    con.query(sql, (err, result) => {
        console.log(result.length);
        if (err) {
            console.log(err);
        } else if (result.length == 0) {
            console.log("no searches in this hour");
        } else {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                console.log("blah");
                if (result[i].priority > 500) {

                    var sql2 = "update Tutor,ViewCount set priority=priority-'" + result[i].hourlyReachCount + "'*10,viewCount=viewCount+'" + result[i].hourlyReachCount + "' where Tutor.email='" + result[i].tutor + "' AND ViewCount.tutor='" + result[i].tutor + "'";

                    con.query(sql2, (err, result2) => {
                        // console.log(result2);
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    var sql2 = "update Tutor,ViewCount set priority=priority-'" + result[i].hourlyReachCount + "',viewCount=viewCount+'" + result[i].hourlyReachCount + "' where Tutor.email='" + result[i].tutor + "' AND ViewCount.tutor='" + result[i].tutor + "'";
                    con.query(sql2, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                var sql3 = "update ViewCount set hourlyReachCount = 0 where tutor='" + result[i].tutor + "'";
                con.query(sql3, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("successfull");
                    }
                });
            }
        }
    });
}

//Remove expired boost offers 
function BoostOfferDailyCheckup() {
    var sql = "select * from BoostOffers where CURRENT_TIMESTAMP() > expirydate";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var discount = result[i].discount;
                var oldPrice = result[i].price;
                var newPrice = (oldPrice * 100) / (100 - discount);

                var sql1 = "update BoostOffers set discount='0', price='" + newPrice + "' where package='" + result[i].package + "'";
                con.query(sql1, (err, response) => {
                    if (err) throw err;
                    console.log(response);
                })
            }
        }
    })
}

//update rate in tutor table daily
function RateDailyCheckup() {
    var sql = "select email, avg(rating) as newRate from Tutor right join Rate on Tutor.email=Rate.tutor group by Tutor.email";

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var sql1 = "update Tutor set rate = '" + result[i].newRate + "' where email='" + result[i].email + "'";
                con.query(sql1, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(response);
                    }
                })
            }
        }
    })
}

//remove 6 month old news feed
function NewsFeedCheckup() {
    var sql = "delete from NewsFeed where expiryDate < CURRENT_TIMESTAMP";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })
}

//request update
function RequestCheckup() {
    var sql = "update Requests set studentShow='0' where (TIMESTAMPADD(MONTH, 6, Requests.sent_date)) > CURRENT_TIMESTAMP";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })
};

function DefaultPriorityReduction(){
    var sql = "update Tutor set priority = priority-500 where priority>700";
    var sql1 = "update Tutor set priority = priority-10 where priority<=500 and priority>10";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
    })
    con.query(sql1, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
    })
}


module.exports = app;
