import { Html, Head, Main, NextScript } from 'next/document'

import Image from 'next/image'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="tldr; 1 min summary generator"
          key="title"
        />
        <meta
          property="og:description"
          content="build with buildspace"
          key="description"
        />
        <meta property="og:image" content="https://iili.io/HI8zG7s.png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
