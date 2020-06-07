import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/UserRoles";

const RoleAPI = {
  all() {
    return Request.get(`${API_ROOT}${PATH}`);
  },
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  }
};

export default RoleAPI;
