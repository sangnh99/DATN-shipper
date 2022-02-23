import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    ChakraProvider
} from '@chakra-ui/react';
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
} from 'react-icons/fi';

import { IoLockClosedOutline, IoHeartOutline,
     IoLocationOutline, IoGridOutline, IoStorefrontOutline,
      IoDocumentTextOutline, IoSettingsOutline, IoCartOutline, IoCheckmarkDone, IoLockOpenOutline } from 'react-icons/io5';
import NavItem from './NavItem';

import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large");
    const [activeRow, setActiveRow] = useState(0);
    return (
        <Flex
            pos="sticky"
            left="0"
            h="88vh"
            marginTop="0vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "230px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <Link to={"/shipper/take-order"}  style={{width : 210}} onClick={() => {setActiveRow(1)}}>{ activeRow == 1 ? <NavItem navSize={navSize} icon={IoDocumentTextOutline} title="Nhận đơn hàng" active/> : <NavItem navSize={navSize} icon={IoDocumentTextOutline} title="Nhận đơn hàng" />}</Link>
                <Link to={"/shipper/current-order"}  style={{width : 210}} onClick={() => {setActiveRow(2)}}>{ activeRow == 2 ? <NavItem navSize={navSize} icon={IoCartOutline} title="Đơn hàng đang giao" active/> : <NavItem navSize={navSize} icon={IoCartOutline} title="Đơn hàng đang giao" />}</Link>
                <Link to={"/shipper/transaction"}  style={{width : 210}} onClick={() => {setActiveRow(3)}}>{ activeRow == 3 ? <NavItem navSize={navSize} icon={IoCheckmarkDone} title="Đơn hàng đã giao" active/> : <NavItem navSize={navSize} icon={IoCheckmarkDone} title="Đơn hàng đã giao" />}</Link>
                <Link to={"/shipper/info"}  style={{width : 210}} onClick={() => {setActiveRow(4)}}>{activeRow == 4 ? <NavItem navSize={navSize} icon={FiUser} title="Thông tin cá nhân" active /> : <NavItem navSize={navSize} icon={FiUser} title="Thông tin cá nhân"/>}</Link>
                <Link to={"/shipper/password"}  style={{width : 210}} onClick={() => {setActiveRow(5)}}>{activeRow == 5 ? <NavItem navSize={navSize} icon={IoLockOpenOutline} title="Đổi mật khẩu" active /> : <NavItem navSize={navSize} icon={IoLockOpenOutline} title="Đổi mật khẩu"/>}</Link>
                {/* <Link to={"/manage/transaction"}  style={{width : 200}} onClick={() => {setActiveRow(6)}}>{activeRow == 6 ? <NavItem navSize={navSize} icon={IoDocumentTextOutline} title="Giao dịch" active /> :  <NavItem navSize={navSize} icon={IoDocumentTextOutline} title="Giao dịch"/>}</Link>
                <Link to={"/manage/setting"}  style={{width : 200}} onClick={() => {setActiveRow(7)}}>{activeRow == 7 ? <NavItem navSize={navSize} icon={IoSettingsOutline} title="Cài đặt" active /> : <NavItem navSize={navSize} icon={IoSettingsOutline} title="Cài đặt"/>}</Link> */}
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src={"https://cdn.ntlogistics.vn/images/NTX/new_images/danh-gia-shipper-giao-hang-nhanh-qua-viec-dam-bao-an-toan-hang-hoa.jpg"} />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Shipper page</Heading>
                        <Text color="gray">Shipper</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}