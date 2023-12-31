import { useEffect, useState } from 'react';
import { SignInForm } from '../components/SignInForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../services/auth';
import { setLogin } from '../ultis/redux/features/counters/authSlice';

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

export default function SignIn() {
  // const navigate = useNavigate();
  const [authorization, setAuthorization] = useState({ ...initialAuthState });
  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token');
      if (token && authState.isLogined) {
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
    }
  }, [authorization, navigate]);

  return <SignInForm />;
}
