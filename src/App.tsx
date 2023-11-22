import { useEffect, useState } from 'react';
import './App.css';
import { getUserInfo } from './services/auth';
import { useNavigate } from 'react-router-dom';

export interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userInfo: UserInfo = await getUserInfo();
        if (userInfo) {
          localStorage.setItem('id', userInfo.id.toString());
          localStorage.setItem('email', userInfo.email);
          localStorage.setItem('name', userInfo.name);
          localStorage.setItem('username', userInfo.username);
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/app');
    }
  }, [isLogin]);
  return <></>;
}
export default App;
