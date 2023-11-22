import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { useState } from 'react';
// import { login } from '../services/auth';
import { useEffect } from 'react';
// import { redirect } from 'react-router-dom';

// export interface LoginInputType {
//   value: {

//   }
// }

export default function Search() {
  // const [input, setInput] = useState({ username: '', password: '' });
  // const [isLogin, setIsLogin] = useState(false);
  const handleSubmitInput = (e: React.KeyboardEvent<object>) => {
    console.log(88);
    
    const target = e.target as HTMLInputElement;
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      console.log(123,target.value);

      // setInput(target.value);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // setIsLogin(true);
    }
  }, []);

  // useEffect(() => {
  //   if (isLogin) {
  //     redirect('/app');
  //   }
  // }, [isLogin]);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onKeyDown={(e) => handleSubmitInput(e)}
      />
    </Box>
  );
}
