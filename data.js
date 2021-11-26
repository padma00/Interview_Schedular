const emailService = require('./mail');
var MongoClient = require('mongodb').MongoClient;


var data = {};
data.schedule_data = [];
data.users = [];


data.check = function (uid, start_time, end_time) {
    var n = data.schedule_data.length;
    for (var i = 0; i < n; i++) {
        if (data.schedule_data[i].interviewee == uid || data.schedule_data[i].interviwer == uid) {
            var st = new Date(start_time);
            var en = new Date(data.schedule_data[i].end_time);
            if (en.getTime() >= st.getTime()) {
                return false;
            }
            return true;
        }
    }
    return true;
}

data.edit = function (timestamp) {
    //now we delete this if id from the database
    deleteInterview(timestamp).catch(console.error);
    SyncVariables().catch(console.error);
}


data.schedule =  function (id1, id2, start_time, end_time, timestamp) {
    //if both selected user are same
    SyncVariables().catch(console.error);
    if (id1 === id2)
        return "Not Scheduled";
        console.log(id1 + " " + id2);
    var st = new Date(start_time);
    var en = new Date(end_time);
    if (st.getTime() >= en.getTime()) return "Not Scheduled";
    if (data.check(id1, start_time, end_time) && data.check(id2, start_time, end_time)) {
        //insert in database
        
        var myobj = {
            timestamp: timestamp,
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
            console.log(data.users[i].name, id1);
            if (data.users[i].name == id1) {
                email1 = data.users[i].email;
                console.log('found' + email1);
            }
            if (data.users[i].name == id2) {
                email2 = data.users[i].email;
                console.log('found' + email2);
            }
        }
        console.log(email1, email2);
        emailService.rawData(email1,email2,start_time,end_time);
        return "Schedule Successfully";
    }
    else {
        return "Not Scheduled";
    }
};


async function Scheduler(myobj) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const result = await client.db("Interview_Schedular").collection("schedule_data")
            .insertOne(myobj)
        SyncVariables().catch(console.error);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("connected");
        await client.close();
    }
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
    } catch (err) {
        console.error(err);
    }
    finally {
        //console.log("Synced Successfully");
        await client.close();
    }
}

async function deleteInterview(timestamp) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("Interview_Schedular").collection("schedule_data").deleteOne({ timestamp: timestamp });
        SyncVariables().catch(console.error);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("deleted the interview id :" + timestamp);
        await client.close();
    }
}

data.initialize = function () {
    SyncVariables().catch(console.error);
}

SyncVariables().catch(console.error);



module.exports = data;