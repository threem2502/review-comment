import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import AppHeader from './components/AppHeader';
import AppNavbar from './components/AppNavbar';
import ReviewAIView from './components/ReviewAIView';
import AboutUsView from './components/AboutUsView';
import AppFooter from './components/AppFooter';
import { 
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import ProductView from './components/ProductView';
import AccountForm from './components/AccountForm';
import { auth } from './firebase';
function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname == '/login';
  const navigate = useNavigate();
  const [accountFormType, setAccountFormType] = useState('')
  return (
    <>
      {!isLoginPage && <AppHeader navigate={navigate} setAccountFormType={setAccountFormType} />}
      {!isLoginPage && <AppNavbar />}
      <Routes>
        <Route exact path='/' element={<ProductView />} />
        <Route path="/review-ai" element={<ReviewAIView />} />
        <Route path="/about-us" element={<AboutUsView />} />
        <Route path="/login" element={<AccountForm 
          accountFormType={accountFormType} 
          setAccountFormType={setAccountFormType}
          auth={auth}
          navigate={navigate}
          />} /> {/* Add this route */}
      </Routes>
      {!isLoginPage && <AppFooter />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
