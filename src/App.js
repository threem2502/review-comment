import './App.css';
import AppHeader from './components/AppHeader';
import AppNavbar from './components/AppNavbar';
import ReviewAIView from './components/ReviewAIView';
import AboutUsView from './components/AboutUsView';
import AppFooter from './components/AppFooter';
import { 
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import ProductView from './components/ProductView';

function App() {
  return (
    <HashRouter>
      <AppHeader/>
      <AppNavbar/>
      <Routes>
        <Route path='/' element={<ProductView />}></Route>
        <Route path="/review-ai" element={<ReviewAIView />} />
        <Route path="/about-us" element={<AboutUsView />} />
      </Routes>
      <AppFooter />
    </HashRouter>
  );
}

export default App;
