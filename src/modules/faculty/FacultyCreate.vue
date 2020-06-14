<template>
  <v-layout
    justify-center
    row
    wrap
  >
    <v-flex xs11>
      <v-form @submit.prevent="save" ref="form" v-model="valid">
        <v-toolbar
          dense
          class="grey lighten-4 elevation-2 mb-1"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                slot="activator"
                icon
                v-on="on"
                @click="$router.push({ name: 'faculty-list' })">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Cancel</span>
          </v-tooltip>
          <v-toolbar-title
            class="blue-grey--text text--darken-2 font-weight-bold"
          >
            Add Faculty
          </v-toolbar-title>
          <v-spacer/>
          <v-btn
            color="primary"
            type="submit"
          >
            Save
          </v-btn>
        </v-toolbar>

        <v-card
          tile
          class="grey lighten-5 pa-10"
        >
          <!-- row 1 -->
          <v-layout row>
            <v-flex xs4>
              <v-text-field
                :rules="requiredRules"
                v-model="item.firstName"
                label="First Name"
                name="firstName"
                filled
                autofocus
              />
            </v-flex>
            <v-flex 
              xs4 
              pl-3>
              <v-text-field
                v-model="item.middleName"
                label="Middle Name"
                name="middleName"
                filled                
              />
            </v-flex>
            <v-flex 
              xs4 
              pl-3>
              <v-text-field
                :rules="requiredRules"
                v-model="item.lastName"
                label="Last Name"
                name="lastName"
                filled                
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs4
            >
              <v-text-field
                v-model="item.department"
                label="Department"
                name="department"
                filled                
              />
            </v-flex>
            <v-flex 
              pl-3 xs4>
              <v-text-field
                :rules="emailRules"
                v-model="item.username"
                label="Email"
                name="username"
                filled
              />
            </v-flex>
            <v-flex 
              xs4
              pl-3>
              <v-text-field
                :rules="passwordRules"
                v-model="item.password"
                label="Password"
                name="password"
                filled                
              />
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { FacultyAPI } from "@/api";

export default {
  name: "FacultyCreate",
  data() {
    return {
      valid: true,
      enrollmentDate: null,
      enrollmentModal: false,
      item: {},
      requiredRules: [v => !!v || "This field is required"],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 3 || 'Password must be greater than three characters'
      ]
    };
  },
  methods: {
    save() {
      this.$refs.form.validate();
      if(this.valid){
        this.item.enrollmentDate = this.enrollmentDate;
          FacultyAPI.create(this.item)
            .then(
              res => {
              if(!res){
                this.$notify({
                    type: "danger",
                    title: "Error",
                    message: "There is a user with the given email"
                });
              } else{
                this.$notify({
                  type: "success",
                  title: "Success",
                  message: "Faculty created successfully"
                });
                this.item = {};
                this.$router.push({ name: "faculty-list" });
              }
            })
        }
    }
  }
};
</script>
