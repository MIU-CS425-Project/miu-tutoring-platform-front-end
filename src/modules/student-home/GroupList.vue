<template>
  <v-item-group>
    <template v-if="!loading"
        >
      <v-row v-if="tutorialGroups.length > 0">
        
        <v-col
          v-for="tutorialGroup in tutorialGroups"
          :key="tutorialGroup.id"
          cols="12"
          lg="3"
          md="4"
          xs="6"
        >
          <v-item>
            <v-card
                        dark
              color="#385F73"
            >
            <div class="overline pt-2 pl-4">{{ tutorialGroup.section ? $moment(tutorialGroup.section.month).format("MMMM YYYY") +' Block' : '' }}</div>
         <v-card-title class="headline pt-1">{{tutorialGroup.tutorialGroupNumber}}</v-card-title>

            <v-card-subtitle class="pb-0">
              <div class="font-weight-medium	">{{ tutorialGroup.section ? tutorialGroup.section.course 
              ? (tutorialGroup.section.course.courseNumber + ' - '+ tutorialGroup.section.course.courseName) : '' : '' }}
              
              </div>
              <div class="font-weight-light">
              {{ tutorialGroup.section ? 'Section - ' + tutorialGroup.section.sectionName: '' }}
              </div>
              </v-card-subtitle>

            <v-card-actions class="pt-1">
                         <router-link :to="{ name: 'group-chat',
                              params: { tutorialGroupId: tutorialGroup.tutorialGroupId } }">
                     <v-btn outlined text>Join</v-btn>   
                    </router-link>
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
        No tutorial groups found
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
import { TutorialGroupAPI } from "@/api";

export default {
  name: "GroupList",
  data() {
    return {
      tutorialGroups: [],
      loading: true
    };
  },
  async created() {   
    TutorialGroupAPI.all().then(res => {
      this.tutorialGroups = res.content;  
      this.loading = false; 
    })
    .catch(() => {
        // this.$notify({
        //   type: "danger",
        //   title: "Error",
        //   message: "Couldn't load groups"
        // });
      this.loading = false; 
    });
  }
}
</script>