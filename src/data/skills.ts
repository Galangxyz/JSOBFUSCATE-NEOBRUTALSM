import {
  type IconType,
  SiReact,
  SiJavascript, // placeholder untuk Encrypt
  SiVercel,
} from '@icons-pack/react-simple-icons'

const SKILLS: { field: string; skills: { skill: string; icon: IconType }[] }[] =
  [
    {
      field: 'Made Using',
      skills: [
        { skill: 'Encrypt', icon: SiJavascript }, // placeholder
        { skill: 'ReactJS', icon: SiReact },
        { skill: 'Vercel', icon: SiVercel },
      ],
    },
  ]

export default SKILLS