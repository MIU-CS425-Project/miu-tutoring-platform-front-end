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
                @click="$router.push({ name: 'tutorialgroup-list' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-toolbar-title
            class="blue-grey--text text--darken-2 font-weight-bold"
          >
            Add Tutorial Group
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
              <v-text-field
                :rules="requiredRules"
                v-model="item.tutorialGroupNumber"
                label="Group Number"
                name="tutorialGroupNumber"
                filled
                autofocus
              />
            </v-flex>
          </v-layout>
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
import { TutorialGroupAPI, SectionAPI, CourseAPI } from "@/api";

export default {
  name: "TutorialGroupCreate",
  data() {
    return {
      valid: true,
      description: "",
      item: {},
      requiredRules: [v => !!v || "This field is required"],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 3 || 'Password must be greater than three characters'
      ],
      selectedCourse: {},
      courses: [],
      sections: []
    };
  },
  created() {
    CourseAPI.all().then(res => {
      this.courses = res.content;
    });
  },
  methods: {
    async filterByCourse(course) {
      SectionAPI.all().then(res => {
        this.sections = res.content.filter(sec => sec.course.courseId == course.courseId);
      });
    },
    save() {
      this.$refs.form.validate();
      if(this.valid){
        this.item.enrollmentDate = this.enrollmentDate;
          TutorialGroupAPI.create(this.item)
            .then(
              () => {
                this.$notify({
                  type: "success",
                  title: "Success",
                  message: "TutorialGroup created successfully"
                });
                this.item = {};
                this.$router.push({ name: "tutorialgroup-list" });
            })
        }
    }
  }
};
</script>
