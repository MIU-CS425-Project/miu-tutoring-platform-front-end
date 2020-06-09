import { Login, ForgotPassword } from "@/modules/account";
import AppLayout from "@/modules/layout";
import NotFoundPage from "@/components/NotFoundPage.vue";

import accountRoutes from "@/modules/account/account.routes";
import studentRoutes from "@/modules/student/student.routes";
import tutorialGroupRoutes from "@/modules/tutorial-group/tutorial-group.routes";

const routes = [
  {
    path: "/",
    redirect: { name: "login"}
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      ...accountRoutes,
      ...studentRoutes,
      ...tutorialGroupRoutes
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotPassword
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundPage
  }
];
export default routes;
