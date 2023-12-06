import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setLogin } from '../ultis/redux/features/counters/authSlice';
import { getUserInfo } from '../services/auth';
import Header from '../components/Header';

export interface UserInfo {
  id: number | undefined;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
}

export interface Authorization extends UserInfo {
  isLogin: boolean;
}

const initialAuthState: Authorization = {
  id: undefined,
  name: '',
  username: '',
  email: '',
  isLogin: false,
};

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [authorization, setAuthorization] = useState({ ...initialAuthState });
  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userInfo: UserInfo = await getUserInfo();
        if (userInfo) {
          const { id, email, name, username } = userInfo;
          setAuthorization({ isLogin: true, ...userInfo });
          dispatch(
            setLogin({
              id,
              email,
              name,
              username,
              isLogined: true,
              token,
            })
          );
        }
      } else {
        setAuthorization({
          ...initialAuthState,
        });
      }
    };
    checkLogin();
  }, [dispatch, authState.isLogined]);
  useEffect(() => {
    if (authorization.isLogin) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  }, [authorization.isLogin, navigate]);
  return (
    <>
      <Header authorization={authorization}></Header>
      <Outlet context={{ authorization }} />
    </>
  );
};

export default ProtectedRoutes;
