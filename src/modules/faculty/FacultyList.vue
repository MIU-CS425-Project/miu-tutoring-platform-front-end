<template>
  <div>
    <v-container
      fluid
      class="pb-0">
      <v-layout >
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Faculties
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
                @click="$router.push({ name: 'faculty-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Faculty
              </v-btn>
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
              @click:row="facultyDetail"
            >
              <template v-slot:item.name="{ item }">
                {{ item.firstName }} {{ item.middleName }} {{ item.lastName }}
              </template>
              <template v-slot:item.actions="{ item }">
                <div @click.stop>
                    <v-menu
                      offset-x
                      left
                      bottom>
                       <template v-slot:activator="{ on }">
                        <v-icon v-on="on">more_vert</v-icon>
                      </template>

                      <v-list dense >

                        <v-list-item
                          ripple
                          @click="$router.push({name:'faculty-update',
                                                params:{facultyId:item.id}})">
                          <v-list-item-action>
                            <v-icon>edit</v-icon>
                          </v-list-item-action>
                          <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          ripple
                          @click="dialog = true">
                          <v-list-item-action>
                            <v-icon>delete</v-icon>
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
                      <v-card-title class="headline">Are you sure to delete this faculty?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteFaculty(item.id)"
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
import { FacultyAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import FacultyDetail from "./FacultyDetail.vue";

export default {
  name: "FacultyList",
  mixins: [tableMixin],

  data() {
    return {
      resource: FacultyAPI,
      resourceName: "Faculty",
      headers: [
        {
          text: "Name",
          value: "firstName"
        },
        {
          text: "Email",
          value: "username"
        },
        {
          text: "Department",
          value: "department"
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
    facultyDetail(faculty) {
      this.$modal.show(
        FacultyDetail,
        {
          modalName: "faculty-detail-modal",
          item: faculty
        },
        {
          name: "faculty-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    },
    async deleteFaculty(id) {
        await FacultyAPI.remove(id);
        this.$notify({
          type: "success",
          title: "Success",
          message: `Faculty deleted successfully`
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
