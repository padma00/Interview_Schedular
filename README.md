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
![image](https://user-images.githubusercontent.com/55046087/143577778-f756713e-dd56-4c89-b970-42f34961a33f.png)
 
 ![image](https://user-images.githubusercontent.com/55046087/143578081-58a27c1f-3885-49b7-b098-9fac0ff8b89d.png)
 
![image](https://user-images.githubusercontent.com/55046087/143578601-b9f8b346-6804-40f1-a456-e2e2ccb4afa0.png)


# Extension (Backend only) - for multiple interviewers and multiple interviewee at same time 

-> files used for testing backend for multiple interviewrs and interviewee
             -server_multiple.js
             -data_multiple.js
             -mail_multiple.js

-> using postman testing has been done 

-> for shceduling ,taken an array of all the id's and validated the interview time according to the scheduled data

-> for deleting the scheduled interview of multiple interviewers and interviewee used objectID for a object inserted in database

# Snapshots for multiple interviewers and interviewee


