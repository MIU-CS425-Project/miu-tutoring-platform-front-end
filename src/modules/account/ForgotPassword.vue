<template>
  <v-container 
    fluid 
    fill-height 
    pa-0>
    <v-layout 
      row 
      wrap>
      <v-flex 
        xs12 
        md12 
        order-xs2 
        order-md1>
        <div class="text-xs-center">
          <v-layout
            class="pa-0 ma-0"
            align-center
            justify-center
            fill-height
            fill-width
            style="z-index: 99; position:absolute; width:100%;bottom:6em"
          >
            <v-flex 
              xs10 
              sm8 
              md4 
              lg3>
              <v-flex class="mb-4">
                <v-layout justify-center >
                  <img
                    height="200"
                    src="@/assets/logo.png">
                </v-layout>
              </v-flex>
              <v-card class="elevation-12">
                <v-toolbar 
                  dark 
                  color="primary">
                  <v-toolbar-title>
                    <div class="text-xs-center">Password Reset Request</div>
                  </v-toolbar-title>
                  <v-spacer />
                </v-toolbar>

                <v-card-text>
                  <v-form @submit.prevent="requestReset">
                    <v-text-field
                      v-validate="'required'"
                      v-model="username"
                      :error-messages="errors.collect('username')"
                      prepend-icon="person"
                      name="username"
                      label="User"
                      type="text"
                      autocomplete="username"
                    />

                    <v-card-actions class="text-xs-center">
                      <v-btn 
                        type="submit" 
                        block 
                        color="primary" 
                        >
                        Submit
                      </v-btn>
                    </v-card-actions>
                    <router-link :to="{ name: 'login' }">
                      Login
                    </router-link>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { AuthAPI } from "@/api";

export default {
  name: "ForgotPassword",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    requestReset() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          AuthAPI.forgot(this.username)
            .then(() => {
              this.$validator.reset();
              this.$notify({
                type: "success",
                title: "Success",
                message: "Password reset requested. contact the system admin."
              });
              this.$router.push({ name: "login" });
            })
            .catch(err => {
              if (err.statusCode === 422) {
                this.$notify({
                  type: "danger",
                  title: "Error",
                  message: "Username not found."
                });
              }
            });
        }
      });
    }
  }
};
</script>
