import AccountService from "@/services";
import { API_ROOT } from ".";
import Request from "./request";

const PATH = "/authenticate";
const AuthAPI = {
  login(username, password) {
    return Request.post(`${API_ROOT}${PATH}`, { username, password });
  },
  forgot(username) {
    return Request.post(`${API_ROOT}${PATH}/request-password-change`, {
      username
    });
  },
  getuserDetails() {
    return Request.get(`${API_ROOT}/me`);
  },
  logout() {
    return Request.post(`${API_ROOT}${PATH}/logout`, {
      accessToken: AccountService.getAccessToken()
    });
  }
};

export default AuthAPI;
