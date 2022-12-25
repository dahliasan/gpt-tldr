import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './codeblock'

const MarkdownRenderer = ({ markdown }) => {
  return <ReactMarkdown children={markdown} components={CodeBlock} />
}

export default MarkdownRenderer
