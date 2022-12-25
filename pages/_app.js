import './styles.css'
import { Nunito, Varela_Round } from '@next/font/google'
import Script from 'next/script'

const nunito = Nunito({ subsets: ['latin'] })
const varelaRound = Varela_Round({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
})

function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-HXP7C8JEC8"
      />
          
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HXP7C8JEC8', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
