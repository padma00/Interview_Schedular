# Interview_Schedular
- A simple app where admins can create interviews by selecting participants, interview start time, and end time.

# Technology Used

-> Backend -  NodeJS,ExpressJS
-> Frontend - html/css/vueJS
-> Database - MongoDB

# Achieved points 
   ->An interview creation page where admin can create an interview by selecting participants, start time, and end time.

   ->Interview Validator

        In following cases interview will not be scheduled
            -Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
            -No of participants is less than 2

   ->Interview List so that admins can see upcoming interviews

   ->Admins can edit the interview time

   ->Automatic Emailer emails both the participants 

# How to use 

-> Clone the repo

-> On command prompt run following commands for first time to setup and create database

         install npm
         node first_run.js
         node server.js
         
         
-> After this you can simply use for starting server

          node server.js

-> Go to http://localhost:3000/


# Snapshots
![image](https://user-images.githubusercontent.com/55046087/143480969-6fe12fdd-3242-4215-84d2-af54a0c4df30.png)
 
 
![image](https://user-images.githubusercontent.com/55046087/143480906-8d672e4b-b2b5-4133-8cc2-3dbbdc83840d.png)
