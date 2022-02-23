import axios from "axios";
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        // if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        //   // console.log("Localstorage get user" + localStorage.getItem('user'));
        // }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    // localStorage.removeItem("email");
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("carts");
  }

  register(username, email, password, confirmpassword, phone, fullname) {
    console.log(confirmpassword);
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      confirmpassword,
      phone,
      fullname
    });
  }

  verifyemail(email, token){
    console.log(email);
    console.log(token);
    return axios.post(API_URL + "register/handle-register", {
      email,
      token
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
