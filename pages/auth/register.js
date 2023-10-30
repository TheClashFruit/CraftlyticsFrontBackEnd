'use client';

import {
  Button,
  Card, Divider, Flex,
  Text,
  TextInput,
  Title,
} from '@tremor/react';

import {
  InboxIcon, KeyIcon, UserIcon, AtSymbolIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  return (
    <main className="h-[100svh] flex flex-col justify-center items-center">
      <Card className="max-w-md mb-12">
        <Image className="mb-5 mx-auto" width={64} height={64} src="/logo.svg" alt="Craftlytics Logo" />

        <Title className="text-center">Craftlytics</Title>
        <Text className="text-center">Create an account</Text>

        <form className="mt-6">
          <TextInput className="mb-3" icon={UserIcon} type="text"     name="name"     placeholder="Full Name" />
          <TextInput className="mb-3" icon={AtSymbolIcon} type="text"     name="name"     placeholder="Username" />
          <TextInput className="mb-3" icon={InboxIcon} type="email"    name="email"    placeholder="E-Mail" />
          <TextInput className="mb-3" icon={KeyIcon}   type="password" name="password" placeholder="Password" />

          <Button className="w-full mb-5">Sign Up</Button>
          <Text className="text-center"><Link href="/auth/login"><Button variant="light">I already have an account.</Button></Link></Text>
        </form>
      </Card>

      <Text>Copyright &copy; 2023 TheClashFruit</Text>
    </main>
  );
}
