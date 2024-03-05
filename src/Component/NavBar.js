import {Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React from "react";
import {Header} from "antd/es/layout/layout";
import {useNavigate} from "react-router";

const NavBar = () => {

    const navigate = useNavigate();
    const handleMenuClick = (item) => {
        if (item.key === 'register-student') {
            navigate('/register_student');
        } else if (item.key === 'home') {
            navigate('/');
        }
    };

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
                onClick={handleMenuClick}
            >
                <MenuItem
                    key="home"
                >
                    Home
                </MenuItem>
                <MenuItem
                    key="register-student"
                >
                    Register Student
                </MenuItem>
                <MenuItem
                    key="nav3"
                >
                    Nav3
                </MenuItem>
            </Menu>
        </Header>
    )
}

export default NavBar;