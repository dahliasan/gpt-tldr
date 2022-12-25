// Function to convert character count to token count for GPT models
export function charCountToTokenCount(charCount) {
  // The average token length for GPT models is around 5.5 characters
  return Math.ceil(charCount / 5.5)
}

export function wordCount(str) {
  // Split the string into an array of words using the split function
  var words = str.split(' ')

  // Return the length of the array (which will be the number of words in the string)
  return words.length
}
