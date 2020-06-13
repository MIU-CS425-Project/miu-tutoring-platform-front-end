import TutorialGroupList from "./TutorialGroupList.vue";
import TutorialGroupCreate from "./TutorialGroupCreate.vue";
import TutorialGroupUpdate from "./TutorialGroupUpdate.vue";

export default [
  {
    path: "tutorialgroups",
    name: "tutorialgroup-list",
    component: TutorialGroupList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "tutorialgroups/new",
    name: "tutorialgroup-create",
    component: TutorialGroupCreate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "tutorialgroups/:tutorialGroupId/update",
    name: "tutorialgroup-update",
    component: TutorialGroupUpdate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
