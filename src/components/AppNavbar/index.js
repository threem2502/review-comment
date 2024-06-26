import React, { PureComponent } from "react";
import './index.scss';
import Dropdown from "antd/es/dropdown/dropdown";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

class AppNavbar extends PureComponent {
    state = {
        activeItem: null,
    };

    handleClick = (key) => {
        this.setState({ activeItem: key });
    };

    render() {
        const { activeItem } = this.state;

        const navProductDropdown = [
            {
                key: '1',
                label: (
                    <a className="navbar-dropdown-item">product1</a>
                )
            },
            {
                key: '2',
                label: (
                    <a className="navbar-dropdown-item">product2</a>
                )
            },
            {
                key: '3',
                label: (
                    <a className="navbar-dropdown-item">product3</a>
                )
            },
            {
                key: '4',
                label: (
                    <a className="navbar-dropdown-item">product4</a>
                )
            }
        ];

        const menu = (
            <Menu className="dropdown-menu" items={navProductDropdown} />
        );

        return (
            <div className="navbar-containers">
                <div className={`navbar-item ${activeItem === '1' ? 'active' : ''}`} onClick={() => this.handleClick('1')}>
                    <Dropdown overlay={menu} placement="bottom">
                        <NavLink to="/product" className="navbar-content">Sản phẩm</NavLink>
                    </Dropdown>
                </div>
                <div className={`navbar-item ${activeItem === '2' ? 'active' : ''}`} onClick={() => this.handleClick('2')}>
                    <NavLink to="/review-ai" className="navbar-content">Đánh giá (AI)</NavLink>
                </div>
                <div className={`navbar-item ${activeItem === '3' ? 'active' : ''}`} onClick={() => this.handleClick('3')}>
                    <NavLink to="/guide" className="navbar-content">Hướng dẫn</NavLink>
                </div>
                <div className={`navbar-item ${activeItem === '4' ? 'active' : ''}`} onClick={() => this.handleClick('4')}>
                    <NavLink to="/about-us" className="navbar-content">Về chúng tôi</NavLink>
                </div>
            </div>
        );
    }
}

export default AppNavbar;
