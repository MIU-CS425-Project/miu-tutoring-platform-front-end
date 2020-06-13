import GroupChat from "./GroupChat.vue";
import GroupList from "./GroupList.vue";

export default [
  {
    path: "group/:tutorialGroupId",
    name: "group-chat",
    component: GroupChat,
    meta: {
      allowedRoles: ["Administrator"]
    }
  },
  {
    path: "group-list",
    name: "group-list",
    component: GroupList,
    meta: {
      allowedRoles: ["Administrator"]
    }
  }
];
