import Head from "next/head"
import Script from "next/script"
import PageHeader from "../components/common/PageHeader"

export default function Blog() {
  return (
    <div className="w-full">
      <Head>
        <title>Blog | Octagon Precision Mold</title>
        <meta
          name="description"
          content="Read the latest Octagon Precision Mold blog posts and manufacturing insights."
          key="description"
        />
      </Head>
      <PageHeader title="Blog" />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div id="soro-blog"></div>
      </div>
      <Script
        src="https://app.trysoro.com/api/embed/5cd62c4f-27ae-4d15-9a88-dff8eba80ec9"
        strategy="afterInteractive"
      />
    </div>
  )
}
