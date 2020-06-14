import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/tutorialrequest";

const TutorRequestAPI = {
    get(id) {
      return Request.get(`${API_ROOT}${PATH}/get/${id}`);
    },
    getByStudentId(studentId, page, itemsPerPage, sortBy, sortDesc) {
      return Request.get(`${API_ROOT}${PATH}/getbystudent/${studentId}`, {
        params: {page, itemsPerPage, sortBy, sortDesc}
      });
    },
    all(page, itemsPerPage, sortBy, sortDesc) {
      return Request.get(`${API_ROOT}${PATH}/list`, {
        params: {page, itemsPerPage, sortBy, sortDesc}
      });
    },
    create(data) {
      return Request.post(`${API_ROOT}${PATH}/save/`, data);
    },
    update(data) {
      return Request.put(`${API_ROOT}${PATH}/edit/${data.TutorRequestId}`, data);
    },
    approve(data,tutorialGroup) {
      return Request.post(`${API_ROOT}${PATH}/accept/${data.requestId}`, tutorialGroup);
    },
    reject(data) {
      return Request.get(`${API_ROOT}${PATH}/deny/${data.requestId}`);
    },
    remove(id) {
      return Request.delete(`${API_ROOT}${PATH}/delete/${id}`);
    },
    search(data) {
      return Request.post(`${API_ROOT}${PATH}/search`, data);
    }
  };

  export default TutorRequestAPI;