<template>
  <v-layout
    justify-center
    row
    wrap
  >
    <v-flex>
      <v-form @submit.prevent="save" ref="form" v-model="valid">
        <v-toolbar
          class="grey lighten-4 elevation-2 pl-2 pr-2" style="height: auto"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                slot="activator"
                icon
                v-on="on"
                @click="close()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-toolbar-title
            class="blue-grey--text text--darken-2 font-weight-bold"
          >
            Assign Course
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
            <v-flex 
              xs6>
              <v-select
                :rules="requiredRules"
                :items="courses"
                label="Course"
                item-text="courseName"
                v-model="selectedCourse"
                filled
                return-object
                @change="filterByCourse($event)"
              ></v-select>
            </v-flex>
            <v-flex 
              xs6 pl-3>
              <v-select
                :rules="requiredRules"
                :items="sections"
                label="Section"
                item-text="sectionName"
                v-model="item.section"
                filled
                return-object
              ></v-select>
            </v-flex>
          </v-layout>
          
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { CourseAPI, SectionAPI, EnrollmentAPI } from "@/api";

export default {
  name: "AssignCourse",
  data() {
    return {
      valid: true,
      item: {},
      requiredRules: [v => !!v || "This field is required"],
      selectedCourse: {},
      courses: [],
      sections: []
    };
  },
  props: {
    modalName: {
      type: String,
      default: ""
    },
    student: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    CourseAPI.all().then(res => {
      this.courses = res.content;
    });
  },
  methods: {
    async filterByCourse(course) {
      SectionAPI.all().then(res => {
        this.sections = res.content.filter(sec => sec.course.courseId = course.courseId);
      });
    },
    close() {
      this.$modal.hide(this.modalName);
    },
    save() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$modal.hide(this.modalName);
        this.item.student = this.student;
        EnrollmentAPI.create(this.item)
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
                message: "Successfull course assignment"
              });
              this.item = {};
              this.$router.push({ name: "student-list" });
            }
          })
        }
    }
  }
};
</script>

<style>
</style>
