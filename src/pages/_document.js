import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            <title>Octagon Precision Mold</title>
            <link rel="icon" type="image/png" sizes="16x16" href="../../octagon-favicon.png" />
        </Head>
        <body>
            <Main />
            <NextScript />
            <Analytics />
            <SpeedInsights />
        </body>
        </Html>
    )
}