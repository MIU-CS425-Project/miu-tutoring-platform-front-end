import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/post";

const PostAPI = {
  getByTutorialGroup(tutorialGroup) {
    return Request.post(`${API_ROOT}${PATH}/getbytutorialgroup`, tutorialGroup);
  }
};

export default PostAPI;
