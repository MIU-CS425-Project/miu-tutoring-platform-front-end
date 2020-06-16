import ReportList from "./ReportList.vue";
import FacultyReportList from "./FacultyReportList.vue";
import ReportCreate from "./ReportCreate.vue";
import ReportUpdate from "./ReportUpdate.vue";

export default [
  {
    path: "reports",
    name: "student-report-list",
    component: ReportList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "faculty-reports",
    name: "faculty-report-list",
    component: FacultyReportList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "reports/new",
    name: "student-report-create",
    component: ReportCreate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "reports/:reportId/update",
    name: "student-report-update",
    component: ReportUpdate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
