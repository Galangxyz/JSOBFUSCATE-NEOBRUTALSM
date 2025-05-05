import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'
import Encryptor from '@/components/sections/encryptor'
import { FaShieldAlt } from 'react-icons/fa'
import Links from '@/components/links'

export default function About() {
  return (
    <div className="font-base">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl flex items-center">
  <FaShieldAlt className="mr-2 w-7 h-7" />
  Tools Encrypt
</h1>

      <div className="mb-10 text-base sm:text-lg">
  <p>
    Encrypt adalah sebuah tools yang dibuat untuk mengenkripsi atau mengobfusksi kode JavaScript
    Anda agar menjadi sulit dibaca dan dipahami. Tools ini menggunakan module 
    <strong> javascript-obfuscator</strong> untuk mengacak struktur kode tanpa mengubah fungsionalitasnya.
  </p>

  <p className="mt-2">
    Contohnya seperti di bawah ini:
  </p>

  <pre className="bg-gray-900 text-green-400 p-2 rounded mt-2 overflow-x-auto text-sm">
    <code>
      function 希ﾀLangzEnc鿣_0x55a6(_0x470dcd,_0x3bd0e3) {'{'}const _0x2cc9e7=希ﾀLangzEnc鿣_0x1e59();return 希ﾀLangzEnc鿣
    </code>
  </pre>

  <p className="mt-2">
    Tujuannya adalah melindungi kode dari pencurian, modifikasi, atau reverse engineering.
  </p>
</div>

      {/* Tambahkan Encryptor di sini */}
      <Encryptor />

      <Skills />

      <Experience />
      <Links />
    </div>
  )
}