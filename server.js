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
    var start_time= (req.query.start_time);
    var end_time= (req.query.end_time);
    var out = data.schedule(interviewer_id,interviewee_id,start_time,end_time);
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
    console.log('edit called');
    var out= req.query.id;
    console.log('want to edit at index: ' + out);
    data.edit(out);
});



app.listen(port,function(){
    console.log('Server is running on port 3000');
});