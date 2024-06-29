import React from 'react';
import { PureComponent } from "react";
import { withRouter } from 'react-router-dom';
import SearchBar from "../Searchbar";
import { Button } from "antd";
import './index.scss'

class AppHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleLogin() {
    const { setAccountFormType } = this.props
    setAccountFormType('login')
    this.props.navigate('/login'); 
  }

  handleRegister() {
    const { setAccountFormType } = this.props
    setAccountFormType('register')
    this.props.navigate('/login'); 
  }

  goHome() {
    window.location.replace('/review-comment/')
  }

  renderAccountButton() {
    return (
      <div className="user-button">
        <Button 
          onClick={this.handleLogin.bind(this)}
          size="large"
          style={{width: 120, color: '#4007E4', background:'#F2FAF8', fontWeight: 700}}
        >Đăng nhập</Button>
          
        <Button 
          onClick={this.handleRegister.bind(this)}
          type="primary"
          size="large"
          style={{width: 120, color: 'white', background:'#FF7B00', fontWeight: 700}}
        >Đăng kí</Button>
      </div>
    )
  }
  handleLogout() {
    localStorage.removeItem('currentUser')
    this.props.navigate('/')
  }

  renderAccountInfo() {
    return (
      <div className='user-button'>
        <span className='user-email'>{JSON.parse(localStorage.getItem('currentUser'))}</span>
        <Button
          onClick={this.handleLogout.bind(this)}
          type='primary'
          size="large"
          style={{width: 120, color: 'white', background:'#FF7B00', fontWeight: 700}}
        >ĐĂNG XUẤT</Button>
      </div>
    )
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return (
      <div id="header-containers">
        <div className="app-logo" onClick={this.goHome.bind(this)}>
          <img src="images/logo.png" alt="logo"/>
        </div>
        <SearchBar/>
        {currentUser ? this.renderAccountInfo() : this.renderAccountButton()}
      </div>
    )
  }
}

export default AppHeader;
