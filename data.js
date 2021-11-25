const emailService = require('./mail');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var samp_users = [
    //sample data for 10 users
    {
        uid: 1,
        name: "A",
        email: "padma24reso@gmail.com",
    },
    {
        uid: 2,
        name: "B",
        email: "2018bcs102@sggs.ac.in",
    },
];

var data = {};
data.schedule_data = [];
data.users = [];


data.check = function (uid, start_time, end_time) {
    var n = data.schedule_data.length;
    for (var i = 0; i < n; i++) {
        if (data.schedule_data[i].interviewee == uid || data.schedule_data[i].interviwer == uid) {
            if (data.schedule_data[i].end_time >= start_time) {
                return false;
            }
            return true;
        }
    }
    return true;
}

data.edit = function (id) {

    //frontend work
    //frontend work : every field should be filled
    //delete the previous details from scheduled data
    //have the same page with all same values in it and let admin edit and recheck it
    //resume

}


data.schedule = function (id1, id2, start_time, end_time) {
    //if both selected user are same
    SyncVariables().catch(console.error);
    if (id1 == id2)
        return "select different user";

    if (data.check(id1, start_time, end_time) && data.check(id2, start_time, end_time)) {
        //insert in database

        var myobj = {
            id: data.schedule_data.length + 1,
            interviwer: id1,
            interviewee: id2,
            start_time: start_time,
            end_time: end_time
        };
        Scheduler(myobj).catch(console.error);

        //get email of user id1 and id2
        var email1;
        var email2;
        for (var i = 0; i < data.users.length; i++) {
            if (data.users[i].uid == id1) {
                var email1 = data.users[i].email;
            }
            if (data.users[i].uid == id2) {
                var email2 = data.users[i].email;
            }
        }
        emailService.rawData(email1, email2, start_time, end_time);
        return "Scheduled Successfully";
    }
    else {
        return "Not Scheduled";
    }
};



async function init() {
    const uri = "mongodb://localhost:27017/Interview_Schedular";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await InsertSampleUsers(client, samp_users);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("connected");
        await client.close();
    }
}
init().catch(console.error);


async function InsertSampleUsers(client, myobj) {
    const result = await client.db("Interview_Schedular").collection("users")
        .insertMany(myobj);
    console.log(result.insertedCount);
}


async function Scheduler(int_schedule) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await InsertInterviewSchedule(client, int_schedule);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("connected");
        await client.close();
    }
}

async function InsertInterviewSchedule(client, myobj) {
    const result = await client.db("Interview_Schedular").collection("schedule_data")
        .insertOne(myobj);
}


async function SyncVariables() {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        var cursor = client.db("Interview_Schedular").collection("schedule_data").find({});
        data.schedule_data = await cursor.toArray();
        var cursor = client.db("Interview_Schedular").collection("users").find({});
        data.users = await cursor.toArray();
        console.log(data.schedule_data);
        console.log(data.users);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("Synced Successfully");
        await client.close();
    }
}
SyncVariables().catch(console.error);



module.exports = data;