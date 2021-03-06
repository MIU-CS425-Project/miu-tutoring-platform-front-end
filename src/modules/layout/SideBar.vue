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

        <v-list-item-content>
          <v-list-item-title>{{user.name}}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>


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
          title: "Tutor Groups",
          icon: "mdi-forum",
          route: "group-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Requests",
          icon: "mdi-view-list",
          route: "student-request-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Reports",
          icon: "mdi-clipboard-text",
          route: "student-report-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Courses",
          icon: "mdi-notebook-multiple",
          route: "student-course-list",
          allowedUserRoles: ["ROLE_STUDENT"]
        },
        {
          title: "Students",
          icon: "mdi-account-group",
          route: "student-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        }, 
        {
          title: "Faculties",
          icon: "mdi-teach",
          route: "faculty-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        }, 
        {
          title: "Courses",
          icon: "mdi-notebook-multiple",
          route: "course-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        },
        {
          title: "Sections",
          icon: "mdi-google-classroom",
          route: "section-list",
          allowedUserRoles: ["ROLE_ADMIN"]
        },
        {
          title: "Tutorial Groups",
          icon: "mdi-account-multiple",
          route: "tutorialgroup-list",
          allowedUserRoles: ["ROLE_FACULTY"]
        },  
        {
          title: "Tutor Requests",
          icon: "mdi-format-list-checks",
          route: "tutorrequest-list",
          allowedUserRoles: ["ROLE_FACULTY"]
        },    
        {
          title: "Reports",
          icon: "mdi-clipboard-text",
          route: "faculty-report-list",
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
