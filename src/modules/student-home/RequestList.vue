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
            >
              <template v-slot:item.section="{ item }">
                {{ item.section ? item.section.sectionName : '' }}
              </template>
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <div @click.stop>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      slot="activator"
                      icon
                      v-on="on"
                      @click="selectedItem = item, dialog = true">
                        <v-icon >mdi-minus-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Cancel</span>
                </v-tooltip>
                  </div>
                  <v-dialog
                    v-model="dialog"
                    max-width="290"
                  >
                    <v-card>
                      <v-card-title class="headline">Are you sure to cancel this request?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteTutorrequest()"
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
import { TutorRequestAPI, AuthAPI } from "@/api";
const debounce = require("lodash.debounce");

export default {
  name: "TutorrequestList",
  data() {
    return {
      totalItems: 0,
      items: [],
      loading: false,
      options: {},
      search: "",
      headers: [
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
      dialog: false,
      user: {},
      selectedItem: {}
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
    getColor (request) {
      if (request.status == "REJECTED") return 'red'
      else if (request.status == "ACCEPTED") return 'green'
      else return 'orange'
    },
    doSearch: debounce(async function s() {
      if (this.search) {
        this.loading = true;

        const { page, itemsPerPage, sortBy, sortDesc } = this.options
        const sortColumn = sortBy.length != 0 ? sortBy[0]: this.headers[0].value;
        const sortDirection = sortDesc.length != 0 ? sortDesc[0]: false;
        
        const res = await TutorRequestAPI.search(this.search, page-1, itemsPerPage, sortColumn, sortDirection);
        this.items = res.content;
        this.totalItems = res.totalElements;
        this.loading = false;

      } else {
        this.loadData();
      }
    }, 500),
    async loadData() {
      if(this.user.id){
      this.loading = true;

      const { page, itemsPerPage, sortBy, sortDesc } = this.options
      const sortColumn = sortBy.length != 0 ? sortBy[0]: "";
      const sortDirection = sortDesc.length != 0 ? sortDesc[0]: false;
      
      TutorRequestAPI.getByStudentId(this.user.id, page-1, itemsPerPage, sortColumn, sortDirection).then(
        (res)=>{
          this.items = res.content;
          this.totalItems = res.totalElements;
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
    async deleteTutorrequest() {
        await TutorRequestAPI.remove(this.selectedItem.requestId);
        this.$notify({
          type: "success",
          title: "Success",
          message: `Tutorrequest deleted successfully`
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
