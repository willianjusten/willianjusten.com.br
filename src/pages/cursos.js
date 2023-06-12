import Course from 'components/Course'
import { NextSeo } from 'next-seo'

const coursesList = [
  {
    title: 'NextJS na Prática!',
    link: 'https://www.youtube.com/playlist?list=PLlAbYrWSYTiPlXj6USip_lCPzONUATJbE',
    description:
      'Crie um mapa totalmente interativo com um CMS integrado em poucas horas!'
  },
  {
    title: 'React Avançado',
    link: 'https://www.udemy.com/course/react-avancado/?couponCode=9E454F41636A280AF968',
    description: 'Crie aplicações reais com NextJS, Strapi, GraphQL e mais!'
  },
  {
    title: 'JS Moderno (ES6)',
    link: 'https://www.youtube.com/playlist?list=PLlAbYrWSYTiPQ1BE8klOtheBC0mtL3hEi',
    description:
      'Aprenda as novas features do JS moderno em vídeos rápidos e diretos!'
  },
  {
    title: 'Mini-curso de TypeScript',
    link: 'https://www.youtube.com/watch?v=mRixno_uE2o&list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_',
    description:
      'Aprenda o que é TypeScript, como funciona, por que usar e muito mais!'
  },
  {
    title: 'Criando um ambiente de Desenvolvimento no Windows',
    link: 'https://www.youtube.com/watch?v=YcR8pKvjx44&list=PLlAbYrWSYTiOpefWtd6uvwgKT1R-94Zfd',
    description: 'Comece a desenvolver no Windows do jeito certo e sem erros!'
  },
  {
    title: 'Mini-curso de Netlify no Youtube',
    link: 'https://www.youtube.com/watch?v=a1cIjP1bueM&list=PLlAbYrWSYTiMGMxQf9JSoZUU1rgVpGPth',
    description:
      'Aprenda a botar seus projetos no ar de forma fácil e gratuita!'
  },
  {
    title: 'Git e Github na Vida Real',
    link: 'https://www.youtube.com/playlist?list=PLlAbYrWSYTiNqugqFFWWsgONJsmc3eMpg',
    description:
      'Aprenda Workflows usados em empresa e domine o git para nunca mais ter problema nenhum!'
  },
  {
    title: 'Aprendendo SVG do início ao avançado',
    link: 'https://www.youtube.com/playlist?list=PLlAbYrWSYTiOufRJOeP73o4GR9N1afQdP',
    description:
      'Se adiante e adquira um dos cursos mais completos de SVG totalmente em português.'
  },
  {
    title: 'Git e Github para Iniciantes',
    link: 'https://www.youtube.com/playlist?list=PLlAbYrWSYTiPA2iEiQ2PF_A9j__C4hi0A',
    description:
      'Tudo que você precisa para começar a versionar seus arquivos e contribuir com a comunidade opensource.'
  }
]

const CursosPage = () => (
  <>
    <NextSeo
      title="Cursos | Willian Justen"
      description="Aprenda as mais diversas tecnologias em cursos separados em pequenos e completos módulos."
      openGraph={{
        images: [
          {
            url: 'https://willianjusten.com.br/assets/img/cursos-cover.png',
            width: 1200,
            height: 630,
            alt: 'Willian Justen Cursos'
          }
        ]
      }}
    />
    {coursesList.map(({ title, description, link }, i) => (
      <Course key={i} title={title} description={description} link={link} />
    ))}
  </>
)

export default CursosPage
