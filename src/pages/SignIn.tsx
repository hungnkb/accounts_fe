import { useEffect } from 'react';
import { SignInForm } from '../components/SignInForm';
import { useSelector } from 'react-redux';

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log(123, authState);
  }, [authState]);

  return <SignInForm />;
}
