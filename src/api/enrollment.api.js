import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/enrollment";

const EnrollmentAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/get/${id}`);
  },
  all(page, itemsPerPage, sortBy, sortDesc) {
    return Request.get(`${API_ROOT}${PATH}/list`, {
      params: {page, itemsPerPage, sortBy, sortDesc}
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/register`, data);
  },
  update(data) {
    return Request.put(`${API_ROOT}${PATH}/edit/${data.id}`, data);
  },
  remove(id) {
    return Request.delete(`${API_ROOT}${PATH}/delete/${id}`);
  },
  search(searchQuery, page, itemsPerPage, sortBy, sortDesc) {
    return Request.get(`${API_ROOT}${PATH}/search`, {
      params: { searchQuery, page, itemsPerPage, sortBy, sortDesc }
    });
  }
};

export default EnrollmentAPI;
