import React, { useState, useEffect } from "react";
import { message, Divider } from "antd";
import Loading from "../../loading/loading-component";
import './personal-info.css';
import shipperService from "../../../services/shipper-service";

export default function ShipperInfo(props) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        shipperService.getShipperPersonalInfo(JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                setInfo(response.data.data);
            }
        ).catch(error => {
            message.error(error.response.data.message);
        })
    }, [])

    return (
        <div className="container">
            <br />
            <span style={{ fontFamily: "Nunito", fontSize: 30, paddingTop: 20 }}>Thông tin cá nhân</span>
            <Divider />
            <div>
                {
                    info != null ? (
                        <div>
                            <div class="page-content page-container" id="page-content">
                                <div class="padding">
                                    <div class="row container d-flex justify-content-center">
                                        <div class="col-xl-10 col-md-12">
                                            <div class="card user-card-full">
                                                <div class="row m-l-0 m-r-0">
                                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                                        <div class="card-block text-center text-white">
                                                            <div class="m-b-25"> <img src={info.avatar} class="img-radius" alt="User-Profile-Image" /> </div>
                                                            <h6 class="f-w-600">{info.full_name}</h6>
                                                            <p>Nhân viên giao hàng</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8">
                                                        <div class="card-block">
                                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Thông tin cá nhân</h6>
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Mã số tài xế</p>
                                                                    <h6 class="text-muted f-w-400">{info.code}</h6>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Số CMND</p>
                                                                    <h6 class="text-muted f-w-400">{info.cmnd}</h6>
                                                                </div>
                                                            </div>
                                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Số điện thoại</p>
                                                                    <h6 class="text-muted f-w-400">{info.phone}</h6>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Địa chỉ</p>
                                                                    <h6 class="text-muted f-w-400">{info.address}</h6>
                                                                </div>
                                                            </div>
                                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Email</p>
                                                                    <h6 class="text-muted f-w-400">{info.email}</h6>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    <p class="m-b-10 f-w-600">Ngày đăng kí</p>
                                                                    <h6 class="text-muted f-w-400">{info.created_date}</h6>
                                                                </div>
                                                            </div>
                                                            <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="fab fa-facebook" style={{fontSize : 30, marginTop : 10, color : "#1890ff"}}></i></a></li>
                                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="fab fa-instagram" style={{fontSize : 30, marginTop : 10, color : "#f5222d"}}></i></a></li>
                                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="fab fa-twitter" style={{fontSize : 30, marginTop : 10, color : "#40a9ff"}}></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <Loading />
                }
            </div>
        </div>
    );
}