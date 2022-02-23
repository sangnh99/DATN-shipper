import React, { useState, useEffect } from 'react';
import { Divider, message, Modal, Input, Pagination, Button, List, Avatar, Statistic, Steps } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../loading/loading-component';
import shipperService from '../../../services/shipper-service';
import ShowMap1 from '../show-map1';
import './current-order.css';

// const { Countdown } = Statistic;
// const deadline = Date.now() + 1000 * 3600;
const { Step } = Steps;

export default function CurrentOrder(props) {
    const [current, setCurrent] = useState(0);
    const [visibleModal, setVisibleModal] = useState(false);
    const [transaction, setTransaction] = useState(null);
    const [reason, setReason] = useState("");
    const [listItem, setListItem] = useState(null);
    const [disable1, setDisable1] = useState(false);
    const [disable2, setDisable2] = useState(true);
    const [disable3, setDisable3] = useState(true);

    useEffect(() => {
        shipperService.getCurrentOrder(JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                setTransaction(response.data.data);
                setListItem(response.data.data.list_item);
            }
        ).catch(error => {
            // message.error(error.response.data.message);
            setTransaction(0);
        })
    }, [])

    const history = useHistory();

    const onFinishCountDown = () => {
        message.success("finish");
    }

    const handleOk = () => {
        shipperService.cancelCurrentOrder(transaction.id, JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                message.success("Hủy việc giao hàng thành công !");
                setTimeout(() => {
                    history.push("/shipper/take-order");
                }, 1500)
            }
        )
    }

    const handleCancel = () => {
        setVisibleModal(false);
    }

    const continueTransaction1 = () => {
        shipperService.continueCurrentOrder(transaction.id, JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                setDisable1(true);
                setDisable2(false);
                setCurrent(current + 1);
            }
        ).catch(error => {
            message.error(error.response.data.message);
        });

    }

    const continueTransaction2 = () => {
        setDisable2(true);
        setDisable3(false);
        setCurrent(current + 1);
    }

    const continueTransaction3 = () => {
        shipperService.finishCurrentOrder(transaction.id, JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                message.success("Xác nhận giao hàng thành công !");
                setTimeout(() => {
                    history.push("/shipper/transaction");
                }, 1500)
            }
        ).catch(error => {
            message.error(error.response.data.message);
        });
    }


    return (
        <div className='container'>
            <br />
            <Modal title="Lí do hủy đơn hàng" visible={visibleModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Hãy nhập lí do bạn hủy đơn hàng này  : </p>
                <Input.TextArea onChange={event => { setReason(event.target.value) }} />
            </Modal>
            <span style={{ fontFamily: "Nunito", fontSize: 30, paddingTop: 20 }}>Đơn hàng đang giao</span>
            <Divider />
            <div>
                {
                    transaction != 0 ? (
                        <div>
                            <div>
                                {
                                    transaction != null ? (
                                        <div>
                                            <div className='row'>
                                                <div className='col-xl-5'>
                                                    <ShowMap1 lat={transaction.lat} lng={transaction.lng} height={"300px"} width={"90%"} marginLeft={"10px"} marginBottom={"70px"} />
                                                </div>
                                                <div className='col-xl-6' style={{ fontFamily: "Nunito" }}>
                                                    <p style={{ marginBottom: 4, fontSize: 26 }}>{transaction.store_name}</p>
                                                    {/* <p style={{ marginBottom: 2 }}>{item.address.substring(0, item.address.length - 16)}</p> */}
                                                    <p style={{ marginBottom: 4 }}>{transaction.address}</p>
                                                    <p style={{ marginBottom: 4 }}>Đặt bởi : {transaction.user_app_name}</p>
                                                    <p style={{ marginBottom: 4 }}>Địa chỉ giao hàng : {transaction.comment}</p>
                                                    <p style={{ marginBottom: 4 }}>Khoảng cách từ quán đến nơi giao hàng : {transaction.distance} km</p>
                                                    <p style={{ marginBottom: 4 }}>Phương thức thanh toán : {transaction.payment_method}</p>
                                                    <p style={{ marginBottom: 4 }}>Thời gian đặt :{transaction.create_date} </p>
                                                    <p style={{ marginTop: 61, fontSize: 28 }}>Tổng tiền : {parseInt(transaction.total).toLocaleString()}đ</p>
                                                </div>
                                            </div>

                                            <span style={{ fontFamily: "Nunito", fontSize: 30, paddingTop: 20 }}>Danh sách món ăn</span>
                                            <Divider />

                                            {
                                                listItem != null && (
                                                    <div style={{ marginBottom: 100 }}>
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={listItem}
                                                            renderItem={item => (
                                                                <List.Item>
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar src={item.food_avatar} />}
                                                                        title={<a href="#">{item.food_name} {item.note != "" && " - " + item.note}</a>}
                                                                        description={item.price.toLocaleString() + "đ x " + item.amount + " = " + parseInt(item.price * item.amount).toLocaleString() + "đ"}
                                                                    />
                                                                </List.Item>
                                                            )}
                                                        />
                                                    </div>
                                                )
                                            }
                                            <div>
                                                <p style={{ fontFamily: "Nunito", fontSize: 30, textAlign: "center" }}>Đơn hàng đang giao</p>
                                                {/* <Countdown title="Nếu tài xế không giao trong vòng 1 giờ sau khi nhận đơn, đơn hàng sẽ được chuyển sang tài xế khác" value={deadline} onFinish={onFinishCountDown} /> */}
                                                <br />
                                                <br />
                                                <Steps current={current} style={{ width: 1000, marginTop: 50, marginBottom: 200, marginLeft: 50 }}>
                                                    <Step title="Nhận đơn hàng" description={
                                                        <div>
                                                            <span>Hãy nhấn hủy giao đơn hàng nếu quá trình lấy đơn hàng gặp vấn đề !</span>
                                                            <div className='row' style={{ marginTop: 8 }}>
                                                                <div className='col-xl-6'>
                                                                    <Button onClick={continueTransaction1} style={{ color: "#1890ff", display: "inline" }} disabled={disable1}>Tiếp tục giao hàng</Button>
                                                                </div>
                                                                <div className='col-xl-6'>
                                                                    <Button onClick={() => { setVisibleModal(true) }} style={{ color: "red", display: "inline" }} disabled={disable1}>Hủy giao đơn hàng</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    } />
                                                    <Step title="Giao hàng" description={
                                                        <div>
                                                            <span>Nhấn vào đây để xác nhận đã đến nơi giao hàng!</span>
                                                            <div className='row' style={{ marginTop: 8 }}>
                                                                <div className='col-xl-6'>
                                                                    <Button onClick={continueTransaction2} style={{ color: "#1890ff", display: "inline" }} disabled={disable2}>Đã đến nơi giao hàng</Button>
                                                                </div>
                                                                {/* <div className='col-xl-6'>
                                            <Button onClick={() => {setVisibleModal(true)}} style={{ color: "red", display: "inline", marginLeft: 15 }} disabled={disable2}>Hủy giao đơn hàng</Button>
                                        </div> */}
                                                            </div>
                                                        </div>
                                                    } />
                                                    <Step title="Hoàn thành giao hàng" description={
                                                        <div>
                                                            <p>Nhấn vào đây khi hoàn thành xong </p>
                                                            <p>việc giao hàng !</p>
                                                            <Button onClick={continueTransaction3} style={{ color: "#1890ff", display: "inline", marginTop: 8 }} disabled={disable3}>Hoàn thành</Button>
                                                        </div>
                                                    } />
                                                </Steps>
                                            </div>
                                        </div>
                                    ) : <Loading />
                                }
                            </div>
                        </div>
                    ) : <p>Hiện bạn không có đơn hàng đang giao nào.</p>
                }
            </div>
        </div>
    )
}