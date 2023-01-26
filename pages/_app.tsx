import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/utilities.css'
import '../styles/login.css'
import '../styles/invoice-step1.css'
import '../styles/invoice-step2.css'
import '../styles/invoice-pdf.css'
import '../styles/client.css'
import '../styles/loading.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
