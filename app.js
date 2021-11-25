let app = Vue.createApp({

    data() {
        return {
            interviewer_name: "",
            interviewee_name: " ",
            start_time: "",
            end_time: "",
            available_shedules: [
                {
                    id: 0,
                    interviewer_name: "padma",
                    interviewee_name: "parag",
                    start_time: "2021-11-25T19:15",
                    end_time: "2021-11-25T16:15"
                }
            ],
            users: [
                {
                    uid: 1,
                    name: "Parag",
                    email: "paragptil1999@gmail.com",
                },
                {
                    uid: 2,
                    name: "Padma",
                    email: "2018bcs092@sggs.ac.in",
                },
                {
                    uid: 3,
                    name: "Bond",
                    email: "2018bcs102@sggs.ac.in",
                },
                {
                    uid: 4,
                    name: "vishal",
                   email: "2018bcs069@sggs.ac.in",
                },
            ],
            network_error: ""
        }
    },


    methods: {
        shedule: function () {

            if (
                (this.interviewer_name != "" && this.intweviewee_name != "" &&
                    this.start_time != "" && this.end_time != "")
            ) {

                this.available_shedules.push(
                    {
                        id: new Date(),
                        interviewer_name: this.interviewer_name,
                        interviewee_name: this.interviewee_name,
                        start_time: this.start_time,
                        end_time: this.end_time
                    }
                )

                this.interviewee_name = "";
                this.interviewer_name = "";
                this.start_time = "";
                this.end_time = "";

            }
        },

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
            

            axios.post('localhost:3000/edit', {
                params: {
                    id:12,
                }
            })
            .then(response => this.responseData = response.data)
            .catch(error => {
                console.log("vishal ",error)
            });

        },
        schedule: function () {
           this.available_shedules.push({
               interviewer_name:this.interviewee_name,
               interviewee_name: this.interviewee_name,
               start_time:this.start_time,
               end_time:this.end_time
           })
        }

    },
    mounted() {
    },

})
app.mount("#app")