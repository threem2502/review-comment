import { Component } from "react";
import './index.scss';
import { Input, Button, Checkbox, message } from 'antd';
import { GoogleLogo } from "@phosphor-icons/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { json } from "react-router-dom";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.accountFormType !== prevProps.accountFormType) {
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  handleAuth = () => {
    const { accountFormType, auth, navigate } = this.props;
    const { email, password, confirmPassword } = this.state;

    if (accountFormType === 'login') {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Successfully signed in
          message.success('Đăng nhập thành công!');
          localStorage.setItem('currentUser', JSON.stringify(email))
          navigate('/')
        })
        .catch(error => {
          // Error signing in
          this.setState({ email: '', password: '', confirmPassword: '' });
          message.error('Đăng nhập thất bại!');
        });
    } else {
      if (password.trim().length < 8) {
        message.error('Mật khẩu phải lớn hơn 8 kí tự');
        this.setState({ email: '', password: '', confirmPassword: '' });
        return;
      }
      if (password !== confirmPassword) {
        message.error('Mật khẩu không khớp!');
        this.setState({ email: '', password: '', confirmPassword: '' });
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Successfully registered
          message.success('Đăng ký thành công!');
          localStorage.setItem('currentUser', JSON.stringify(email))
          navigate('/')
        })
        .catch(error => {
          // Error registering
          this.setState({ email: '', password: '', confirmPassword: '' });
          message.error('Đăng ký thất bại');
        });
    }
  };

  handleGoogleSignIn = () => {
    const { auth, navigate } = this.props;
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        // Successfully signed in with Google
        const user = result.user;
        const email = user.email;
        message.success('Đăng nhập với Google thành công!');
        localStorage.setItem('currentUser', JSON.stringify(email));
        navigate('/');
      })
      .catch(error => {
        // Error signing in with Google
        message.error('Đăng nhập với Google thất bại!');
      });
  };

  render() {
    const { accountFormType, setAccountFormType } = this.props;
    const { email, password, confirmPassword } = this.state;
    const title24 = accountFormType === 'login' ? "ĐĂNG NHẬP VÀO TÀI KHOẢN CỦA BẠN" : "ĐĂNG KÝ TÀI KHOẢN MỚI";
    const title14 = accountFormType === 'login' ? "CHƯA LÀ THÀNH VIÊN" : "ĐÃ CÓ TÀI KHOẢN";
    const textBtn = accountFormType === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ';
    const textLink = accountFormType === 'register' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ';

    return (
      <div className="account-wrapper">
        <img src="images/image-login.jpeg" alt="Login" />
        <div className="account-form">
          <p className="form-title title-size24">{title24}</p>
          <p className="form-title title-size14">
            {title14} <a onClick={() => setAccountFormType(textLink === 'ĐĂNG NHẬP' ? 'login' : 'register')}>{textLink}</a>
          </p>
          <Input required className="input-account" placeholder="Tên đăng nhập" name="email" value={email} onChange={this.handleInputChange} />
          <Input required className="input-account" placeholder="Mật khẩu" type="password" name="password" value={password} onChange={this.handleInputChange} />
          {accountFormType === 'register' && (
            <Input required className="input-account" placeholder="Nhập lại mật khẩu" type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleInputChange} />
          )}
          {accountFormType === 'login' && (
            <>
              <Checkbox className="check-box"> Nhớ mật khẩu</Checkbox>
              <a className="link-forget" href="#">Quên mật khẩu</a>
            </>
          )}
          <Button className="btn-login" onClick={this.handleAuth}>{textBtn}</Button>
          <h3>--hoặc--</h3>
          <Button className="btn-login btn-google" onClick={this.handleGoogleSignIn}>
            Đăng nhập với Google <GoogleLogo className="logo-google" size={32} weight="fill" />
          </Button>
        </div>
      </div>
    );
  }
}

export default AccountForm;
