<template>
  <div>
    <nav-bar />
    <side-bar />
    <v-content style="margin-top:50px">
        <div class="pa-5">
          <router-view />
        </div>        
    </v-content>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar
  }
};
</script>
