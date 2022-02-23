import React, {useState, useEffect} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import Sidebar from '../sidebar.js/Sidebar';
import { ChakraProvider } from '@chakra-ui/react';
import TakeOrder from './take-order/take-order';
import CurrentOrder from './current-order/current-order';
import ShipperTransaction from './shipper-transaction/shipper-transaction';
import ShipperInfo from './personal/personal-info';
import ChangePasswordShipper from './personal/shipper-password';

export default function ShipperPage(props){
    return (<div className="row">
        <div className="col-xl-2">

            <ChakraProvider>
                <Sidebar />
            </ChakraProvider>
        </div>
        <div className="col-xl-10">
            <Switch>
                <Route path="/shipper/take-order" component={TakeOrder} />
                <Route path="/shipper/current-order" component={CurrentOrder} />
                <Route path="/shipper/transaction" component={ShipperTransaction} />
                <Route path="/shipper/info" component={ShipperInfo} />
                <Route path="/shipper/password" component={ChangePasswordShipper} />
                {/* <Route path="/manage/info" component={PersonalInfo} />
                <Route path="/manage/dashboard" component={DashboardPage} />
                <Route path="/manage/transaction" component={UserTransaction} />
                <Route path="/manage/user" component={UserManage} />
                <Route path="/manage/password" component={ChangePassword} />
                <Route exact path="/manage/store" component={StoreManage} />
                <Route exact path="/manage/store/add" component={AddStore} />
                <Route exact path="/manage/store/edit/:id" component={EditStore} /> */}
                {/* <Route path="/user/password" component={UserPassword} />
                <Route path="/user/favourite" component={UserFavourite} />
                <Route path="/user/transaction" component={UserTransaction} />
                <Route path="/user/delivery-address" component={UserDeliveryAddress} /> */}
            </Switch>
        </div>
    </div>);
}