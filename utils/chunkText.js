import { charCountToTokenCount } from './gptTokenizer'

export function cleanAndChunkText(text, maxToken = 550) {
  // First, clean the input text by removing excess whitespace and newlines
  text = text.trim().replace(/\s+/g, ' ')

  // Split the text into paragraphs
  let paragraphs = text.split('\n')

  // Initialize an array to hold the chunks of text
  let chunks = []

  // Iterate through each paragraph
  paragraphs.forEach(function (paragraph) {
    // Initialize a variable to store the current chunk of text
    let currentChunk = ''

    // Split the paragraph into words
    let words = paragraph.split(' ')

    // Iterate through each word
    words.forEach(function (word) {
      // If the current chunk is less than 2000 characters and adding the word to it will not exceed 2000 characters, add the word to the current chunk

      if (charCountToTokenCount(currentChunk.length + word.length) < maxToken) {
        currentChunk += word + ' '
      }
      // If adding the word to the current chunk will exceed 2000 characters, push the current chunk to the array and start a new chunk with the current word
      else {
        chunks.push(currentChunk.trim())
        currentChunk = word + ' '
      }
    })

    // Push the final chunk to the array
    chunks.push(currentChunk.trim())
  })

  return chunks
}
