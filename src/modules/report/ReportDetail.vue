<template>
  <div>
    <v-card>
      <v-card-title
        primary
        primary-title
        class="primary--text text--darken-3">
        <div>
          <div class="headline">{{ isStudent() ? '': item.student ?  item.student.firstName + " " + item.student.middleName + " " + item.student.lastName + ' - ':''}}
            {{ item.tutorialGroup.tutorialGroupNumber }}</div>
          <span>{{ item.course.courseName }}</span>
        </div>
      </v-card-title>
      <v-divider light/>
      <v-card-text>
        {{ item.report }}
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          color="primary"
          @click="edit()"
          v-if="isStudent()"
        >Edit</v-btn>
        <v-btn
          color="primary"
          @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-xs-center"/>
  </div>
</template>

<script>
import AccountService from "@/services/account.service";

export default {
  name: "ReportDetail",
  data() {
    return {
      roles: []
      }
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
  created() {
    this.roles = AccountService.getRoles();
  },
  methods: {
    isStudent(){
      return this.roles.includes("ROLE_STUDENT")
    },
    close() {
      this.$modal.hide(this.modalName);
    },
    edit() {
      this.$modal.hide(this.modalName);
      this.$router.push({
        name: "student-report-update",
        params: { reportId: this.item.reportId }
      });
    }
  }
};
</script>

<style>
</style>
