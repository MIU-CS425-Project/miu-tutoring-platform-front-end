<template>
  <v-card>
    <v-card-title class="title font-weight-thin">Change Password</v-card-title>
    <v-divider />
    <v-container 
      fluid 
      pl-5 
      pb-0 
      grid-list-xl>
      <v-form @submit.prevent="resetPassword">
        <v-layout 
          row 
          wrap>
          <v-flex center>
            <h4 
              center 
              class="font-weight-thin">Full Name</h4>
            <h2>{{ user.fullName }}</h2>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex 
            pb-0 
            pt-0>
            <v-text-field
              v-validate="'required|min:5'"
              ref="password"
              v-model="password"
              :error-messages="errors.collect('password')"
              name="password"
              label="Password"
              type="password"
              outline
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex 
            pb-0 
            pt-0>
            <v-text-field
              v-validate="'required|confirmed:password'"
              v-model="confirmPassword"
              :error-messages="errors.collect('password_confirmation')"
              name="password_confirmation"
              label="Confim Password"
              type="password"
              outline
            />
          </v-flex>
        </v-layout>

        <v-layout 
          row 
          wrap>
          <v-btn 
            type="submit" 
            color="accent" 
            large> Update </v-btn>
        </v-layout>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { UserAccountAPI } from "@/api";

export default {
  name: "ResetPassword",
  props: {
    user: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    resetPassword() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          UserAccountAPI.changePassword(this.user.id, this.password)
            .then(() => {
              this.$notify({
                type: "success",
                title: "Success",
                message: "Password updated successfully"
              });
              this.$modal.hide("reset-password-modal");
            })
            .finally(() => {
              this.password = "";
              this.confirmPassword = "";
            });
        }
      });
    }
  }
};
</script>
