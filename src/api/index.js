import AuthAPI from "./auth.api";
import UserAccountAPI from "./user-account.api";
import UserAPI from "./user.api";
import RoleAPI from "./role.api";
import StudentAPI from "./student.api";
import TutorialGroupAPI from "./tutorial-group.api";
import PostAPI from "./post.api"
import SectionAPI from "./section.api"
import CourseAPI from "./course.api"
import FacultyAPI from "./faculty.api"
import TutorRequestAPI from "./tutor-request.api"
import EnrollmentAPI from "./enrollment.api"

const API_ROOT = process.env.VUE_APP_API_ROOT+"/api/v1";
export {
  API_ROOT,
  AuthAPI,
  UserAccountAPI,
  UserAPI,
  RoleAPI,
  StudentAPI,
  TutorialGroupAPI,
  PostAPI,
  SectionAPI,
  CourseAPI,
  FacultyAPI,
  TutorRequestAPI,
  EnrollmentAPI
};
