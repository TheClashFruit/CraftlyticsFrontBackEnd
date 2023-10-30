'use client';

import {
  Button, Callout,
  Card,
  Text,
  TextInput,
  Title,
} from '@tremor/react';

import {
  InboxIcon
} from '@heroicons/react/outline';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export default function Register() {
  return (
    <main className="h-[100svh] flex flex-col justify-center items-center">
      <Header pageTitle="Reset Password" />

      <Callout className="max-w-md w-full mb-12" color="rose" title="Attention">
        This feature is not yet implemented.
      </Callout>

      <Card className="max-w-md mb-12">
        <Image className="mb-5 mx-auto" width={64} height={64} src="/logo.svg" alt="Craftlytics Logo" />

        <Title className="text-center">Craftlytics</Title>
        <Text className="text-center">Reset your password</Text>

        <form className="mt-6">
          <TextInput className="mb-3" icon={InboxIcon} type="email" name="email" placeholder="E-Mail" />

          <Button className="w-full mb-5">Send Code</Button>
          <Text className="text-center"><Link href="/auth/login"><Button variant="light">Nevermind, I remembered my password.</Button></Link></Text>
        </form>
      </Card>

      <Text>Copyright &copy; { new Date().getFullYear() } TheClashFruit</Text>
    </main>
  );
}
