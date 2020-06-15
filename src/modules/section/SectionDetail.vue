<template>
  <div>
    <v-card>
      <v-card-title
        primary
        primary-title
        class="primary--text text--darken-3">
        <div>
          <div class="headline">{{ item.sectionName }}</div>
          <span>                {{ item.course.courseNumber }} - {{ item.course.courseName }}
</span>
        </div>
      </v-card-title>
      <v-divider light/>
      <v-card-text>
        <strong>Class Room:</strong> {{ item.classRoom }}
        <br />
        <strong>Month:</strong> {{ item.month }}
        <p>
          <strong>Lecturer:</strong> {{ item.faculty ?  (item.faculty.firstName + " " + item.faculty.middleName + " " + item.faculty.lastName): '' }}
        </p>
      </v-card-text>
      <v-card-actions class="pa-3">
        <v-spacer />
        <v-btn
          color="primary"
          @click="edit()"
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
export default {
  name: "SectionDetail",
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
  methods: {
    close() {
      this.$modal.hide(this.modalName);
    },
    edit() {
      this.$modal.hide(this.modalName);
      this.$router.push({
        name: "section-update",
        params: { sectionId: this.item.sectionId }
      });
    }
  }
};
</script>

<style>
</style>
