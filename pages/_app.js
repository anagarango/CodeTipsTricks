import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from '@nextui-org/react';
import { SSRProvider } from '@react-aria/ssr';

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <NextUIProvider>
      <SSRProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SSRProvider>
    </NextUIProvider>
  )
}
