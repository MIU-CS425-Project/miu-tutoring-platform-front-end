import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/post";

const PostAPI = {
  getByTutorialGroup(tutorialGroup) {
    return Request.post(`${API_ROOT}${PATH}/getbytutorialgroup`, tutorialGroup);
  },
  getCurrentUsers(tutorialGroupId) {
    return Request.get(`${API_ROOT}${PATH}/group/${tutorialGroupId}/users`);
  }
};

export default PostAPI;
