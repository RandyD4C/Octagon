// src/pages/_app.js
import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/common/Layout'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <>
      <Head>
        <meta name="description" content="Octagon Precision Mold - High-Precision Manufacturing Solutions" key="description" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
