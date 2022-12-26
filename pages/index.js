import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import MarkdownRenderer from '../components/markdownRenderer'
import buildspaceLogo from '../assets/buildspace-logo.png'
import aintNobodyGif from '../assets/aintnobody.gif'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { estimatedReadingTime } from '../utils/estimateReadingTime'

const Home = () => {
  let placeholderInput = `Last week I described how Sam Bankman-Fried was the right kind of white boy, and how he leaned into this persona to convince the Western financial establishment and the crypto industry alike to overlook his shortcomings and not ask too many questions. Here is how he describes what he did in his own words to Vox:

“Ya. Hehe. I had to be. It’s what reputations are made of, to some extent. I feel bad for those guys who get f—ed by it, by this dumb game we woke westerners play where we say all the right shibboleths and so everyone likes us.”

Of the fallout that we began to see this week from SBF’s apparently epic fraud, perhaps the most significant casualty is the likely insolvency and potential bankruptcy of crypto lender Genesis, which could be mega enough to also bring down its parent company, prominent venture capital firm Digital Currency Group (DCG). The Genesis/DCG melodrama – which also includes Genesis’s sister firm, digital asset fund Grayscale – is particularly impactful because it directly affects the largest Bitcoin investment product listed on any exchange, GBTC. The reason why GBTC is so important to us crypto traders is that it holds one of the largest stashes of Bitcoin. Should investors – willingly or not – be allowed to redeem GBTC shares for BTC or USD, it could spark the next brutal leg down in the fiat price of Bitcoin and other shitcoins.

Now that the peerless image of SBF has been shattered, investors have recovered their ability to do maths and read public statements. They have begun to ask questions of everyone, and afford no one the benefit of the doubt because of some aspect of social conditioning that allowed their rational brain to silence their gut instinct or lizard brain.

The entire point of these essays is to alter your thinking for the future. When the next person comes along who says the “right” things, wears the “right” clothes, went to the “right” schools, speaks / looks the “right” way, hangs out with the “right” people, and is promoted by the “right” media outlets, I hope that you disregard all of that and focus on the truth that is self-evident in the maths and public statements presented.

In this essay, I’ll be delving into the digital money management business and breaking down the Genesis/DCG/Grayscale soap opera … G G G G-Unit! And as the essay comes to a close, I’ll lay out a rubric for evaluating a potential means of profiting off of this carnage.

But first, similar to how I began part one of this series, let’s revisit Pax Americana and do a little bit more racial theorising. Barry Silbert, the man atop this shaky DCG / Genesis / GBTC  empire, is just a foil for a broader point I’m trying to make throughout this series on how stereotypes hinder investors’ ability to properly manage risk. All the information that is presented in this essay has been public for many years – but no one bothered to ask questions because Barry Silbert fit the mould as the type of guy that you trust in the Pax American business world (i.e., a confident white guy saying all the right things). To be clear, I’m not saying that his whiteness was in some way a driver of the actual events taking place with Genesis / DCG / Grayscale (GBTC). All I’m saying is that because he’s white, he appeared trustworthy, and as a result, investors followed him blindly without digging deeper into how all of the pieces of his empire fit together. This is not at all an indictment of being white – it’s an indictment of the system and its willingness to overlook someone’s shortcomings because they look a certain way and say the “right” stuff. I don’t know the man – we aren’t even acquaintances – and I have no financial exposure to his kingdom. With that, let’s jump in and start by looking at how this broken system works, and how some folks engender the trust of their peers without raising further questions.
`

  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true)

    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userInput || placeholderInput }),
    })

    const data = await response.json()
    const { output } = data
    console.log('OpenAI replied...', output)

    setApiOutput(`${output}`)
    setIsGenerating(false)
  }

  const onUserChangedText = (event) => {
    setUserInput(event.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>read4u</title>
      </Head>
      <div className="container">
        <div className="prompt-container">
          <div className="header">
            <div className="header-title">
              <h1>Gimme the tldr version</h1>
            </div>
            <div className="header-subtitle">
              <h2>Paste text here and generate a smart 1 min summary.</h2>
            </div>
          </div>

          <textarea
            placeholder={placeholderInput}
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />

          <div className="prompt-buttons">
            <p className="reading-time">
              {userInput &&
                `estimated reading time is ${estimatedReadingTime(userInput)} ${
                  estimatedReadingTime(userInput) > 1 ? 'mins' : 'min'
                }`}
            </p>
            <a
              className={
                isGenerating ? 'generate-button loading' : 'generate-button'
              }
              onClick={callGenerateEndpoint}
              id="generate-btn"
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Summarise 🙏</p>
                )}
              </div>
            </a>
          </div>
        </div>

        {apiOutput && (
          <div className="output-container">
            <h3 className="output-header">TLDR </h3>

            <div className="output-content">
              <MarkdownRenderer markdown={apiOutput} />
            </div>
          </div>
        )}
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
      <ToastContainer />
    </div>
  )
}

export default Home
