import { API_ROOT } from ".";
import Request from "./request";

const PATH = "Users";

const UserAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/${id}`);
  },
  all(filter) {
    return Request.get(`${API_ROOT}${PATH}`, { params: { filter } });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}`, data);
  },
  update(data) {
    return Request.patch(`${API_ROOT}${PATH}/${data.id}`, data);
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/${id}`);
  },
  search(query) {
    return Request.get(`${API_ROOT}${PATH}/search`, {
      params: { searchKey: query }
    });
  },
  block(id) {
    return Request.put(`${API_ROOT}${PATH}/block/${id}`);
  }
};

export default UserAPI;
