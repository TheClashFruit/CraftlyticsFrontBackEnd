import Head from 'next/head';

export default function Header({ pageTitle }) {
  return (
    <Head>
      <title>Craftlytics &bull; { pageTitle }</title>
    </Head>
  );
}
