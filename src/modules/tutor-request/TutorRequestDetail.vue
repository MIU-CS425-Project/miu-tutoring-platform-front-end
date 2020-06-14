<template>
  <div>
    <v-card>
      <v-form @submit.prevent="approve" ref="form" v-model="valid">
      <v-card-title
        primary
        primary-title
        class="primary--text text--darken-3">
        <div>
          <div class="headline">Experience - {{ item.enrollment ? item.enrollment.student ? 
                ( item.enrollment.student.firstName + " " + item.enrollment.student.middleName + " " + item.enrollment.student.lastName ) : '' : '' }}
               </div>
          <span></span>
        </div>
      </v-card-title>
      <v-card-subtitle>{{ item.section ? item.section.sectionName : '' }}</v-card-subtitle>
      <v-divider light/>
      <v-card-text>
        {{ item.experience }}
        <v-layout row pa-2 pt-5>
          <v-flex 
            xs12>
            <v-select
              :rules="requiredRules"
              :items="tutorialGroups"
              label="Tutorial Group"
              item-text="tutorialGroupNumber"
              v-model="tutorialGroup"
              filled
              return-object
            ></v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pb-3 pr-3">
        <v-spacer />
        <v-btn
          color="primary"
          @click="approve(item)"
          type="submit"
        >Approve</v-btn>
        <v-btn
          color="primary"
          @click="reject(item)"
        >Deny</v-btn>
        <v-btn
          color="primary"
          @click="close()">Close</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { TutorRequestAPI, TutorialGroupAPI } from "@/api";

export default {
  name: "TutorrequestDetail",
    data() {
    return {
      valid: true,
      requiredRules: [v => !!v || "This field is required"],
      tutorialGroup: null,
      tutorialGroups: [],
    };
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
    TutorialGroupAPI.getBySection(this.item.section.sectionId).then(res => {
      this.tutorialGroups = res;  
      this.loading = false; 
    })
  },
  methods: {
    close() {
      this.$modal.hide(this.modalName);
    },
    approve() {
      this.$refs.form.validate();
      if (this.valid) {
        TutorRequestAPI.approve(this.item,this.tutorialGroup)
          .then(() => {
            this.$notify({
              type: "success",
              title: "Success",
              message: "Request approved"
            });
            this.$router.push({ name: "tutorrequest-list" });
            this.$modal.hide(this.modalName);
          })
          .catch(err => {
            if (err.statusCode === 422) {
              const { messages } = err.details;
              this.errorMessage = messages;
            }
          });
        }
    },
    reject(item) {
      TutorRequestAPI.reject(item)
        .then(() => {
          this.$notify({
            type: "success",
            title: "Success",
            message: "Request denied"
          });
          this.$router.push({ name: "tutorrequest-list" });
          this.$modal.hide(this.modalName);
        })
        .catch(err => {
          if (err.statusCode === 422) {
            const { messages } = err.details;
            this.errorMessage = messages;
          }
        });
    },
  }
};
</script>

<style>
</style>
