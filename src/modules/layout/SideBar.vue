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
      <template v-for="item in menus" >

        <v-list-item
          :key="item.title"
          :to="{ name: item.route }"
          v-if="isAuthorized(item.allowedUserRoles)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
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
          title: "Your Groups",
          icon: "people",
          route: "group-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Applications",
          icon: "people",
          route: "group-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Students",
          icon: "people",
          route: "student-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        }, 
        {
          title: "Faculty",
          icon: "people",
          route: "faculty-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        }, 
        {
          title: "Courses",
          icon: "people",
          route: "course-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        },
        {
          title: "Tutorial Groups",
          icon: "people",
          route: "tutorialgroup-list",
          allowedUserRoles: ["ROLE_FACULTY"]
        },  
        {
          title: "Tutor Requests",
          icon: "people",
          route: "tutor-request-list",
          allowedUserRoles: ["ROLE_FACULTY"]
        },    
      ]
    };
  },
  computed: {
    isAdministrator() {
      return this.authenticatedProfileUserRole.includes("ROLE_ADMIN");
    },
    isFaculty() {
      return this.authenticatedProfileUserRole.includes("ROLE_FACULTY");
    },
    isStudent() {
      return this.authenticatedProfileUserRole.includes("ROLE_STUDENT");
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
    this.authenticatedProfileUserRole = AccountService.getRoles();
  },
  methods: {
    isAuthorized(allowedUserRoles) {      
      let isAllowed = false;
      this.authenticatedProfileUserRole.forEach(role => {
        if(allowedUserRoles.includes(role)){
          isAllowed =  true
        }
      });
      return isAllowed;
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
