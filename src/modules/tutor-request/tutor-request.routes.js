import TutorRequestList from "./TutorRequestList.vue";

export default [
  {
    path: "tutorrequests",
    name: "tutorrequest-list",
    component: TutorRequestList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
