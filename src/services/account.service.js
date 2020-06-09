import { AuthAPI } from "@/api";
import Router from "@/router";

export const ACCESS_TOKEN_KEY = "token";
export const PROFILE_KEY = "profile";

const AccountService = {
  login(email, password) {
    return AuthAPI.login(email, password)
      .then(res => {
        if (res && res.jwt) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.jwt);
          localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify({
              name: res.username,
              email: res.username,
              roles: res.roles
            })
          );
          return Promise.resolve(true);
        }
      })
      .catch(err => {
        throw err;
      });
  },
  async logout() {
    // logout the user on the API
    // await AuthAPI.logout();

    // clear local storage
    this.logoutClientOnly();
  },

  logoutClientOnly() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    Router.push({ name: "login" });
  },
  updateToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),

  getProfile: () => JSON.parse(localStorage.getItem(PROFILE_KEY)),
  getRoles() {
    return this.getProfile() && this.getProfile().roles;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== "undefined";
  }
};

export default AccountService;
