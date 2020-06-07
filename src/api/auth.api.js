import AccountService from "@/services";
import { API_ROOT } from ".";
import Request from "./request";

const PATH = "users";
const AuthAPI = {
  login(email, password) {
    return Request.post(`${API_ROOT}${PATH}/login`, { email, password });
  },
  forgot(username) {
    return Request.post(`${API_ROOT}${PATH}/request-password-change`, {
      username
    });
  },
  logout() {
    return Request.post(`${API_ROOT}${PATH}/logout`, {
      accessToken: AccountService.getAccessToken()
    });
  }
};

export default AuthAPI;
