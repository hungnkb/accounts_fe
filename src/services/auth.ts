import instance from '../ultis/axios';

export class AuthService {
  login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return await instance.post('/auth/login', { username, password });
  };

  register = async ({
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
}
