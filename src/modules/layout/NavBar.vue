<template>
  <v-app-bar
    fixed 
    clipped-left 
    color="navbarColor" 
    height="56"
    class="on-top"
    dense
    style="margin-left: 250px;"
    >
    <v-toolbar-title>
      <div class="headline font-weight-thin">
            MIU-Tutoring
          </div>
      </v-toolbar-title>
      
    <v-spacer />
    <v-toolbar-items>
      <v-tooltip bottom>
        <img
          class="ma-1"
          height="48"
          src="@/assets/miu.png">
        <span>Made in MIU</span>
      </v-tooltip>
          <v-menu
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
         <v-icon v-on="on">more_vert</v-icon>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content @click="$router.push({ name: 'user-profile' }), (visible = false)">
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.role }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                class="red--text"
                icon
                @click="logout"
              >
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import AccountService from "@/services";
import { mapState, mapMutations } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      visible: true,
      // user: {"name":"Admin","role": "Admin"}
      user: AccountService.getProfile()
    };
  },
  computed: {
    ...mapState("core", ["appName"])
  },
  methods: {
    // ...mapMutations("layout", ["toggleNavBar"]),
    logout() {
      AccountService.logout();
    },
    ...mapMutations("layout", ["toggleNavBar"])
  }
};
</script>
