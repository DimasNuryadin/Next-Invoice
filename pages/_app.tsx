import '../styles/utilities.css'
import '../styles/login.css'
import '../styles/invoice.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
