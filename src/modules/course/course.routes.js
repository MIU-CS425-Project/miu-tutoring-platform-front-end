import CourseList from "./CourseList.vue";
import CourseCreate from "./CourseCreate.vue";
import CourseUpdate from "./CourseUpdate.vue";

export default [
  {
    path: "courses",
    name: "course-list",
    component: CourseList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "courses/new",
    name: "course-create",
    component: CourseCreate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "courses/:courseId/update",
    name: "course-update",
    component: CourseUpdate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
