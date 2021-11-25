let app = Vue.createApp({

    data() {
        return {
            interviewer_name: "",
            interviewee_name: " ",
            start_time: "",
            end_time: "",
            available_shedules: [
                // {
                //     id: 0,
                //     interviewer_name: "padma",
                //     interviewee_name: "parag",
                //     start_time: "2021-11-25T19:15",
                //     end_time: "2021-11-25T16:15"
                // }
            ],
            users: [
            ],
            check_error: ""
        }
    },


    methods: {
        schedule: function () {

            if (
                (this.interviewer_name != "" && this.intweviewee_name != "" &&
                    this.start_time != "" && this.end_time != "")
            ) {

               console.log(this.start_time)

               this.start_time = this.getDate(this.start_time);
               this.end_time = this.getDate(this.end_time);

               console.log(this.start_time)
               console.log(this.end_time)
            
//2012-10-20 00:00
            

                axios
                    .get('http://localhost:3000/schedule/',{
                        params : {
                            interviewer_id:this.interviewer_name,
                            interviewee_id:this.interviewee_name,
                            start_time:this.start_time,
                            end_time:this.end_time
                        }
                    })
                    .then(res => {
                        console.log(`statusCode: ${res.status}`)
                        console.log(res)
                        
                        if(res.data == "Not Scheduled" ){
                            alert(res.data)
                        }
                        else {
                            this.available_shedules.push(
                                {
                                    id: this.available_shedules.length,
                                    interviewer_name: this.interviewer_name,
                                    interviewee_name: this.interviewee_name,
                                    start_time: this.start_time,
                                    end_time: this.end_time
                                }
                            )
                        }


                    })
                    .catch(error => {
                        console.error(error)
                    })

                    this.interviewee_name = "";
                    this.interviewer_name = "";
                    this.start_time = "";
                    this.end_time = "";



            }
        },
        getDate:function(time){
            var bits = time.split(/\D/);
            var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
            return date;
        }
        ,

        edit_data: function (id) {
            console.log(id)


            let index = -1;
            let obj = this.available_shedules.find(schedule => {
                index++;
                if (schedule.id === id) {
                    return schedule;
                }
            })


            this.available_shedules.splice(index, 1);
            this.interviewee_name = obj.interviewee_name;
            this.interviewer_name = obj.interviewer_name;
            this.start_time = obj.start_time;
            this.end_time = obj.end_time;








            axios
                .get('http://localhost:3000/edit/',{
                    params : {
                        id:id
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
        axios
        .get('http://localhost:3000/users')
        .then(res =>{
            console.log('Hello Vishal')
            console.log(res.data)
            this.users = res.data
        })
        .catch(error => {
            console.error(error)
        })


        axios
        .get('http://localhost:3000/scheduled_data')
        .then(res =>{
            console.log('Hello Vishal')
            console.log(res.data)
            res.data.forEach(e => {
                let data = {
                    id:this.available_shedules.length+1,
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


//Not Scheduled