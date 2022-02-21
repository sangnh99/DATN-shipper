import axios from "axios";
import authHeader from './auth-header';
//const API_URL = "http://localhost:8866/";
const API_URL = "https://sang-delivery.herokuapp.com/";


class ImageService{
    async postImageUserAvatar(fd, id){
        return await axios.post(API_URL + "image/upload-user-avatar/" + id, fd, { headers : authHeader()})
    };

    async postImage(fd){
        return await axios.post(API_URL + "image/upload-image", fd, { headers : authHeader()})
    };
    //     postImage(fd){
    //     httpCommon.post("/image/upload", fd)
    // };
}

export default new ImageService();