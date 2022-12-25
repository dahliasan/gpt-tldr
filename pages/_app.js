import './styles.css'
import { Nunito, Varela_Round } from '@next/font/google'
import Script from 'next/script'

const nunito = Nunito({ subsets: ['latin'] })
const varelaRound = Varela_Round({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
})

const GTM_ID = 'GTM-52Q8NF2'

function App({ Component, pageProps }) {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
      </Script>
      <style jsx global>{`
        :root {
          --body-font: ${nunito.style.fontFamily};
          --heading-font: ${varelaRound.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
export default App
