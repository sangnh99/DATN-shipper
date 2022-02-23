import React, { useState, useEffect } from 'react';
import { Divider, message, Modal, Input, Pagination, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../loading/loading-component';
import shipperService from '../../../services/shipper-service';


const { Search } = Input;

export default function TakeOrder(props) {

    const [valueSearch, setValueSearch] = useState(" ");
    const [offset, setOffset] = useState(1);
    const [listTransaction, setListTransaction] = useState(null);
    const [currentItem, setCurrentItem] = useState(0);
    const [visibleModal, setVisibleModal] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        getTransactions();
    }, [])

    useEffect(() => {
        getTransactions(1);
        setOffset(1);
    }, [valueSearch])

    const history = useHistory();

    const getTransactions = (page = offset) => {
        shipperService.getAllTransaction(valueSearch, page).then(
            (response) => {
                console.log(response.data.data);
                setListTransaction(response.data.data);
                setTotalRows(response.data.total_rows);
            }
        ).catch(error => {
            message.error(error.response.data.message);
        })
    }

    const onSearch = value => {
        setValueSearch(value);
    }

    const handleOk = () => {
        shipperService.takeOrder(currentItem.id, JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                message.success("Bạn đã nhận đơn hàng thành công !");
                setTimeout(() => {
                    history.push("/shipper/current-order");
                }, 1500);
            }
        ).catch (error => {
           message.error(error.response.data.message);
           getTransactions();
           setVisibleModal(false);
        })

    }

    const handleCancel = () => {
        setVisibleModal(false);
    }

    return (
        <div className='container'>
            <br />
            <Modal title="Basic Modal" visible={visibleModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn nhận đơn hàng này ?</p>
            </Modal>
            <span style={{ fontFamily: "Nunito", fontSize: 30, paddingTop: 20 }}>Đơn hàng đang chờ</span>
            <Search
                placeholder="Tìm theo tên quán ăn"
                allowClear
                enterButton
                onSearch={onSearch}
                style={{ width: "36%", float: "right", marginTop: 10 }}
            />
            <Divider />
            <div>
                {
                    listTransaction != null ? (
                        <div>
                            {
                                listTransaction.length != 0 ? (
                                    <div>
                                        {
                                            listTransaction.map(item => {
                                                return (
                                                    <div className="row user-card" style={{ width: "100%", marginBottom: 30 }}>
                                                        <div className="col-xl-3" style={{ height: 150, paddingLeft: 0 }}><img src={item.store_avatar} style={{ width: "100%", height: "100%", backgroundSize: "cover" }}></img></div>
                                                        <div className="col-xl-6" style={{ fontFamily: "Nunito" }}>
                                                            <p style={{ marginBottom: 2, fontSize: 22 }}>{item.store_name}</p>
                                                            {/* <p style={{ marginBottom: 2 }}>{item.address.substring(0, item.address.length - 16)}</p> */}
                                                            <p style={{ marginBottom: 2 }}>{item.address}</p>
                                                            <p style={{ marginBottom: 2 }}>Đặt bởi : {item.user_app_name}</p>
                                                            <p style={{ marginBottom: 2 }}>Địa chỉ giao hàng : {item.comment}</p>
                                                            <p style={{ marginBottom: 2 }}>Phương thức thanh toán : {item.payment_method}</p>
                                                            <p style={{ marginBottom: 2 }}>Thời gian đặt :{item.create_date} </p>
                                                        </div>
                                                        <div className="col-xl-3" style={{ paddingRight: 0, paddingTop: 50, width: "100%" }}>
                                                            <p style={{fontSize : 23, textAlign : "center"}}>{parseInt(item.total).toLocaleString()}đ</p>
                                                            <Button style={{marginLeft : 68}} onClick={() => {setCurrentItem(item); setVisibleModal(true)}}> Nhận đơn hàng </Button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <Pagination current={offset} onChange={value => { setOffset(value); getTransactions(value)}} pageSize={8} total={totalRows} style={{ marginBottom: 50, paddingLeft: 350 }} />
                                    </div>
                                ) : <div>Không có đơn hàng nào để hiển thị</div>
                            }
                        </div>
                    ) : <Loading />
                }
            </div>
        </div>
    );
}