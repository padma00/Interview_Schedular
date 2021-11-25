const express = require('express');
const BodyParser=require("body-parser")
const app = express();
const port = 3000;
const data = require('./data');
var MongoClient = require('mongodb').MongoClient;
app.use(express.static(__dirname));
   
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
})


app.post('/schedule',function(req,res){
    console.log('Schedule Pressed');
    var interviewer_id=req.body.interviewer_id;
    var interviewee_id=req.body.interviewee_id;
    var start_time= Date(req.body.start_time);
    var end_time= Date(req.body.end_time);
    var out = data.schedule(interviewer_id,interviewee_id,start_time,end_time);
    console.log(out);
});


//edit  
app.post('/edit',function(req,res){
    //we will fill the schedule front end with the data from the database
    //which we want to edit
    console.log(req.query);
    //console.log(req.params);

    var out= req.params;
    console.log(out + 'here');
    res.send({
       'data.users':data.users,
   });
   //front end updated successfully
   //now we delete the interview from the database
});



app.listen(port,function(){
    console.log('Server is running on port 3000');
});