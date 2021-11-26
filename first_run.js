var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Interview_Schedular";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database Interview_Schedular created!");
    var dbo = db.db("Interview_Schedular");
    dbo.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("users created!");
        db.close();
    });
    dbo.createCollection("schedule_data", function (err, res) {
        if (err) throw err;
        console.log("Schedule_data created!");
        db.close();
    });
    var SampleUser = [{

        uid: 1,
        name: "padma",
        email: "padma24reso@gmail.com"
    }, {

        uid: 2,
        name: "parag",
        email: "2018bcs102@sggs.ac.in"
    }, {

        uid: 3,
        name: "vishal",
        email: "2018bcs069@sggs.ac.in"
    }, {

        uid: 4,
        name: "ravindra",
        email: "2018bcs055@sggs.ac.in"
    }, {

        uid: 5,
        name: "Sotya Bhai",
        email: "2018bcs092@sggs.ac.in"
    }]
    dbo.collection("users").insertMany(SampleUser, function (err, res) {
        if (err) throw err;
        console.log("sample user's data inserted");
        db.close();
    });
});
