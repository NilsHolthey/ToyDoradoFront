import GlobalStyles from '@/styles/GlobalStyles';

import { Roboto, Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <GlobalStyles />
      <Component {...pageProps} />
    </main>
  );
}
