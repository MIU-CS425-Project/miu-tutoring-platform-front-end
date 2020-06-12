import FacultyList from "./FacultyList.vue";
import FacultyCreate from "./FacultyCreate.vue";
import FacultyUpdate from "./FacultyUpdate.vue";

export default [
  {
    path: "faculties",
    name: "faculty-list",
    component: FacultyList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "faculties/new",
    name: "faculty-create",
    component: FacultyCreate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "faculties/:facultyId/update",
    name: "faculty-update",
    component: FacultyUpdate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
