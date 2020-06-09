import Vue from "vue";
import Router from "vue-router";
import AccountService from "@/services";

import routes from "./routes";

Vue.use(Router);

const router = new Router({
  base: "/app/",
  routes
});

router.beforeEach((to, from, next) => {
  
  const authenticated = AccountService.isAuthenticated();
  const publicRoutes = ["login", "forgot"];
  const roles = AccountService.getRoles();

  if (!authenticated && !publicRoutes.includes(to.name)) {
    next({ name: "login" });
  } else if (authenticated && to.name === "login") {
    if(roles.includes("ROLE_ADMIN")){
      next({ name: "student-list" });
    } else if(roles.includes("ROLE_STUDENT")){
      next({ name: "group-list" });
    } else if(roles.includes("ROLE_FACULTY")){
      next({ name: "tutorialgroup-list" });
    } 
  } else {
    next();
  }
});
export default router;
