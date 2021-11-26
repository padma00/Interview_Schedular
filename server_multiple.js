const express = require('express');
const app = express();
const port = 3000;
const data = require('./data_multiple');


app.use(express.static(__dirname));
data.initialize();

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})


app.get('/users',function(req,res){
    console.log('users called');
    res.send(data.users);
});

app.get('/scheduled_data',function(req,res){
    console.log('scheduled_data called');
    res.send(data.schedule_data);
});

//edit  
app.get('/edit',function(req,res){
    var _id = req.query._id;
    data.edit(_id);
});

app.get('/schedule',async function(req,res){
    var interviewer= req.query.interviewer.split(' ');
    var interviewee = req.query.interviewee.split(' ');
    var start_time = new Date(req.query.start_time);
    var end_time = new Date(req.query.end_time);
    //create object for above varibale
    var myobj = {
        interviewer:interviewer,
        interviewee:interviewee,
        start_time:start_time,
        end_time:end_time,
    };
    console.log(myobj);
    const result = await data.schedule(myobj);
    console.log(result);
    res.send(result);
});



app.listen(port,function(){
    console.log('Server is running on port 3000');
});