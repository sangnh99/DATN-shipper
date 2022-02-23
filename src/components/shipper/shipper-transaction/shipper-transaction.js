import React, { useState, useEffect } from 'react';
import { Divider, message, Modal, Input, Pagination, Button, List, Avatar, Collapse } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Loading from '../../loading/loading-component';
import shipperService from '../../../services/shipper-service';

const { Panel } = Collapse;
const { Search } = Input;

export default function ShipperTransaction(props) {

    const [valueSearch, setValueSearch] = useState(" ");
    const [offset, setOffset] = useState(1);
    const [listTransaction, setListTransaction] = useState(null);
    const [listItem, setListItem] = useState([]);
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
        shipperService.getShipperTransactions(JSON.parse(localStorage.getItem("user")).id, valueSearch, page).then(
            (response) => {
                console.log(response.data.data);
                setListTransaction(response.data.data);
                setTotalRows(response.data.total_rows);
                setListItem(response.data.data.list_item);
            }
        ).catch(error => {
            message.error(error.response.data.message);
        })
    }

    const onSearch = value => {
        setValueSearch(value);
    }

    const handleOk = () => {
        let errorMes = "";
        shipperService.takeOrder(currentItem.id, JSON.parse(localStorage.getItem("user")).id).then(
            (response) => {
                message.success("Bạn đã nhận đơn hàng thành công !");
                setTimeout(() => {
                    history.push("/shipper/current-order");
                }, 1500);
            },
            (error) => {
                getTransactions();
                // setVisibleModal(false);
            }
        ).catch(error => {
            message.error(error.response.data.message);
        })

    }

    const handleCancel = () => {
        setVisibleModal(false);
    }

    return (
        <div className='container'>
            <br />
            <Modal title="Basic Modal" visible={visibleModal} onOk={() => { handleOk(); }} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn nhận đơn hàng này ?</p>
            </Modal>
            <span style={{ fontFamily: "Nunito", fontSize: 30, paddingTop: 20 }}>Các đơn hàng đã giao</span>
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
                                                    <Collapse style={{ marginBottom: 10 }} style={{ backgroundColor: "#ffffff" }} className="transaction">
                                                    <Panel showArrow={false} header={(
                                                        <div className="row" style={{width : 1350}}>
                                                            <div className="col-xl-3" style={{ height: 190 }}><img src={item.store_avatar} style={{ width: "100%", height: "100%", backgroundSize: "cover" }}></img></div>
                                                            <div className="col-xl-7" style={{ fontFamily: "Nunito" }}>
                                                                <p style={{ marginBottom: 2, fontSize: 18 }}><Link to={"/store/" + item.store_id}>{item.store_name}</Link></p>
                                                                <p style={{ marginBottom: 2 }}>{item.address.substring(0, item.address.length - 16)}</p>
                                                                <p style={{ marginBottom: 2 }}>Địa chỉ giao hàng : {item.comment}</p>
                                                                <p style={{ marginBottom: 2 }}>Chủ đơn hàng : {item.user_app_name}</p>
                                                                <p style={{ marginBottom: 2 }}>Phí áp dụng({item.distance}km): {(parseInt(item.distance * 7) * 1000).toLocaleString()}đ</p>
                                                                <p style={{ marginBottom: 2 }}>Phương thức thanh toán : {item.payment_method}</p>
                                                                <p style={{ marginBottom: 2 }}>Thời gian bắt đầu : {item.time_start}</p>
                                                                <p style={{ marginBottom: 2 }}>Thời gian kết thúc : {item.time_end}</p>
                                                            </div>
                                                            <div className="col-xl-2">
                                                                <p style={{ padding: "50px 10px", fontSize: 20 }}>{item.total.toLocaleString()}đ</p>
                                                            </div>
                                                        </div>
                                                    )} key="1" style={{ marginBottom: 10 }}>
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={item.list_item}
                                                            renderItem={childItem => (
                                                                <div>
                                                                    {

                                                                        childItem.amount != 0 ? (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={childItem.food_avatar} />}
                                                                                    title={<Link to={"/food/" + childItem.food_id}>{childItem.food_name} x {childItem.amount}</Link>}
                                                                                    description={
                                                                                        <div>
                                                                                            {
                                                                                                childItem.discount_percent != null ? (
                                                                                                    <span><span style={{ color: "red" }}> {childItem.price.toLocaleString()}đ </span><span>{"<--"}</span> <span style={{ textDecoration: "line-through" }}> {childItem.original_price.toLocaleString()}đ </span> </span>
                                                                                                ) :
                                                                                                    (
                                                                                                        <span>{childItem.price.toLocaleString()}đ </span>
                                                                                                    )
                                                                                            }
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                            </List.Item>
                                                                        ) : (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src={childItem.food_avatar} />}
                                                                                    title={"Món ăn đã bị xóa !"}
                                                                                    description={"Món ăn này đã bị xóa khỏi hệ thống !"}
                                                                                />
                                                                            </List.Item>
                                                                        )
                                                                    }
                                                                </div>
                                                            )}
                                                        />
                                                    </Panel>
                                                </Collapse>
                                                )
                                            })
                                        }

                                        <Pagination current={offset} onChange={value => { setOffset(value); getTransactions(value) }} pageSize={8} total={totalRows} style={{ marginBottom: 50, paddingLeft: 350 }} />
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