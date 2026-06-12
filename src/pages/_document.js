import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-5LLZ85B1H4"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5LLZ85B1H4');
`,
                    }}
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <link rel="icon" href="/octagon-favicon.webp" type="image/webp" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
