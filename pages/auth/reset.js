'use client';

import {
  Button,
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

      <Text>Copyright &copy; 2023 TheClashFruit</Text>
    </main>
  );
}
