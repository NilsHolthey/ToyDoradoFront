import GlobalStyles from '@/styles/GlobalStyles';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <GlobalStyles />
      <Component {...pageProps} />
    </main>
  );
}
