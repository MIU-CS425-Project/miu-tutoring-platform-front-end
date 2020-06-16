import { Login, ForgotPassword } from "@/modules/account";
import AppLayout from "@/modules/layout";
import NotFoundPage from "@/components/NotFoundPage.vue";

import accountRoutes from "@/modules/account/account.routes";
import studentRoutes from "@/modules/student/student.routes";
import studentHomeRoutes from "@/modules/student-home/student-home.routes";
import tutorialGroupRoutes from "@/modules/tutorial-group/tutorial-group.routes"
import sectionRoutes from "@/modules/section/section.routes";
import courseRoutes from "@/modules/course/course.routes";
import facultyRoutes from "@/modules/faculty/faculty.routes";
import tutorRequestRoutes from "@/modules/tutor-request/tutor-request.routes";
import reportRoutes from "@/modules/report/report.routes";

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
      ...studentHomeRoutes,
      ...tutorialGroupRoutes,
      ...sectionRoutes,
      ...courseRoutes,
      ...facultyRoutes,
      ...tutorRequestRoutes,
      ...reportRoutes
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
