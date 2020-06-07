import GroupChat from "./GroupChat.vue";
import GroupList from "./GroupList.vue";

export default [
  {
    path: "tutorial-group/:tutorialGroupId",
    name: "tutorial-group-chat",
    component: GroupChat,
    meta: {
      allowedRoles: ["Administrator"]
    }
  },
  {
    path: "tutorial-group-list",
    name: "tutorial-group-list",
    component: GroupList,
    meta: {
      allowedRoles: ["Administrator"]
    }
  }
];
