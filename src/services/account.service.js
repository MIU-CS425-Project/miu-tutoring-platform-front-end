// import { AuthAPI } from "@/api";
import Router from "@/router";

export const ACCESS_TOKEN_KEY = "token";
export const PROFILE_KEY = "profile";

const AccountService = {
  login(
    email, password
    ) {
    const res = {token: "djsackajhfisdaf874rhfashouiwgafp9awjlapw3ur",
    data: {
      fullName: "Admin",
      email: email,
      role: "admin"
    }}
    // return AuthAPI.login(email, password)
    //   .then(res => {
    //     if (res && res.data) {
    //       if(res.data.role == 'admin'){
            localStorage.setItem(ACCESS_TOKEN_KEY, password);
            localStorage.setItem(
              PROFILE_KEY,
              JSON.stringify({
                name: email,
                email: email,
                role: res.data.role
              })
            );
            return Promise.resolve(true);
      //     }
      //     else{
      //       throw "Unauthorized user"
      //     }
      //   }
      // })
      // .catch(err => {
      //   throw err;
      // });
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
  getRole() {
    return this.getProfile() && this.getProfile().role;
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token !== null && token !== "undefined";
  }
};

export default AccountService;
