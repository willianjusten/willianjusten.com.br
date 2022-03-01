import Course from 'components/Course'
import { NextSeo } from 'next-seo'

const coursesList = [
  {
    title: 'Aprenda Testes End to End na Prática com Cypress',
    image: 'react-avancado.png',
    link: 'https://www.udemy.com/course/cypress-na-pratica?couponCode=PROMOMAR22',
    description:
      'Como testar melhor suas aplicações e garantir mais qualidade ao projeto!'
  },
  {
    title: 'NextJS na Prática!',
    image: 'react-avancado.png',
    link: 'https://nextjs.willianjusten.com.br',
    description:
      'Crie um mapa totalmente interativo com um CMS integrado em poucas horas!'
  },
  {
    title: 'React Avançado',
    image: 'react-avancado.png',
    link: 'https://www.udemy.com/course/react-avancado/?couponCode=PROMOMAR22',
    description: 'Crie aplicações reais com NextJS, Strapi, GraphQL e mais!'
  },
  {
    title: 'Mini-curso de TypeScript',
    image: 'ts-course.png',
    link: 'https://www.youtube.com/watch?v=mRixno_uE2o&list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_',
    description:
      'Aprenda o que é TypeScript, como funciona, por que usar e muito mais!'
  },
  {
    title: 'Gatsby: Crie um site PWA com React, GraphQL e Netlify CMS',
    image: 'curso-gatsby.jpg',
    link: 'https://www.udemy.com/course/gatsby-crie-um-site-pwa-com-react-graphql-e-netlify-cms/?couponCode=PROMOMAR22',
    description:
      'Crie e coloque no ar um site extremamente rápido, utilizando boas práticas e as ferramentas mais utilizadas no mercado.'
  },
  {
    title: 'Criando um ambiente de Desenvolvimento no Windows',
    image: 'curso-windows.png',
    link: 'https://www.youtube.com/watch?v=YcR8pKvjx44&list=PLlAbYrWSYTiOpefWtd6uvwgKT1R-94Zfd',
    description: 'Comece a desenvolver no Windows do jeito certo e sem erros!'
  },
  {
    title: 'Mini-curso de Netlify no Youtube',
    image: 'netlify.png',
    link: 'https://www.youtube.com/watch?v=a1cIjP1bueM&list=PLlAbYrWSYTiMGMxQf9JSoZUU1rgVpGPth',
    description:
      'Aprenda a botar seus projetos no ar de forma fácil e gratuita!'
  },
  {
    title: 'Git e Github na Vida Real',
    image: 'git-real-life.png',
    link: 'https://www.udemy.com/course/git-e-github-na-vida-real/?couponCode=PROMOMAR22',
    description:
      'Aprenda Workflows usados em empresa e domine o git para nunca mais ter problema nenhum!'
  },
  {
    title: 'Aprendendo SVG do início ao avançado',
    image: 'curso-svg.png',
    link: 'https://www.udemy.com/course/aprendendo-svg-do-inicio-ao-avancado/?couponCode=PROMOMAR22',
    description:
      'Se adiante e adquira um dos cursos mais completos de SVG totalmente em português.'
  },
  {
    title: 'Git e Github para Iniciantes',
    image: 'curso-git.jpg',
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
    {coursesList.map(({ title, description, link, image }, i) => (
      <Course
        key={i}
        title={title}
        description={description}
        link={link}
        image={image}
      />
    ))}
  </>
)

export default CursosPage
