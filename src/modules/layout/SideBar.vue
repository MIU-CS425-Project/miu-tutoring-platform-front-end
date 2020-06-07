<template>
 <v-navigation-drawer
    permanent
    app
    class="sidebarColor"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/miu.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user.name}}</v-list-item-title>

      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in menus"
          :key="item.title"
          :to="{ name: item.route }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import AccountService from "@/services/account.service";
import { mapState, 
// mapMutations 
} from "vuex";

export default {
  name: "SideBar",
  data() {
    return {
      mini: true,
      drawer: true,
      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      user: AccountService.getProfile(),
      menus: [
        {
          title: "Tutorial Groups",
          icon: "people",
          route: "tutorial-group-list"
        },
        {
          title: "Students",
          icon: "people",
          route: "student-list"
        },      
      ]
    };
  },
  computed: {
    isAdministrator() {
      return this.authenticatedProfileUserRole === "Administrator";
    },
    isCommitteeOfficer() {
      return this.authenticatedProfileUserRole === "Committee Officer";
    },
    isInsideMembers() {
      return this.authenticatedProfileUserRole === "Members";
    },
    cssProps() {
      return {
        "--secondary-color": this.$vuetify.theme.secondary
      };
    },
    ...mapState("core", ["appName"]),
    drawerStatus: {
      get() {
        return this.$store.state.layout.navDrawerToggle;
      },
      set(newValue) {
        this.$store.state.layout.navDrawerToggle = newValue;
      }
    }
  },
  created() {
    this.authenticatedProfileUserRole = AccountService.getProfile().role;
  },
  methods: {
    isAuthorized(allowedUserRoles) {
      if (allowedUserRoles.includes("Administrator") && this.isAdministrator) {
        return true;
      } else if (
        allowedUserRoles.includes("Committee Officer") &&
        (this.isAdministrator || this.isCommitteeOfficer)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style>
.v-list__tile--active {
  background-color: var(--secondary-color);
}
.on-top {
  z-index: 99;
}
</style>
