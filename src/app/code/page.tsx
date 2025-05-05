'use client'

import PROJECTS from '@/data/projects'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FaFileCode } from 'react-icons/fa'
import Links from '@/components/links'

export default function Code() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([])

  const handleCopy = async (code: string, id: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(id)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl flex items-center">
        <FaFileCode className="mr-2 w-7 h-7" />
        Code Case
      </h1>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((project, id) => {
          const isExpanded = expandedIndexes.includes(id)

          return (
            <div
              className="border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5 flex flex-col gap-5"
              key={id}
            >
              <div className="w-full">
                <div
                  className={`relative rounded-xl ${
                    !isExpanded ? 'max-h-[300px] overflow-hidden' : ''
                  }`}
                  style={{
                    maskImage: !isExpanded
                      ? 'linear-gradient(to bottom, black 60%, transparent)'
                      : 'none',
                    WebkitMaskImage: !isExpanded
                      ? 'linear-gradient(to bottom, black 60%, transparent)'
                      : 'none',
                  }}
                >
                  <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    customStyle={{
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '0.85rem',
                      backgroundColor: '#1f2937',
                      color: '#f9fafb',
                      margin: 0,
                    }}
                  >
                    {project.codeSnippet}
                  </SyntaxHighlighter>

                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1f2937] to-transparent pointer-events-none rounded-b-xl" />
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(id)}
                  className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base mt-4"
                  style={{
                    backgroundColor: 'var(--btn-bg)',
                    color: 'var(--btn-text)',
                  }}
                >
                  {isExpanded ? 'Tutup' : 'Tampilkan Semua'}
                </button>
              </div>

              <div className="text-main-foreground font-base mt-2 sm:mt-0 sm:w-1/2 w-full">
                <h2 className="font-heading text-xl sm:text-2xl">
                  {project.name}
                </h2>

                <p className="mt-2">{project.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-5">
                  <button
                    onClick={() => handleCopy(project.codeSnippet, id)}
                    className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
                    style={{
                      backgroundColor: 'var(--btn-bg)',
                      color: 'var(--btn-text)',
                    }}
                  >
                    {copiedIndex === id ? 'Copied!' : 'Copy Code'}
                  </button>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
                    style={{
                      backgroundColor: 'var(--btn-bg)',
                      color: 'var(--btn-text)',
                    }}
                  >
                    Channel Whatsapp
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Adding the Links component here */}
      <Links />
    </div>
  )
}