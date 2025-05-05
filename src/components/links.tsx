import {
  IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
  SiFacebook,
  SiFirefoxbrowser,
  SiWhatsapp,
} from '@icons-pack/react-simple-icons'

export default function Links() {
  const links: { icon: IconType; href: string }[] = [
    {
      icon: SiGmail,
      href: 'mailto:fplang89@gmail.com',
    },
    {
      icon: SiGithub,
      href: 'https://github.com/Galangxyz',
    },
    {
      icon: SiWhatsapp,
      href: 'https://wa.me/6283833735020',
    },
    {
      icon: SiFacebook,
      href: 'https://www.facebook.com/fathir.bimo.7?mibextid=ZbWKwL',
    },
    {
      icon: SiFirefoxbrowser,
      href: 'https://langzpanel.mataberita.com',
    },
  ]

  return (
    <div className="mr-auto mt-12 flex w-full flex-wrap items-center gap-10">
      {links.map((link, id) => {
        return (
          <a target="_blank" key={id} href={link.href}>
            <link.icon title="" />
          </a>
        )
      })}
      {/* Footer Text with Transparent Background and Black Text */}
      <footer className="w-full bg-transparent text-black dark:text-white py-4 mt-6">
        <div className="container mx-auto text-center">
          <p className="mb-2 mt-0.5 text-sm">
            &copy; {new Date().getFullYear()} Langz Panel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
