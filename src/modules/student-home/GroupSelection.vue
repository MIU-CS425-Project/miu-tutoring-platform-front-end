<template>
  <div>
    <v-card>
      <v-card-title
        primary
        primary-title
        class="primary--text text--darken-3">
        <div>
          <div class="headline">Select Tutorial Group</div>
          <span></span>
        </div>
      </v-card-title>
      <v-card-subtitle>{{ item.sectionName }}</v-card-subtitle>
      <v-divider light/>
      <v-card-text>
  <v-item-group>
    <template v-if="!loading"
        >
      <v-row v-if="tutorialGroups.length > 0">
        
        <v-col
          v-for="tutorialGroup in tutorialGroups"
          :key="tutorialGroup.id"
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
              <div class="font-weight-medium">{{ tutorialGroup.section ? tutorialGroup.section.course 
              ? (tutorialGroup.section.course.courseNumber + ' - '+ tutorialGroup.section.course.courseName) : '' : '' }}
              
              </div>
              <div class="font-weight-light">{{ tutorialGroup.tutor ? ( "Tutor: " + tutorialGroup.tutor.firstName + " "+ tutorialGroup.tutor.middleName + " " + tutorialGroup.tutor.lastName ) : 'No tutor assigned' }}
              
              </div>
              </v-card-subtitle>

            <v-card-actions class="pt-1">
                <v-btn outlined text disabled v-if="item.tutorialGroup ? item.tutorialGroup.tutorialGroupId == tutorialGroup.tutorialGroupId : false">Already Member</v-btn>   
                <v-btn outlined text v-else @click="joinGroup(tutorialGroup)">Join</v-btn>   
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
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          color="primary"
          @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-xs-center"/>
  </div>
</template>

<script>
import { TutorialGroupAPI, EnrollmentAPI } from "@/api";

export default {
  name: "GroupSelect",
  data() {
    return {
      tutorialGroups: [],
      loading: true
    };
  },
  props: {
    modalName: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  async created() {   
    
    TutorialGroupAPI.getBySection(this.item.section.sectionId).then(res => {
      this.tutorialGroups = res;  
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
  },
  methods: {
    joinGroup(tutorialGroup){
      this.item.tutorialGroup = tutorialGroup;
      EnrollmentAPI.update(this.item).then(() => {
        this.$modal.hide(this.modalName);
        this.$notify({
              type: "success",
              title: "Success",
              message: "You have joined a new group"
            });
        this.$router.push({ name: "group-list" });     
      })
      .catch(() => {
        this.$modal.hide(this.modalName);
        this.$notify({
                type: "danger",
                title: "Error",
                message: "There is unexpected problem."
            });
      });
    },
    close() {
      this.$modal.hide(this.modalName);
    }
  }
};
</script>

<style>
</style>
