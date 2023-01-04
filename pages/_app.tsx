import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/utilities.css'
import '../styles/login.css'
import '../styles/invoice.css'
import '../styles/invoice2.css'
import '../styles/client.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
