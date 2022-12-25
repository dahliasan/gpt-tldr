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
  let placeholderInput = `This is a chart of the price of a Bitmain S19 or other comparable mining machine with under 38 Joules (J) / Terahash (TH) efficiency. As we can see, the collateral value of an S19 has plummeted alongside the price of Bitcoin. Imagine you lent USD against these rigs. The miners you lent to tried to sell Bitcoin to provide more fiat to service your loan, but in the end couldn’t do so because marginal profitability declined. The miners then defaulted on their loans and handed over their machines — which are worth almost 80% less now than when the loan was undertaken — as repayment. We can guess that the most feverish point of loan origination was near the top of the market. Muppet lenders always buy the top and sell the bottom … every single fucking time!\nNow that CELs have collections of mining rigs that they can’t easily sell and can’t operate, they can try to sell them and recover some funds – but it’s going to be single digit cents on the dollar, given that new machines are trading 80% off from a year ago. They can’t operate a mining farm because they lack a data centre with cheap electricity. And that’s why the hashrate just disappears – because of an inability to turn the machines back on.\nGoing forward, if we believe that most – if not all – mining loans have been extinguished, and there is no new capital to be lent to miners, then we can expect miners to sell most – if not all – of the block reward they receive.
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
        <title>read4me</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Gimme the tldr version</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Paste text here and generate a concise and clear summary. Good for
              long-ass articles.
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <div className="prompt-box-container">
            <textarea
              placeholder={placeholderInput}
              className="prompt-box"
              value={userInput}
              onChange={onUserChangedText}
            />
          </div>

          <div className="prompt-buttons">
            <p className="reading-time">
              {userInput &&
                `estimated reading time is ${estimatedReadingTime(
                  userInput
                )} mins`}
            </p>
            <a
              className={
                isGenerating ? 'generate-button loading' : 'generate-button'
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Ask 🙏</p>
                )}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>🌈 Here's your answer 🌈 </h3>
                </div>
              </div>
              <div className="output-content">
                <MarkdownRenderer markdown={apiOutput} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
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
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
