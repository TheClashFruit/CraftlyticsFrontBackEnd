'use client';

import {
  Button,
  Callout,
  Card,
  Text,
  TextInput,
  Title,
} from '@tremor/react';

import {
  InboxIcon,
  KeyIcon,
  UserIcon,
  AtSymbolIcon,
  ExclamationIcon
} from '@heroicons/react/outline';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

import { useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import {isEmailValid, isUsernameValid} from '@/lib/validationTools';

export default function Register() {
  const router = useRouter();

  const [ isLoading, setIsLoading ]   = useState(false);

  const [ fullNameError, setFullNameError ] = useState('');
  const [ usernameError, setUsernameError ] = useState('');
  const [ emailError, setEmailError ]       = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const [ serverError, setServerError ] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const { fullname, username, email, password } = event.currentTarget;

    const errors = {
      fullname: hasErrors({ fullname }),
      username: hasErrors({ username }),
      email:    hasErrors({ email }),
      password: hasErrors({ password })
    };

    if(
      errors.fullname ||
      errors.username ||
      errors.email ||
      errors.password
    )
      return;

    setIsLoading(true);

    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: fullname.value,
        username: username.value,
        email:    email.value,
        password: password.value
      })
    });

    const data = await response.json();

    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 30);

    if(data.error === 0) {
      setCookie('token', data.token, { maxAge: 60 * 60 * 24 * 30 });

      await router.push('/');
    } else {
      switch (data.code) {
        case 'ERR_EMAIL_USED':
          setEmailError('This email is already in use.');

          break;
        case 'ERR_USERNAME_USED':
          setUsernameError('This username is already in use.');

          break;
        default:
          setServerError(JSON.stringify(data, null, 2));

          break;
      }
    }

    setIsLoading(false);
  };

  const hasErrors = (data) => {
    if(data.fullname)
      if(data.fullname.value.length < 1) {
        setFullNameError('Your name cannot be empty.');

        return true;
      } else {
        setFullNameError('');

        return false;
      }

    if(data.username)
      if(data.username.value === '') {
        setUsernameError('Your username cannot be empty.');

        return true;
      } else if(!isUsernameValid(data.username.value)) {
        setUsernameError('Your username can only contain english alphanumeric characters and underscores.');

        return true;
      } else if(data.username.value.length < 3) {
        setUsernameError('Your username is too short.');

        return true;
      } else if(data.username.value.length > 32) {
        setUsernameError('Your username is too long.');

        return true;
      } else {
        setUsernameError('');

        return false;
      }

    if(data.email)
      if(data.email.value.length < 1) {
        setEmailError('Your email cannot be empty.');

        return true;
      } else if(!isEmailValid(data.email.value)) {
        setEmailError('Your email is invalid.');

        return true;
      } else {
        setEmailError('');

        return false;
      }

    if(data.password)
      if(data.password.value.length < 1) {
        setPasswordError('Your password cannot be empty.');

        return true;
      } else if(data.password.value.length < 8) {
        setPasswordError('Your password must be at least 8 characters.');

        return true;
      } else {
        setPasswordError('');
        
        return false;
      }
  };

  return (
    <main className="h-[100svh] flex flex-col justify-center items-center">
      <Header pageTitle="Sign Up" />

      {serverError !== '' && (
        <Callout
          className="max-w-md w-full mb-12"
          color="rose"
          title="Error"
        >
          <pre>
            { serverError }
          </pre>
        </Callout>
      )}

      <Card className="max-w-md mb-12">
        <Image className="mb-5 mx-auto" width={64} height={64} src="/logo.svg" alt="Craftlytics Logo" />

        <Title className="text-center">Craftlytics</Title>
        <Text className="text-center">Create an account</Text>

        <form className="mt-6" onSubmit={onSubmit}>
          <TextInput onChange={(e) => hasErrors({ fullname: e.currentTarget })} error={fullNameError !== ''} errorMessage={fullNameError} icon={UserIcon}     type="text"     name="fullname" placeholder="Full Name" />
          <TextInput onChange={(e) => hasErrors({ username: e.currentTarget })} error={usernameError !== ''} errorMessage={usernameError} icon={AtSymbolIcon} type="text"     name="username" placeholder="Username" className="mt-3" />
          <TextInput onChange={(e) => hasErrors({ email: e.currentTarget })}    error={emailError !== ''}    errorMessage={emailError}    icon={InboxIcon}    type="text"     name="email"    placeholder="E-Mail"   className="mt-3" />
          <TextInput onChange={(e) => hasErrors({ password: e.currentTarget })} error={passwordError !== ''} errorMessage={passwordError} icon={KeyIcon}      type="password" name="password" placeholder="Password" className="mt-3" />

          <Button className="w-full mt-3 mb-5" loading={isLoading}>Sign Up</Button>
          <Text className="text-center"><Link href="/auth/login"><Button variant="light">I already have an account.</Button></Link></Text>
        </form>
      </Card>

      <Text>Copyright &copy; { new Date().getFullYear() } TheClashFruit</Text>
    </main>
  );
}
