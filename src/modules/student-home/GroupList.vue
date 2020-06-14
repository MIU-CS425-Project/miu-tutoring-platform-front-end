<template>
  <v-item-group>
    <template v-if="!loading"
        >
      <v-row v-if="enrollments.length > 0">
       
        <v-col
          v-for="enrollment in enrollments"
          :key="enrollment.enrollmentId"
          cols="12"
          lg="3"
          md="4"
          xs="6"
        >
          <v-item v-if="enrollment.tutorialGroup">
            <v-card
                        dark
              color="#385F73"
              @click="$router.replace({name:'group-chat', params:{enrollment}})"
            >
            <div class="overline pt-2 pl-4">{{ enrollment.section ? $moment(enrollment.section.month).format("MMMM YYYY") +' Block' : '' }}</div>
         <v-card-title class="headline pt-1">{{ enrollment.tutorialGroup.tutorialGroupNumber }}</v-card-title>

            <v-card-subtitle class="pb-0">
              <div class="font-weight-medium	">{{ enrollment.section ? enrollment.section.course 
              ? (enrollment.section.course.courseNumber + ' - '+ enrollment.section.course.courseName) : '' : '' }}
              
              </div>
              <div class="font-weight-light">
              {{ enrollment.section ? 'Section - ' + enrollment.section.sectionName: '' }}
              </div>
              </v-card-subtitle>

            <v-card-actions class="pt-1">
                         
                     <v-btn outlined text>Open</v-btn>   
            </v-card-actions>
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
        No tutorial groups found, please go to the course section to join a group.
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
</template>
<script>
import { AuthAPI, EnrollmentAPI } from "@/api";

export default {
  name: "GroupList",
  data() {
    return {
      enrollments: [],
      loading: true
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
  }
}
</script>