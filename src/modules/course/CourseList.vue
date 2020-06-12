<template>
  <div>
    <v-container
      fluid
      class="pb-0">
      <v-layout >
        <v-flex xs12>
          <div class="headline font-weight-thin">
            Courses
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
                @click="$router.push({ name: 'course-create' })"
              >
                <v-icon class="mr-1">add_circle_outline</v-icon>
                New Course
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
              @click:row="courseDetail"
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
                          @click="$router.push({name:'course-update',
                                                params:{courseId:item.courseId}})">
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
                      <v-card-title class="headline">Are you sure to delete this course?</v-card-title>

                      <v-card-text>
                      This action cannot be reversed.  
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="primary"
                          @click="deleteCourse(item.courseId)"
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
import { CourseAPI } from "@/api";
import { tableMixin } from "@/shared/mixins";
import CourseDetail from "./CourseDetail.vue";

export default {
  name: "CourseList",
  mixins: [tableMixin],

  data() {
    return {
      resource: CourseAPI,
      resourceName: "Course",
      headers: [
        {
          text: "Course Number",
          value: "courseNumber"
        },
        {
          text: "Name",
          value: "courseName"
        },
        {
          text: "Credit",
          value: "courseCredit"
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
    courseDetail(course) {
      this.$modal.show(
        CourseDetail,
        {
          modalName: "course-detail-modal",
          item: course
        },
        {
          name: "course-detail-modal",
          height: "auto",
          scrollable: true,
          width: 800
        }
      );
    },
    async deleteCourse(id) {
        await CourseAPI.remove(id);
        this.$notify({
          type: "success",
          title: "Success",
          message: `Course deleted successfully`
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
