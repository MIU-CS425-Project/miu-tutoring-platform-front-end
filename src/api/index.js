import AuthAPI from "./auth.api";
import UserAccountAPI from "./user-account.api";
import UserAPI from "./user.api";
import RoleAPI from "./role.api";
import StudentAPI from "./student.api";
import TutorialGroupAPI from "./tutorial-group.api";
import PostAPI from "./post.api"

const API_ROOT = process.env.VUE_APP_API_ROOT+"/api/v1/";
export {
  API_ROOT,
  AuthAPI,
  UserAccountAPI,
  UserAPI,
  RoleAPI,
  StudentAPI,
  TutorialGroupAPI,
  PostAPI
};
