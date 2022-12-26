import { Configuration, OpenAIApi } from 'openai'
import { charCountToTokenCount, wordCount } from '../../utils/gptTokenizer'
import { cleanAndChunkText } from '../../utils/chunkText'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const MAX_TOKENS = 3000
const openai = new OpenAIApi(configuration)
const basePromptPrefix =
  'Summarise the following text in 250 words or less focusing on the most insightful and interesting information. Include specific details of entities and numbers where possible. Text: '

const finalPromptPrefix =
  'Give me a max 250 word summary of the following text focusing on the most insightful and interesting information. Include specific details of entities and numbers where possible.  Text: '
const generateAction = async (req, res) => {
  const { text } = req.body

  // Check if the original token count of the text is greater than 1000
  if (charCountToTokenCount(text.length) > 1000) {
    // Divide the text into chunks by paragraphs
    let chunks = cleanAndChunkText(text)

    // Initialize an empty list to store the summaries
    let summaries = []

    // Iterate over the chunks
    for (const chunk of chunks) {
      console.log('1st iteration...')
      console.log('chunk length', chunk.length)
      const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${chunk}\n`,
        temperature: 0.7,
        max_tokens: MAX_TOKENS,
      })

      // Extract the summary from the generated completions
      const summary = baseCompletion.data.choices.pop()

      // Add the summary to the list
      summaries.push(summary.text)
    }

    // Concatenate the summaries
    let combinedSummaries = summaries.join(' ')

    console.log(
      'combined summaries token count: ',
      charCountToTokenCount(combinedSummaries.length)
    )

    // If the combined summaries are too long, split and chunk again until the summary fits within the max token limit
    while (charCountToTokenCount(combinedSummaries.length) > 1000) {
      console.log('2nd loop...')
      let newChunks = cleanAndChunkText(combinedSummaries)
      let newSummaries = []
      for (const chunk of newChunks) {
        console.log('chunk length', chunk.length)
        const baseCompletion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `${basePromptPrefix}${chunk}\n`,
          temperature: 0.7,
          max_tokens: MAX_TOKENS,
        })

        // Extract the summary from the generated completions
        const summary = baseCompletion.data.choices.pop()

        // Add the summary to the list
        newSummaries.push(summary.text)
      }

      // Concatenate the new summaries
      combinedSummaries = newSummaries.join(' ')
    }

    console.log('final generation...')
    const finalCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${finalPromptPrefix}${combinedSummaries}\n`,
      temperature: 0.1,
      max_tokens: MAX_TOKENS,
    })
    const finalSummary = finalCompletion.data.choices.pop().text
    console.log(finalSummary)
    // Return the final summary
    res.status(200).json({ output: finalSummary })
  } else {
    // Generate a final summary directly from the text without chunking
    const finalCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${finalPromptPrefix}${text}\n`,
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
    })
    const finalSummary = finalCompletion.data.choices.pop().text
    console.log(finalSummary)

    // Return the final summary
    res.status(200).json({ output: finalSummary })
  }
}

export default generateAction
