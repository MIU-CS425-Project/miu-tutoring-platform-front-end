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
              <template v-slot:item.section="{ item }">
                {{ item.section ? item.section.sectionName : '' }}
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
                          @click="$router.push({name:'tutorrequest-update',
                                                params:{tutorrequestId:item.tutorrequestId}})">
                          <v-list-item-action>
                            <v-icon>mdi-pencil</v-icon>
                          </v-list-item-action>
                          <v-list-item-title>Approve</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          ripple
                          @click="dialog = true">
                          <v-list-item-action>
                            <v-icon>mdi-pencil</v-icon>
                          </v-list-item-action>
                          <v-list-item-title>Reject</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <v-dialog
                    v-model="dialog"
                    max-width="290"
                  >
                    <v-card>
                      <v-card-title class="headline">Are you sure to delete this tutorrequest?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteTutorrequest(item.tutorrequestId)"
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
          value: "tutorrequestNumber"
        },
        {
          text: "Section",
          value: "section"
        },
        {
          text: "Status",
          value: "member"
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
        }
      );
    },
    async deleteTutorrequest(id) {
        await TutorRequestAPI.remove(id);
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
