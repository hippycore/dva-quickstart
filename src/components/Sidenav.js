import React from "react";
import PropTypes from "prop-types";
import {connect} from 'dva';
import {NavLink} from 'react-router-dom';
import { Menu, Icon } from "antd";


export const Sidenav = ({menu}) => {
  return (
    <Menu theme="dark" mode="inline"  selectedKeys={[menu.key]} defaultSelectedKeys={['main']}>
      <Menu.Item key="main">
        <NavLink activeClassName="active" to="/"><Icon type="home" /><span>Index</span></NavLink>
      </Menu.Item>
      <Menu.Item key="products" >
        <NavLink activeClassName="active" to="/products"><Icon type="video-camera" /><span>Products list</span></NavLink>
      </Menu.Item>
      <Menu.Item key="form">
        <NavLink activeClassName="active" to="/form"><Icon type="user" /><span>Form</span></NavLink>
      </Menu.Item>
    </Menu>
  );
};

Sidenav.propTypes = {
  menu: PropTypes.object.isRequired,
};

export default connect(({menu}) => ({menu}))(Sidenav);
