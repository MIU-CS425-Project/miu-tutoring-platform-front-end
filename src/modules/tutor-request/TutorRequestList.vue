<template>
  <div>
    <v-container
      fluid
      class="pb-0">
      <v-layout >
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Tutor Requests
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container
      class="pt-2"
      fluid
      grid-list-lg>

      <v-layout wrap>
        <v-flex xs12 >
          <v-card class="pt-2">

            <v-toolbar
              flat
              color="white">
              <v-spacer/>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="items"
              :options.sync="options"
              :loading="loading"
              :server-items-length="totalItems"
              loading-text="Loading... Please wait"
              no-data-text="No data found"
              @click:row="tutorrequestDetail"
            >
              <template v-slot:item.studentName="{ item }">
                {{ item.enrollment ? item.enrollment.student ? 
                ( item.enrollment.student.firstName + " " + item.enrollment.student.middleName + " " + item.enrollment.student.lastName ) : '' : '' }}
              </template>
              <template v-slot:item.section="{ item }">
                {{ item.section ? item.section.sectionName : '' }}
              </template>
               <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.actions="{  }">
                <v-icon v-on="on">mdi-eye</v-icon>
                  
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { TutorRequestAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import TutorRequestDetail from "./TutorRequestDetail.vue";

export default {
  name: "TutorrequestList",
  mixins: [tableMixin],

  data() {
    return {
      resource: TutorRequestAPI,
      resourceName: "Tutorrequest",
      headers: [
        {
          text: "Student Name",
          value: "studentName"
        },
        {
          text: "Section",
          value: "section"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ],
      dialog: false
    };
  },
  methods: {
    getColor (request) {
      if (request.status == "REJECTED") return 'red'
      else if (request.status == "ACCEPTED") return 'green'
      else return 'orange'
    },
    tutorrequestDetail(tutorrequest) {
      this.$modal.show(
        TutorRequestDetail,
        {
          modalName: "tutorrequest-detail-modal",
          item: tutorrequest
        },
        {
          name: "tutorrequest-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        },
        {
          "before-close": () => {
            this.loadData();
          }
        }
      );
    }
  }
};
</script>

<style>
tbody tr {
   cursor: pointer;
 }
</style>
