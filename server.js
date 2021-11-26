const express = require('express');
const app = express();
const port = 3000;
const data = require('./data');


app.use(express.static(__dirname));
data.initialize();

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})


app.get('/schedule',function(req,res){
    //console.log(data.schedule_data.length);
    console.log('Schedule Pressed');
    var interviewer_id=req.query.interviewer_id;
    var interviewee_id=req.query.interviewee_id;
    var start_time= req.query.start_time;
    var end_time= req.query.end_time;
    var timestamp = req.query.timestamp;
    console.log(interviewer_id,interviewee_id,start_time,end_time,timestamp);
    var out = data.schedule(interviewer_id,interviewee_id,start_time,end_time,timestamp);
    console.log(out);
    res.send(out);
});

app.get('/users',function(req,res){
    console.log('users called');
    res.send(data.users);
    // console.log(data.users);
});

app.get('/scheduled_data',function(req,res){
    console.log('scheduled_data called');
    res.send(data.schedule_data);
    //console.log(data.users);
});

//edit  
app.get('/edit',function(req,res){
    var out= req.query.timestamp;
    data.edit(out);
    
});




app.listen(port,function(){
    console.log('Server is running on port 3000');
});