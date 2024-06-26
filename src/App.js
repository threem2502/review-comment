import React from 'react';
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
} from 'react-router-dom';
import ProductView from './components/ProductView';

function App() {
  return (
    <Router>
      <AppHeader/>
      <AppNavbar/>
      <Routes>
        <Route exact path='/' element={<ProductView />} />
        <Route path="/review-ai" element={<ReviewAIView />} />
        <Route path="/about-us" element={<AboutUsView />} />
      </Routes>
      <AppFooter />
    </Router>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
