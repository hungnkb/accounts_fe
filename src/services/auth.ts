import { UserInfo } from '../App';
import instance from '../ultis/axios';

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<{ accessToken: string }> => {
  return await instance.post('/auth/login', {
    username,
    password,
  });
};

export const register = async ({
  username,
  password,
  name,
  email,
}: {
  username: string;
  password: string;
  name: string;
  email: string;
}) => {
  return await instance.post('/auth/register', {
    username,
    password,
    name,
    email,
  });
};

export const getUserInfo = async (): Promise<UserInfo> => {
  return await instance.get('/accounts/me');
};
