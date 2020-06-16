<template>
  <v-layout
    justify-center
    row
    wrap
  >
    <v-flex xs11>
      <v-form @submit.prevent="save" ref="form" v-model="valid">
        <v-toolbar
          dense
          class="grey lighten-4 elevation-2 mb-1"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                slot="activator"
                icon
                v-on="on"
                @click="$router.push({ name: 'student-report-list' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-toolbar-title
            class="blue-grey--text text--darken-2 font-weight-bold"
          >
            Add Report
          </v-toolbar-title>
          <v-spacer/>
          <v-btn
            color="primary"
            type="submit"
          >
            Save
          </v-btn>
        </v-toolbar>

        <v-card
          tile
          class="grey lighten-5 pa-10"
        >
          <!-- row 1 -->
          <v-layout row>
            <v-flex xs6>
              <v-select
                :rules="requiredRules"
                :items="tutorialGroups"
                label="Tutorial Group"
                item-text="tutorialGroupNumber"
                v-model="item.tutorialGroup"
                filled
                return-object
              ></v-select>
              <v-textarea
                :rules="requiredRules"
                v-model="item.report"
                label="Report"
                name="report"
                filled                
              />
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { ReportAPI, AuthAPI, EnrollmentAPI } from "@/api";

export default {
  name: "ReportCreate",
  data() {
    return {
      valid: true,
      item: {},
      requiredRules: [v => !!v || "This field is required"],
      tutorialGroups: [],
      user: {}
    };
  },
  async created() {   
    AuthAPI.getuserDetails().then(res => {
      this.user = res.user;  
      EnrollmentAPI.getByStudentId(this.user.id).then(res => {
        this.enrollments = res;  
        this.loading = false;
        this.enrollments.forEach(enrollment => {
          if(enrollment.tutorialGroup){
            this.tutorialGroups.push(enrollment.tutorialGroup);
          }
        });
      })
      .catch(() => {
        this.loading = false; 
      });
    })
  },
  methods: {
    save() {
      this.$refs.form.validate();
      if(this.valid){
        this.item.student = this.user;
        console.log(this.item);
        
        this.item.course = this.item.tutorialGroup.section.course;
          ReportAPI.create(this.item)
            .then(
              res => {
              if(!res){
                this.$notify({
                    type: "danger",
                    title: "Error",
                    message: "There is unexpected error"
                });
              } else{
                this.$notify({
                  type: "success",
                  title: "Success",
                  message: "Report created successfully"
                });
                this.item = {};
                this.$router.push({ name: "student-report-list" });
              }
            })
        }
    }
  }
};
</script>
