import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/report";

const ReportAPI = {
  get(id) {
    return Request.get(`${API_ROOT}${PATH}/get/${id}`);
  },
  getByStudentId(studentId) {
    return Request.get(`${API_ROOT}${PATH}/getbystudent/${studentId}`);
  },
  all(page, itemsPerPage, sortBy, sortDesc) {
    return Request.get(`${API_ROOT}${PATH}/list`, {
      params: {page, itemsPerPage, sortBy, sortDesc}
    });
  },
  create(data) {
    return Request.post(`${API_ROOT}${PATH}/save`, data);
  },
  update(data) {
    return Request.put(`${API_ROOT}${PATH}/edit/${data.reportId}`, data);
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

export default ReportAPI;
