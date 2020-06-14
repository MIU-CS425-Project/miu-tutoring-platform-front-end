import GroupChat from "./GroupChat.vue";
import GroupList from "./GroupList.vue";
import CourseList from "./CourseList.vue";
import RequestList from "./RequestList.vue";

export default [
  {
    path: "group-chat",
    name: "group-chat",
    component: GroupChat,
    meta: {
      allowedRoles: ["Administrator"]
    },
    props: true
  },
  {
    path: "group-list",
    name: "group-list",
    component: GroupList,
    meta: {
      allowedRoles: ["Administrator"]
    }
  },
  {
    path: "student-course-list",
    name: "student-course-list",
    component: CourseList,
    meta: {
      allowedRoles: ["Administrator"]
    }
  },
  {
    path: "student-request-list",
    name: "student-request-list",
    component: RequestList,
    meta: {
      allowedRoles: ["Administrator"]
    }
  }
];
