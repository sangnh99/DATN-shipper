import axios from "axios";
import authHeader from './auth-header';
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";


class ShipperService {
  getAllTransaction(value_search, offset) {
    return axios.get(API_URL + 'shipper/available-transactions', { params: { offset: offset, value_search: value_search }, headers: authHeader() })
  }

  takeOrder(transaction_id, shipper_id) {
    return axios.post(API_URL + 'shipper/take-order', { "transaction_id": transaction_id, "shipper_id": shipper_id }, { headers: authHeader() })
  }

  getCurrentOrder(shipper_id){
    return axios.get(API_URL + 'shipper/get-current-order', { params: { shipper_id: shipper_id}, headers: authHeader() })    
  }

  cancelCurrentOrder(transaction_id, shipper_id){
    return axios.post(API_URL + 'shipper/cancel-current-order', { "transaction_id": transaction_id, "shipper_id": shipper_id }, { headers: authHeader() })    
  }

  continueCurrentOrder(transaction_id, shipper_id){
    return axios.post(API_URL + 'shipper/continue-current-order', { "transaction_id": transaction_id, "shipper_id": shipper_id }, { headers: authHeader() })    
  }

  finishCurrentOrder(transaction_id, shipper_id){
    return axios.post(API_URL + 'shipper/finish-current-order', { "transaction_id": transaction_id, "shipper_id": shipper_id }, { headers: authHeader() })    
  }
 
  getShipperTransactions(shipper_id, value_search, offset){
    return axios.get(API_URL + 'shipper/shipper-transactions', { params: {shipper_id : shipper_id , offset: offset, value_search: value_search }, headers: authHeader() })  
  }

  getShipperPersonalInfo(shipper_id){
    return axios.get(API_URL + 'shipper/personal-info', { params: { shipper_id: shipper_id}, headers: authHeader() })    
  }
  updatePasswordShipper(id, new_password, old_password){
    return axios.post(API_URL + 'shipper/password', {"id" : id, "new_password" : new_password, "old_password" : old_password }, {headers : authHeader()})
  }
}

export default new ShipperService();