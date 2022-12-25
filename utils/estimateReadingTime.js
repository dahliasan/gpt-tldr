export function estimatedReadingTime(text) {
  // Set the average reading speed to 200 words per minute
  const readingSpeed = 200

  // Split the text into an array of words
  const words = text.split(' ')

  // Calculate the estimated reading time
  const readingTime = words.length / readingSpeed

  // Return the reading time in minutes
  return Math.ceil(readingTime)
}
