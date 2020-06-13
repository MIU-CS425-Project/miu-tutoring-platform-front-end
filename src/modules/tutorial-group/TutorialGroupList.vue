<template>
  <div>
    <v-container
      fluid
      class="pb-0">
      <v-layout >
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Tutorial Groups
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
                @click="$router.push({ name: 'tutorialgroup-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Tutorial Group
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
              @click:row="tutorialgroupDetail"
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
                        <v-icon v-on="on">more_vert</v-icon>
                      </template>

                      <v-list dense >

                        <v-list-item
                          ripple
                          @click="$router.push({name:'tutorialgroup-update',
                                                params:{tutorialGroupId:item.tutorialGroupId}})">
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
                      <v-card-title class="headline">Are you sure to delete this tutorialgroup?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteTutorialGroup(item.tutorialGroupId)"
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
import { TutorialGroupAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import TutorialGroupDetail from "./TutorialGroupDetail.vue";

export default {
  name: "TutorialGroupList",
  mixins: [tableMixin],

  data() {
    return {
      resource: TutorialGroupAPI,
      resourceName: "TutorialGroup",
      headers: [
        {
          text: "Group Number",
          value: "tutorialGroupNumber"
        },
        {
          text: "Section",
          value: "section"
        },
        {
          text: "Members",
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
    tutorialgroupDetail(tutorialgroup) {
      this.$modal.show(
        TutorialGroupDetail,
        {
          modalName: "tutorialgroup-detail-modal",
          item: tutorialgroup
        },
        {
          name: "tutorialgroup-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    },
    async deleteTutorialGroup(id) {
        await TutorialGroupAPI.remove(id);
        this.$notify({
          type: "success",
          title: "Success",
          message: `TutorialGroup deleted successfully`
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
