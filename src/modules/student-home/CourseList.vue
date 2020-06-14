<template>
<div>
  <v-item-group>
    <template v-if="!loading"
        >
      <v-row v-if="enrollments.length > 0">
        
        <v-col
          v-for="enrollment in enrollments"
          :key="enrollment.id"
          cols="12"
          lg="3"
          md="6"
        >
          <v-item>
            <v-card
                        dark
              color="#385F73"
            >
            <div class="overline pt-2 pl-4">{{ enrollment.section ? $moment(enrollment.section.month).format("MMMM YYYY") +' Block' : '' }}</div>
         <v-card-title class="headline pt-1">{{ enrollment.section ? enrollment.section.course 
              ? (enrollment.section.course.courseNumber + ' - '+ enrollment.section.course.courseName) : '' : '' }}
              </v-card-title>

            <v-card-subtitle class="pb-0">
              <div class="font-weight-medium">
              {{ enrollment.section ? 'Section - ' + enrollment.section.sectionName: '' }}
              </div>
              </v-card-subtitle>
                <v-card-actions>
      <v-btn outlined text @click="groupSelect(enrollment)">Join Tutorial</v-btn>
 <span class="pl-2 pr-2"> or </span>
      <v-btn outlined
        text
        @click="selectedEnrollment = enrollment, dialog = true"
      >
        Be a Tutor
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          You can join one of the existing tutorial groups or apply to be assigned as a tutor for this course.
        </v-card-text>
      </div>
    </v-expand-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
       <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
      v-else
    >
        No courses found
    </v-alert>
    </template>
       <template v-else>
   
       <v-sheet
          class="px-3 pt-3 pb-3"
          v-if="loading"
        >
        <v-row>
          <v-col
              cols="12"
              lg="3"
              md="4"
              xs="6"
              height="30px"
          >
          <v-skeleton-loader
          class="mx-auto"
          type="card"
          >
          </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-sheet>
             </template>
  </v-item-group>
  <v-dialog
        v-model="dialog"
        max-width="500"
      >
      <v-form @submit.prevent="BeATutor" ref="form" v-model="valid">

        <v-card>
          <v-card-title class="headline">Enter related experience</v-card-title>

          <v-card-text>
           <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                :rules="requiredRules"
                v-model="item.experience" 
                label="Experience*" 
                required>
                </v-textarea>
              </v-col>
            </v-row>
           </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              type="submit"
            >
              Apply
            </v-btn>

            <v-btn
              color="primary"
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      </v-dialog>
    </div>
</template>
<script>
import { TutorRequestAPI, EnrollmentAPI, AuthAPI } from "@/api";
import GroupSelection from "./GroupSelection.vue";

export default {
  name: "CourseList",
  data() {
    return {
      valid: true,
      enrollments: [],
      loading: true,
      show: false,
      selectedEnrollment: {},
      dialog: false,
      item: { status: 0 },
      requiredRules: [v => !!v || "This field is required"],
    };
  },
  async created() {   
    AuthAPI.getuserDetails().then(res => {
      const user = res.user;  
      EnrollmentAPI.getByStudentId(user.id).then(res => {
        this.enrollments = res;  
        this.loading = false; 
      })
      .catch(() => {
        this.loading = false; 
      });
    })
  },
  methods: {
    BeATutor() {
      this.$refs.form.validate();
      if(this.valid){
        this.item.enrollment = this.selectedEnrollment
        this.item.section = this.selectedEnrollment.section;
        TutorRequestAPI.create(this.item)
        .then(
          res => {
          if(!res){
            this.$notify({
                type: "danger",
                title: "Error",
                message: "There is unexpected problem."
            });
          } else{
            this.$notify({
              type: "success",
              title: "Success",
              message: "Application created successfully"
            });
            this.dialog = false;

          }
        })
      }
    },
    groupSelect(enrollment) {
      this.$modal.show(
        GroupSelection,
        {
          modalName: "group-selection-modal",
          item: enrollment
        },
        {
          name: "group-selection-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    }
  }
}
</script>