import './styles.css'
import { Nunito, Varela_Round } from '@next/font/google'

const nunito = Nunito({ subsets: ['latin'] })
const varelaRound = Varela_Round({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
})

function App({ Component, pageProps }) {
  return (
    <>
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
