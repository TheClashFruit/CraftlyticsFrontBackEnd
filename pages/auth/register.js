'use client';

import {
  Button,
  Card,
  Text,
  TextInput,
  Title,
} from '@tremor/react';

import {
  InboxIcon,
  KeyIcon,
  UserIcon,
  AtSymbolIcon
} from '@heroicons/react/outline';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

import { useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import {isEmailValid} from '@/lib/validationTools';

export default function Register() {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();

  const [ hasErrored, setHasErrored ] = useState(false);

  const [ isFullNameError, setIsFullNameError ] = useState(false);
  const [ isUsernameError, setIsUsernameError ] = useState(false);
  const [ isEmailError, setIsEmailError ]       = useState(false);
  const [ isPasswordError, setIsPasswordError ] = useState(false);

  const [ fullNameError, setFullNameError ] = useState('');
  const [ usernameError, setUsernameError ] = useState('');
  const [ emailError, setEmailError ]       = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { fullname, username, email, password } = event.currentTarget;

    checkForErrors({ fullname, username, email, password });

    if(hasErrored)
      return;

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

      router.push('/');
    }

    setIsLoading(false);
  };

  const checkForErrors = (data) => {
    setIsLoading(false);

    if(data.fullname)
      if(data.fullname.value.length < 1) {
        setIsFullNameError(true);
        setFullNameError('Your name cannot be empty.');

        setHasErrored(true);
      } else {
        setIsFullNameError(false);
        setFullNameError('');

        setHasErrored(false);
      }

    if(data.username)
      if(data.username.value === '') {
        setIsUsernameError(true);
        setUsernameError('Your username cannot be empty.');

        setHasErrored(true);
      } else if(data.username.value.length < 3) {
        setIsUsernameError(true);
        setUsernameError('Your username is too short.');

        setIsLoading(false);
        setHasErrored(true);
      } else if(data.username.value.length > 32) {
        setIsUsernameError(true);
        setUsernameError('Your username is too long.');

        setIsLoading(false);
        setHasErrored(true);
      } else {
        setIsUsernameError(false);
        setUsernameError('');

        setHasErrored(false);
      }

    if(data.email)
      if(data.email.value.length < 1) {
        setIsEmailError(true);
        setEmailError('Your email cannot be empty.');

        setHasErrored(true);
      } else if(!isEmailValid(data.email.value)) {
        setIsEmailError(true);
        setEmailError('Your email is invalid.');

        setHasErrored(true);
      } else {
        setIsEmailError(false);
        setEmailError('');

        setHasErrored(false);
      }

    if(data.password)
      if(data.password.value.length < 1) {
        setIsPasswordError(true);
        setPasswordError('Your password cannot be empty.');

        setHasErrored(true);
      } else if(data.password.value.length < 8) {
        setIsPasswordError(true);
        setPasswordError('Your password must be at least 8 characters.');

        setHasErrored(true);
      } else {
        setIsPasswordError(false);
        setPasswordError('');

        setHasErrored(false);
      }
  };

  return (
    <main className="h-[100svh] flex flex-col justify-center items-center">
      <Header pageTitle="Sign Up" />

      <Card className="max-w-md mb-12">
        <Image className="mb-5 mx-auto" width={64} height={64} src="/logo.svg" alt="Craftlytics Logo" />

        <Title className="text-center">Craftlytics</Title>
        <Text className="text-center">Create an account</Text>

        <form className="mt-6" onSubmit={onSubmit}>
          <TextInput onChange={(e) => checkForErrors({ fullname: e.currentTarget })} error={isFullNameError} errorMessage={fullNameError} icon={UserIcon}     type="text"     name="fullname" placeholder="Full Name" />
          <TextInput onChange={(e) => checkForErrors({ username: e.currentTarget })} error={isUsernameError} errorMessage={usernameError} icon={AtSymbolIcon} type="text"     name="username" placeholder="Username" className="mt-3" />
          <TextInput onChange={(e) => checkForErrors({ email: e.currentTarget })}    error={isEmailError}    errorMessage={emailError}    icon={InboxIcon}    type="text"     name="email"    placeholder="E-Mail"   className="mt-3" />
          <TextInput onChange={(e) => checkForErrors({ password: e.currentTarget })} error={isPasswordError} errorMessage={passwordError} icon={KeyIcon}      type="password" name="password" placeholder="Password" className="mt-3" />

          <Button className="w-full mt-3 mb-5" loading={isLoading}>Sign Up</Button>
          <Text className="text-center"><Link href="/auth/login"><Button variant="light">I already have an account.</Button></Link></Text>
        </form>
      </Card>

      <Text>Copyright &copy; 2023 TheClashFruit</Text>
    </main>
  );
}
