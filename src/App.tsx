import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import { getUserInfo } from './services/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await getUserInfo();
      }
    };
    checkLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
        <Route path="/app" element={<Dashboard />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
