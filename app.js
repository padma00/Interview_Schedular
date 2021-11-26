let app = Vue.createApp({

    data() {
        return {
            interviewer_name: "",
            interviewee_name: " ",
            start_time: "",
            end_time: "",
            available_shedules: [
            ],
            users: [
            ]
        }
    },


    methods: {
        schedule: async function () {

            if (
                (this.interviewer_name != "" && this.intweviewee_name != "" &&
                    this.start_time != "" && this.end_time != "")
            ) {

              // console.log(this.start_time)

               this.start_time = this.getDate(this.start_time);
               this.end_time = this.getDate(this.end_time);

               console.log(this.start_time)
               console.log(this.end_time)
            
//2012-10-20 00:00
            
                var timestamp = Date.now();
                // var uid1=this.users.find(this.interviewer_name).uid;
                // var uid2=this.users.find(this.intweviewee_name).uid;
                await axios
                    .get('http://localhost:3000/schedule/',{
                        params : {
                            timestamp:timestamp,
                            interviewer_id:this.interviewer_name,
                            interviewee_id:this.interviewee_name,
                            start_time:this.start_time,
                            end_time:this.end_time,
                        }
                    })
                    .then(res => {
                        if(res.data == "Not Scheduled" ){
                            alert(res.data)
                        }
                        else {
                                console.log(res.data)
                            // console.log( typeof Date.now())
                            this.available_shedules.push({
                                timestamp: timestamp,
                                interviewer_name:this.interviewer_name,
                                interviewee_name:this.interviewee_name,
                                start_time:this.start_time,
                                end_time:this.end_time
                            })
                        }


                    })
                    .catch(error => {
                        console.error(error)
                    })
                    this.interviewer_name="";
                    this.interviewee_name="";
                    

                 //  this.getSheduleData();
                   


            }
            else{
                alert("check if all the fields are filled")
            }

        }
        ,
        getDate:function(time){
            var bits = time.split(/\D/);
            var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
            return date;
        },

        edit_data: async function (timestamp) {
            let index = -1;
            let obj = this.available_shedules.find(schedule => {
                index++;
                if (schedule.timestamp === timestamp) {
                    return schedule;
                }
            })

            
            this.available_shedules.splice(index, 1);

            this.interviewee_name = obj.interviewee_name;
            this.interviewer_name = obj.interviewer_name;
            this.start_time = obj.start_time;
            this.end_time = obj.end_time;
            this.timestamp = obj.timestamp

            await axios
                .get('http://localhost:3000/edit/',{
                    params : {
                        timestamp:timestamp
                    }
                })
                .then(res => {
                    console.log(`statusCode: ${res.status}`)
                    //console.log(res)
                })
                .catch(error => {
                    console.error(error)
                })


        }

    },
    mounted() {

      //  alert("padma")

        axios
        .get('http://localhost:3000/users')
        .then(res =>{
            console.log(res.data)
            this.users = res.data
        })
        .catch(error => {
            console.error(error)
        })


        axios
        .get('http://localhost:3000/scheduled_data')
        .then(res =>{

            console.log(res.data)

            res.data.forEach(e => {
                let data = {
                    timestamp: e.timestamp,
                    interviewer_name:e.interviwer,
                    interviewee_name:e.interviewee,
                    start_time:this.getDate(e.start_time),
                    end_time:this.getDate(e.end_time)
                }
                console.log(data)
                this.available_shedules.push(data);
            });
        })
        .catch(error => {
            console.error(error)
        })


    },

})
app.mount("#app")

