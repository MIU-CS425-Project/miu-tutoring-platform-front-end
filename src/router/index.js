import Vue from "vue";
import Router from "vue-router";
import AccountService from "@/services";

import routes from "./routes";

Vue.use(Router);

const router = new Router({
  base: "/admin/",
  routes
});

router.beforeEach((to, from, next) => {
  const authenticated = AccountService.isAuthenticated();
  const publicRoutes = ["login", "forgot"];
  if (!authenticated && !publicRoutes.includes(to.name)) {
    next({ name: "login" });
  } else if (authenticated && to.name === "login") {
    next({ name: "person" });
  } else {
    next();
  }
});
export default router;
