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
                @click="$router.push({ name: 'section-list' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-toolbar-title
            class="blue-grey--text text--darken-2 font-weight-bold"
          >
            Update Section
          </v-toolbar-title>
          <v-spacer/>
          <v-btn
            color="primary"
            type="submit"
          >
            Update
          </v-btn>
        </v-toolbar>

        <v-card
          tile
          class="grey lighten-5 pa-10"
        >
          <!-- row 1 -->
          <v-layout row>
            <v-flex xs4>
           <v-text-field
                :rules="requiredRules"
                v-model="item.sectionName"
                label="Section Name"
                name="sectionName"
                filled                
              />
            </v-flex>
            <v-flex 
              xs4 
              pl-3>
           <v-text-field
                :rules="requiredRules"
                v-model="item.classRoom"
                label="Class Room"
                name="classRoom"
                filled                
              />
            </v-flex>
            <v-flex 
              xs4 
              pl-3>
              <v-select
                :rules="requiredRules"
                :items="courses"
                label="Course"
                item-text="courseName"
                v-model="item.course"
                filled
                return-object
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex 
              xs4 
              >
              <v-select
                :rules="requiredRules"
                :items="faculties"
                label="Lecturer"
                :item-text="item => item.firstName"
                v-model="item.faculty"
                filled
                return-object
              ></v-select>
            </v-flex>
             <v-flex xs4 pl-3>
              <v-dialog
                ref="enrollmentDialog"
                v-model="enrollmentModal"
                :enrollment-value.sync="month"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="requiredRules"
                    v-model="month"
                    label="Block Month"
                    readonly
                    v-on="on"
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker v-model="month" type="month" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="enrollmentModal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.enrollmentDialog.save(month)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
          
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { SectionAPI, CourseAPI, FacultyAPI } from "@/api";

export default {
  name: "SectionUpdate",
  data() {
    return {
      valid: true,
      enrollmentDate: null,
      enrollmentModal: false,
      item: {},
      courses: [],
      faculties: []
    };
  },
  created() {
    const { sectionId } = this.$route.params;
    SectionAPI.get(sectionId).then(res => {
      this.item = res;
      this.enrollmentDate = this.item.enrollmentDate;
    });
    CourseAPI.all().then(res => {
      this.courses = res.content;
    });
    FacultyAPI.all().then(res => {
      this.faculties = res.content;
    });
  },
  methods: {
    save() {
      this.$refs.form.validate();
      if (this.valid) {
        this.item.enrollmentDate = this.enrollmentDate;
        SectionAPI.update(this.item)
          .then(() => {
            this.item.id = this.$route.params;
            this.item = {};
            this.$notify({
              type: "success",
              title: "Success",
              message: "Section updated successfully"
            });
            this.$router.push({ name: "section-list" });
          })
          .catch(err => {
            if (err.statusCode === 422) {
              const { messages } = err.details;
              this.errorMessage = messages;
            }
          });
      }
    }
  }
};
</script>
