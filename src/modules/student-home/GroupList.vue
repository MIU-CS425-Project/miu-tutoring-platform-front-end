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
         <v-card-title class="headline">{{tutorialGroup.tutorialGroupNumber}}</v-card-title>

            <v-card-subtitle>{{tutorialGroup.tutorialGroupNumber}} - Introduction to Algorithms</v-card-subtitle>

            <v-card-actions>
                         <router-link :to="{ name: 'group-chat',
                              params: { tutorialGroupId: tutorialGroup.tutorialGroupId } }">
                     <v-btn text>Join</v-btn>   
                    </router-link>
            </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </template>
       <template v-else>
          
              <v-alert
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
        No tutorial groups found
    </v-alert>
        </template>
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
  }
}
</script>