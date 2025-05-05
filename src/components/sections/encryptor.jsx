'use client'

import { useState } from 'react'
import { Loader2, CheckIcon } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { FaCode } from 'react-icons/fa'
import { FaTerminal } from 'react-icons/fa'

export default function Encryptor() {
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [slowMessage, setSlowMessage] = useState(false)
let slowTimeoutId
const [encryptSuccess, setEncryptSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/javascript' && !file.name.endsWith('.js')) {
      setErrorMessage('Error: File anda terdeteksi bukan JavaScript (.js) file.')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage('')
        setMessageType('')
      }, 5000)
      return
    }

    setErrorMessage('')
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      setInputCode(content)
    }
    reader.readAsText(file)
  }

  const handleEncrypt = async () => {
  if (!inputCode.trim()) {
    setErrorMessage('Code kosong. Silahkan upload atau tempelkan kode terlebih dahulu!')
    setMessageType('error')
    setTimeout(() => {
      setErrorMessage('')
      setMessageType('')
    }, 5000)
    return
  }

  setOutputCode('')
  setIsLoading(true)
  setSlowMessage(false)

  const slowTimeoutId = setTimeout(() => {
    setSlowMessage(true)
  }, 30000) // 30 detik

  try {
    const response = await fetch('https://enc-api-eight.vercel.app/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inputCode }),
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    if (data.obfuscatedCode) {
      setOutputCode(data.obfuscatedCode)
      setEncryptSuccess(true)
      setMessageType('success')
      setErrorMessage('Encrypt sukses!')
      setTimeout(() => {
        setErrorMessage('')
        setMessageType('')
      }, 5000)
    } else {
      setErrorMessage(data.error || 'Unknown error')
      setMessageType('error')
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    setErrorMessage(`Terjadi kesalahan: ${error.message}. Coba lagi.`)
    setMessageType('error')
  } finally {
    clearTimeout(slowTimeoutId)
    setSlowMessage(false)
    setIsLoading(false)
  }
}

  const handleCopy = async () => {
    if (!outputCode.trim()) {
      setErrorMessage('Code kosong. Silahkan upload atau tempelkan kode terlebih dahulu!')
      return
    }

    try {
      await navigator.clipboard.writeText(outputCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setErrorMessage('')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleReset = () => {
  setInputCode('')
  setOutputCode('')
  setErrorMessage('Reset sukses')
  setMessageType('success')
  setCopied(false)
  setIsLoading(false)         
  setSlowMessage(false)
  setEncryptSuccess(false)        
  setTimeout(() => {
    setErrorMessage('')
    setMessageType('')
  }, 5000)
}

  const handleDownload = () => {
    if (!outputCode.trim()) {
      setErrorMessage('Code kosong. Silahkan upload atau tempelkan kode terlebih dahulu!')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage('')
        setMessageType('')
      }, 5000)
      return
    }

    const blob = new Blob([outputCode], { type: 'application/javascript' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'encryptedCode.js'
    link.click()
    setErrorMessage('')
  }

  return (
    <Tooltip.Provider>
      <div className="mb-16 border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5 flex flex-col gap-5 text-main-foreground">
        {/* Input Column */}
        <div className="border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5 flex flex-col gap-5">
          <div className="flex justify-between">
            <h2 className="font-heading text-xl sm:text-2xl flex items-center">
  <FaCode className="mr-2 w-6 h-6" />
  Input Code
</h2>
            <button onClick={handleReset} className="text-red-500 text-sm">
              Reset
            </button>
          </div>

          <textarea
            className="rounded h-40 p-2 overflow-auto border placeholder-gray-400"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="// Paste atau upload kode JavaScript di sini..."
          />
{slowMessage && (
  <div className="text-yellow-500 text-sm mt-2">
    Encrypt sedang berlangsung, mohon tunggu… kode anda cukup panjang.
  </div>
)}
          {errorMessage && (
            <div className={`mt-2 text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {errorMessage}
            </div>
          )}

          <button
            onClick={() => document.getElementById('fileInput').click()}
            className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            Upload JS File
          </button>
          <input
            id="fileInput"
            type="file"
            accept=".js"
            onChange={handleFileUpload}
            className="hidden"
          />

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={handleEncrypt}
                disabled={isLoading}
                className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all flex items-center justify-center gap-2 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
                style={{
                  backgroundColor: 'var(--btn-bg)',
                  color: 'var(--btn-text)',
                }}
              >
                {isLoading ? 'Encrypting...' : 'Encrypt Code'}
                {isLoading && <Loader2 className="animate-spin" size={20} />}
               {!isLoading && encryptSuccess && (
  <CheckIcon className="text-green-500" size={20} />
)}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>Encrypt kode kamu!</p>
            </Tooltip.Content>
          </Tooltip.Root>
        </div>

        {/* Output Column */}
        <div className="border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5 flex flex-col gap-5">
          <h2 className="font-heading text-xl sm:text-2xl flex items-center mt-6">
  <FaTerminal className="mr-2 w-6 h-6" />
  Output Code
</h2>

          <textarea
            className="rounded h-40 p-2 overflow-auto border placeholder-gray-400"
            value={outputCode}
            readOnly
            placeholder="// Code yang sudah di Encrypt akan muncul disini..."
          />

          <button
            onClick={handleCopy}
            className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            onClick={handleDownload}
            className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            Download Encrypted Code
          </button>
        </div>
      </div>
    </Tooltip.Provider>
  )
}