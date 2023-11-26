import Head from 'next/head';

export default function Header({ pageTitle }) {
  return (
    <Head>
      { pageTitle !== 'landing' && (
        <title>Craftlytics &bull; { pageTitle }</title>
      ) || (
        <title>Craftlytics</title>
      )}
    </Head>
  );
}
