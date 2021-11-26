const emailService = require('./mail_multiple');
var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');

var data = {};
data.schedule_data = [];
data.users = [];



data.edit = function (_id) {
    //now we delete this if id from the database
    deleteInterview(_id).catch(console.error);
    SyncVariables().catch(console.error);
}
async function deleteInterview(_id) {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db("Interview_Schedular").collection("schedule_data").deleteOne({ _id : new mongodb.ObjectID(_id) });
        SyncVariables().catch(console.error);
    } catch (err) {
        console.error(err);
    }
    finally {
        console.log("deleted the interview id :" + _id);
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


data.initialize = function () {
    SyncVariables().catch(console.error);
}

SyncVariables().catch(console.error);

data.intercheck = function (arr1, arr2) {
    var n = arr1.length;
    var m = arr2.length;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (arr1[i] == arr2[j]) return false;
        }
    }
    return true;
}
data.intracheck = function (arr, start_time, end_time) {
     var n=data.schedule_data.length;
     var m=arr.length;
     for(var i=0;i<n;i++){
         
        var part1=data.schedule_data[i].interviewee;
        var part2=data.schedule_data[i].interviewer;
        var present_start=data.schedule_data[i].start_time;
        var present_end=data.schedule_data[i].end_time;

        for(var j=0;j<part1.length;j++){
          var present_part1=part1[j]; 
          for(var k=0;k<m;k++){
              if(arr[k]==present_part1 && present_end >= start_time)return false;
          }
        }
        for(var j=0;j<part2.length;j++){
            var present_part2=part2[j]; 
            for(var k=0;k<m;k++){
                if(arr[k]==present_part2 && present_end >= start_time)return false;
            }
        }
     }
     return true;
}


data.schedule = async function (myobj) {
    // var myobj = {
    //     interviewer:interviewer_id,
    //     interviewee:interviewee_id,
    //     start_time:new Date(),
    //     end_time:new Date(),
    // };
    await SyncVariables().catch(console.error);
    var interviewer = myobj.interviewer;
    var interviewee = myobj.interviewee;
    var start_time = myobj.start_time;
    var end_time = myobj.end_time;
    console.log(interviewer, interviewee, start_time, end_time);
    if (!data.intercheck(interviewer, interviewee)) return {result:"Not Scheduled"};
    if (data.intracheck(interviewer, start_time, end_time) && data.intracheck(interviewee, start_time, end_time)) {
        //can be scheduled
        var output;
        const uri = "mongodb://localhost:27017/";
        const client = new MongoClient(uri);
        try {
            await client.connect();
            var res = await client.db("Interview_Schedular").collection("schedule_data").insertOne(myobj);
            output = res.insertedId;
        } catch (err) {
            console.error(err);
        }
        finally {
            console.log("Synced Successfully");
            await client.close();
        }
        //now mail all those users
        var emails = [];
        
        for (var i = 0; i < interviewer.length; i++) {
            for (var j = 0; j < data.users.length; j++) {
                if (data.users[j].uid == interviewer[i]) {
                    emails.push(data.users[j].email);
                }
            }
        }
        for (var i = 0; i < interviewee.length; i++) {
            for (var j = 0; j < data.users.length; j++) {
                if (data.users[j].uid == interviewee[i]) {
                    emails.push(data.users[j].email);
                }
            }
        }
        //console.log(emails);
        //convert all the emails to string
        var email_string = "";
        for (var i = 0; i < emails.length; i++) {
            email_string += emails[i] + ",";
        }
        email_string = email_string.substring(0, email_string.length - 1);

        emailService.rawData(email_string, start_time, end_time);
        return {result:output};
    }
    else {
        //cannot be scheduled
        return {result:"Not Scheduled"};
    }
}



module.exports = data;