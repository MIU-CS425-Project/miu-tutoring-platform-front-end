<template>
  <div>
    <v-container 
      grid-list-xl 
      text-xs-center>
      <v-layout 
        row 
        wrap>
        <v-flex 
          xs8 
          offset-xs2>
          <v-card 
            style="min-height:25em" 
            color="white">
            <v-tabs fixed-tabs>
              <v-tab ripple>
                <v-icon>account_circle</v-icon>
                Basic
              </v-tab>
              <v-tab ripple>
                <v-icon>lock</v-icon>
                Change Password
              </v-tab>
              <v-tab-item>
                <v-container 
                  grid-list-xl 
                  fluid>
                  <v-layout 
                    row 
                    wrap>
                    <v-flex 
                      xs12 
                      md6 
                      offset-md3>
                      <v-card ref="card">
                        <v-card-text>
                          <div class="layout ma-0 align-center column">
                            <v-avatar 
                              size="80" 
                              color="primary">
                              <img src="@/assets/avatar_anonymous.png" >
                            </v-avatar>
                            <div class="flex  text-sm-center">
                              <div class="headline bold">
                                {{ user.name }}
                              </div>
                              <div class="subheading">Account Number: {{ account.accountNumber }}</div>
                              <div class="subheading">Account Type: {{ account.type }}</div>
                              <div class="subheading">Balance: {{ account.deposit }}</div>
                              <v-chip
                                label
                                small
                                color="primary"
                                text-color="white"
                              >{{ user.role }}</v-chip
                              >
                            </div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-tab-item>
              <v-tab-item>
                <form-error-messages :messages="errorMessage" />
                <v-container 
                  fluid 
                  pl-5 
                  pb-0 
                  grid-list-xl>
                  <v-form @submit.prevent="update">
                    <v-layout row>
                      <v-flex 
                        xs8 
                        offset-xs2 
                        pb-0 
                        pt-0>
                        <v-text-field
                          v-validate="'required|min:5'"
                          ref="oldPassword"
                          v-model="item.oldPassword"
                          :error-messages="errors.collect('oldPassword')"
                          label="Old password"
                          name="oldPassword"
                          type="password"
                          outline
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex 
                        xs8 
                        offset-xs2 
                        pb-0 
                        pt-0>
                        <v-text-field
                          v-validate="'required|min:5'"
                          ref="newPassword"
                          v-model="item.newPassword"
                          :error-messages="errors.collect('newPassword')"
                          label="New password"
                          name="newPassword"
                          type="password"
                          outline
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex 
                        xs8 
                        offset-xs2 
                        pb-0 
                        pt-0>
                        <v-text-field
                          v-validate="'required|confirmed:newPassword'"
                          v-model="item.confirmPassword"
                          :error-messages="
                            errors.collect('password_confirmation')
                          "
                          label="Password confirm"
                          name="password_confirmation"
                          type="password"
                          outline
                        />
                      </v-flex>
                    </v-layout>
                    <v-layout pb-4>
                      <v-spacer />

                      <v-btn 
                        type="submit" 
                        color="primary" 
                        large>Save</v-btn>
                      <v-spacer />
                    </v-layout>
                  </v-form>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { UserAccountAPI } from "@/api";
import AccountService from "@/services";

export default {
  data() {
    return {
      errorMessage: null,
      user: AccountService.getProfile(),
      item: {},
      account: {}
    };
  },
  methods: {
    update() {
      delete this.item.confirmPassword;
      this.errorMessage = null;
      this.$validator.validateAll().then(valid => {
        if (valid) {
          UserAccountAPI.updatePassword(this.item)
            .then(res => {
              this.$notify({
                type: "success",
                title: "Success",
                message: "Password updated successfully"
              });
              AccountService.updateToken(res.tokenId);
            })
            .catch(err => {
              if (err.statusCode === 401) {
                this.errorMessage = err.message;
              }
            })
            .finally(() => {
              this.item = {};
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
