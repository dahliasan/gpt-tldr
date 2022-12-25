import React from 'react'
// import { CopyToClipboardWrapper } from 'react-clipboard-button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from './copyToClipboard'

// const CodeBlock = {
//   code({ node, inline, className, children, ...props }) {
//     const match = /language-(\w+)/.exec(className || '')
//     return !inline && match ? (
//       <SyntaxHighlighter
//         style={dracula}
//         language={match[1]}
//         PreTag="div"
//         {...props}
//       >
//         {String(children).replace(/\n$/, '')}
//       </SyntaxHighlighter>
//     ) : (
//       <code className={className} {...props}>
//         {children}
//       </code>
//     )
//   },
// }

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <div className="code-container">
        <CopyToClipboard inputString={children} />
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export default CodeBlock
