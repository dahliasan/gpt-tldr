import React from 'react'
import { toast } from 'react-toastify'

const CopyToClipboard = ({ inputString }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputString)
    toast.success('Copied to clipboard!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <>
      <button className="copy-button" onClick={copyToClipboard}></button>
    </>
  )
}

export default CopyToClipboard
