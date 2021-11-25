const emailService = require('./mail');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var data = {};
data.schedule_data = [];
data.users = [];


data.check = function (uid, start_time, end_time) {
    var n = data.schedule_data.length;
    for (var i = 0; i < n; i++) {
        if (data.schedule_data[i].interviewee == uid || data.schedule_data[i].interviwer == uid) {
            var st=new Date(start_time);
            var en=new Date(data.schedule_data[i].end_time);
            if (en.getTime()>=st.getTime()) {
                return false;
            }
            return true;
        }
    }
    return true;
}

data.edit = function (id) {
    //now we delete this if id from the database
    deleteInterview(id).catch(console.error);
    SyncVariables().catch(console.error);
}


data.schedule = function (id1, id2, start_time, end_time) {
    //if both selected user are same
    SyncVariables().catch(console.error);
    if (id1 == id2)
        return "Not Scheduled";
    var st=new Date(start_time);
    var en=new Date(end_time);
    if(st.getTime() >= en.getTime())return  "Not Scheduled";
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
        //console.log(email1, email2);
        //emailService.rawData(email1, email2, start_time, end_time);
        return "Scheduled Successfully";
    }
    else {
        return "Not Scheduled";
    }
};


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
    SyncVariables().catch(console.error);
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

async function deleteInterview(intv_id) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        await client.db("Interview_Schedular").collection("schedule_data").deleteOne({ id: parseInt(intv_id) });
        SyncVariables().catch(console.error);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("deleted the interview id :" + intv_id);
        await client.close();
    }
}

data.initialize = function () {
    SyncVariables().catch(console.error);
}

SyncVariables().catch(console.error);



module.exports = data;