import { useDispatch } from 'react-redux';
import { setLogin } from '../ultis/redux/features/counters/authSlice';
import { login } from '../services/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

function Copyright(props: { sx: { mt: number; mb: number } }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignInForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('username') && data.get('password')) {
      const username = data.get('username')!.toString();
      const password = data.get('password')!.toString();
      const res = await login({ username, password });
      const token = res.accessToken.split('Bearer ')[1];
      localStorage.setItem('token', token);
      dispatch(setLogin({ token, isLogined: true }));
      setIsLogin(true);
    }
  };
  useEffect(() => {
    const checkIsLogin = () => {
      if (isLogin) {
        console.log(222);
        return redirect('/app');
      }
    };
    checkIsLogin();
  }, [isLogin]);
  return (
    <Container component="main" maxWidth="xs">
      <Stack
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ mr: 2 }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
