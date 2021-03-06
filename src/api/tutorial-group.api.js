import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/tutorialgroup";

const TutorialGroupAPI = {
    get(id) {
      return Request.get(`${API_ROOT}${PATH}/get/${id}`);
    },
    all(page, itemsPerPage, sortBy, sortDesc) {
      return Request.get(`${API_ROOT}${PATH}/list`, {
        params: {page, itemsPerPage, sortBy, sortDesc}
      });
    },
    getBySection(sectionId) {
      return Request.get(`${API_ROOT}${PATH}/getbysection/${sectionId}`);
    },
    create(data) {
      return Request.post(`${API_ROOT}${PATH}/register/`, data);
    },
    update(data) {
      return Request.put(`${API_ROOT}${PATH}/edit/${data.tutorialGroupId}`, data);
    },
    remove(id) {
      return Request.delete(`${API_ROOT}${PATH}/delete/${id}`);
    },
    search(data) {
      return Request.post(`${API_ROOT}${PATH}/search`, data);
    }
  };

  export default TutorialGroupAPI;