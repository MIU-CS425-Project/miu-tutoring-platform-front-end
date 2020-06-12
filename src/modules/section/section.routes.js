import SectionList from "./SectionList.vue";
import SectionCreate from "./SectionCreate.vue";
import SectionUpdate from "./SectionUpdate.vue";

export default [
  {
    path: "sections",
    name: "section-list",
    component: SectionList,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "sections/new",
    name: "section-create",
    component: SectionCreate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  },
  {
    path: "sections/:sectionId/update",
    name: "section-update",
    component: SectionUpdate,
    meta: {
      allowedUserRoles: ["Administrator"]
    }
  }
];
