import React from 'react'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import CursosImage from '../components/CursosImage'

const cursosList = [
  {
    title: 'Mini-curso de Netlify no Youtube',
    image: 'netlify.png',
    link:
      'https://www.youtube.com/watch?v=a1cIjP1bueM&list=PLlAbYrWSYTiMGMxQf9JSoZUU1rgVpGPth',
    description:
      'Aprenda a botar seus projetos no ar de forma fácil e gratuita!'
  },
  {
    title: 'Aprenda a criar sites animados com Greensock',
    image: 'curso-greensock.png',
    link:
      'https://www.udemy.com/aprenda-a-criar-sites-animados-com-greensock/?couponCode=SEGUIDORBLOG',
    description:
      'Aprenda a criar animações complexas de um jeito muito fácil e divertido!'
  },
  {
    title: 'Git e Github na Vida Real',
    image: 'git-real-life.png',
    link:
      'https://www.udemy.com/git-e-github-na-vida-real/?couponCode=SEGUIDORBLOG',
    description:
      'Aprenda Workflows usados em empresa e domine o git para nunca mais ter problema nenhum!'
  },
  {
    title: 'Curso JS com TDD na Prática (inclui JS Moderno)',
    image: 'js-tdd.png',
    link:
      'https://www.udemy.com/js-com-tdd-na-pratica/?couponCode=SEGUIDORBLOG',
    description:
      'Aprenda testes na prática e garanta um currículo melhor para o mercado.'
  },
  {
    title: 'Curso Completo de JavaScript Moderno - ES6',
    image: 'curso-es6.png',
    link:
      'https://www.udemy.com/curso-completo-de-javascript-moderno-es6/?couponCode=SEGUIDORBLOG',
    description:
      'O JavaScript evoluiu bastante e agora é muito mais fácil de escrever, aprenda todos os novos truques dessa grande atualização.'
  },
  {
    title: 'Aprendendo SVG do início ao avançado',
    image: 'curso-svg.png',
    link:
      'https://www.udemy.com/aprendendo-svg-do-inicio-ao-avancado/?couponCode=SEGUIDORBLOG',
    description:
      'Se adiante e adquira um dos cursos mais completos de SVG totalmente em português.'
  },
  {
    title: 'Git e Github para Iniciantes',
    image: 'curso-git.jpg',
    link: 'https://www.udemy.com/git-e-github-para-iniciantes/',
    description:
      'Tudo que você precisa para começar a versionar seus arquivos e contribuir com a comunidade opensource.'
  },
  {
    title: 'Criando sites estáticos com Jekyll',
    image: 'curso-jekyll.png',
    link: 'https://www.udemy.com/criando-sites-estaticos-com-jekyll/',
    description:
      'Aprenda a criar sites estáticos com o Jekyll e hospedar diretamente no Github Pages.'
  }
]

const CursosPage = () => (
  <Layout>
    <SEO title="Cursos" />
    {cursosList.map((curso, i) => (
      <a href={curso.link} key={i}>
        <div className="post-list">
          <CursosImage filename={curso.image} alt={curso.title} />
          <h1>{curso.title}</h1>
          <p>{curso.description}</p>
        </div>
      </a>
    ))}
  </Layout>
)

export default CursosPage
