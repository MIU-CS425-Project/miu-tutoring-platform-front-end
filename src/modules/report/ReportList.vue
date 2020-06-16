<template>
  <div>
    <v-container
      fluid
      class="pb-0">
      <v-layout >
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Reports
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
              <v-btn
                color="primary"
                class="pa-0 pl-2 pr-3"
                @click="$router.push({ name: 'student-report-create' })"
              >
                <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>
                New Report
              </v-btn>
              <v-spacer/>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="items"
              :options.sync="options"
              :loading="loading"
              :server-items-length="totalItems"
              loading-text="Loading... Please wait"
              no-data-text="No data found"
              @click:row="reportDetail"
            >
              <template v-slot:item.course="{ item }">
                {{ item.course.courseName }}
              </template>
              <template v-slot:item.section="{ item }">
                {{ item.tutorialGroup.section ? item.tutorialGroup.section.sectionName : '' }}
              </template>
              <template v-slot:item.group="{ item }">
                {{ item.tutorialGroup.tutorialGroupNumber }}
              </template>
              <template v-slot:item.actions="{ item }">
                <div @click.stop>
                    <v-menu
                      offset-x
                      left
                      bottom>
                       <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-dots-vertical</v-icon>
                      </template>

                      <v-list dense >

                        <v-list-item
                          ripple
                          @click="$router.push({name:'student-report-update',
                                                params:{reportId:item.reportId}})">
                          <v-list-item-action>
                            <v-icon>mdi-pencil</v-icon>
                          </v-list-item-action>
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          ripple
                          @click="dialog = true">
                          <v-list-item-action>
                            <v-icon>mdi-delete</v-icon>
                          </v-list-item-action>
                          <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <v-dialog
                    v-model="dialog"
                    max-width="290"
                  >
                    <v-card>
                      <v-card-title class="headline">Are you sure to delete this report?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteReport(item.reportId)"
                        >
                          Yes
                        </v-btn>

                        <v-btn
                          color="primary"
                          @click="dialog = false"
                        >
                          No
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { AuthAPI, ReportAPI } from "@/api";
import ReportDetail from "./ReportDetail.vue";

export default {
  name: "ReportList",

  data() {
    return {
      totalItems: 0,
      items: [],
      loading: false,
      options: {},
      headers: [
        {
          text: "Course",
          value: "course"
        },
        {
          text: "Section",
          value: "section"
        },
        {
          text: "Group",
          value: "group"
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
  async created() {   
    AuthAPI.getuserDetails().then(res => {
      this.user = res.user;  
      this.loadData()
    }).catch(() => {
      this.loading = false; 
    });
  },
  methods: {
    async loadData() {
      if(this.user.id){
      this.loading = true;
      
      ReportAPI.getByStudentId(this.user.id).then(
        (res)=>{
          this.items = res;
          this.totalItems = res.length;
          this.loading = false;
      })
      .catch(err => {
        if(err == "Forbidden"){
          this.$notify({
            type: "danger",
            title: "Error",
            message: "Nou authorized"
          });
        }
        this.loading = false;
      })
      }
    },
    reportDetail(report) {
      this.$modal.show(
        ReportDetail,
        {
          modalName: "student-report-detail-modal",
          item: report
        },
        {
          name: "student-report-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    },
    async deleteReport(id) {
        await ReportAPI.remove(id);
        this.$notify({
          type: "success",
          title: "Success",
          message: `Report deleted successfully`
        });
        this.dialog = false;
        this.loadData();
    },
  }
};
</script>

<style>
tbody tr {
   cursor: pointer;
 }
</style>
