import axios from 'axios';
import authHeader from './auth-header';
//const API_URL = 'http://localhost:8866/';
const API_URL = "https://sang-delivery.herokuapp.com/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'user/profile', { headers: authHeader() });
  }

  getUserInfo(id) {
    return axios.get(API_URL + 'user/info', {params : {id : id},  headers: authHeader() });
  }


  updateUserInfo(id, full_name, phone, address, avatar){
    return axios.post(API_URL + 'user/info', {"id" : id, "full_name" : full_name, "phone"  : phone,"address" : address,"avatar" : avatar}, {headers : authHeader()})
  }

  updatePassword(id, new_password){
    return axios.post(API_URL + 'user/password', {"id" : id, "new_password" : new_password}, {headers : authHeader()})
  }


  getAllUserTransaction(offset, value_search, type_sort, column_sort){
    return axios.get(API_URL + 'admin/transaction', {params : {offset : offset, value_search : value_search, type_sort : type_sort, column_sort : column_sort}, headers: authHeader() });
  }

  // paymentDirect(user_app_id, total){
  //   return axios.post(API_URL + 'user/payment/direct', {"user_app_id" : user_app_id, "total" : total}, {headers : authHeader()});
  // }
}

export default new UserService();
