'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import Links from '@/components/links'
import { FaHome } from 'react-icons/fa'
import { FaKey } from 'react-icons/fa'
import { FaCode } from 'react-icons/fa'

export default function Home() {
  const pathname = usePathname()

  return (
    <div className="font-base">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl flex items-center">
  <FaHome className="mr-2 w-7 h-7" />
  Langz Panel
</h1>
      <p className="mt-2 text-lg sm:text-xl">
  Berbagi Case Bot WhatsApp & Tools Encrypt
</p>

<div className="mt-8 text-base sm:text-lg">
  <p>
    Di era komunikasi cepat seperti sekarang, bot WhatsApp jadi salah satu tools 
    penting yang banyak digunakan, mulai dari otomatisasi chat, info produk, hingga 
    game seru di grup. Nggak cuma soal bot, aku juga ngerasa penting banget untuk 
    ngasih fitur tambahan biar para developer makin terbantu.
  </p>
  
  
        <div className="my-6 flex justify-center">
          <img 
            src="https://files.catbox.moe/fgp89s.png" 
            alt="WhatsApp Bot" 
            className="w-60 rounded-base border-border border-2 shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            style={{
              backgroundColor: 'var(--btn-bg)',
            }}
          />
        </div>

  <p className="mt-4">
    Lewat halaman ini, aku bakal berbagi berbagai macam case bot WhatsApp, Dengan penjelasan yang detail
    supaya kamu gampang banget paham dan bisa langsung pakai di bot kamu.
    Nggak berhenti di situ, aku juga baru rilis fitur keren yaitu <strong>Tools Encrypt </strong> 
    yang bisa bantu kamu mengenkripsi atau mengobfusksi kode JavaScript supaya lebih aman 
    dari pencurian atau modifikasi.
  </p>

        
        <hr className="my-8 border-t border-border" />

        <h2 className="mt-8 text-xl font-semibold sm:text-2xl flex items-center">
  <FaKey className="mr-2 w-6 h-6" />
  Tools Encrypt
</h2>
        <p className="mt-2">
          Nggak cuma itu, di website ini aku juga baru merilis fitur keren bernama Tools Encrypt. 
          Tools ini dibuat khusus buat kamu yang ingin mengenkripsi atau mengobfusksi kode JavaScript 
          supaya jadi sulit dibaca. Dengan bantuan module <strong>javascript-obfuscator</strong>, 
          kamu bisa melindungi kode dari pencurian, modifikasi, bahkan reverse engineering.
        </p>
        <div className="mt-4">
          <a
            href="/encrypt"
            className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            Tools Encrypt
          </a>
        </div>

        <h2 className="mt-8 text-xl font-semibold sm:text-2xl flex items-center">
  <FaCode className="mr-2 w-6 h-6" />
  Code Case
</h2>
        <p className="mt-2">
          Selain itu, aku juga udah nyiapin kumpulan Code Case untuk bot WhatsApp. Di sini kamu 
          bakal nemuin case-case seru kayak auto-reply, sticker maker, downloader, sampai fitur random chat. 
          Semuanya aku kasih lengkap dengan perintah dan penjelasan, biar kamu tinggal pakai tanpa ribet 
          dan langsung bisa meramaikan grup atau otomatisasi tugas di bot kamu.
        </p>
        <div className="mt-4">
          <a
            href="/code"
            className="shadow-shadow rounded-base font-base border-border border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base"
            style={{
              backgroundColor: 'var(--btn-bg)',
              color: 'var(--btn-text)',
            }}
          >
            Lihat Kode
          </a>
        </div>
      </div>

      <Links />
    </div>
  )
}