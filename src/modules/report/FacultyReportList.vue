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
              @click:row="reportDetail"
            >
              <template v-slot:item.student="{ item }">
                {{ item.student ? item.student.firstName + " " + item.student.middleName + " " + item.student.lastName :''}}
              </template>
              <template v-slot:item.course="{ item }">
                {{ item.course.courseName }}
              </template>
              <template v-slot:item.section="{ item }">
                {{ item.tutorialGroup.section ? item.tutorialGroup.section.sectionName : '' }}
              </template>
              <template v-slot:item.group="{ item }">
                {{ item.tutorialGroup.tutorialGroupNumber }}
              </template>
              <template v-slot:item.actions="">
                <v-icon>mdi-eye</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { ReportAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import ReportDetail from "./ReportDetail.vue";

export default {
  name: "FacultyReportList",
  mixins: [tableMixin],

  data() {
    return {
      resource: ReportAPI,
      resourceName: "Report",
      headers: [
        {
          text: "Given By",
          value: "student"
        },
        {
          text: "Group",
          value: "group"
        },
        {
          text: "Section",
          value: "section"
        },
        {
          text: "Course",
          value: "course"
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
