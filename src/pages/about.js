import React from 'react'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import SocialLinks from '../components/SocialLinks'

import { MainContent } from '../styles/base'

const AboutPage = () => (
  <Layout>
    <SEO
      title="Sobre mim"
      description="Saiba um pouco mais sobre o desenvolvedor por trás deste blog."
    />
    <MainContent>
      <h1>Sobre mim</h1>
      <p>
        Meu nome é Willian Justen de Vasconcellos, nasci em Petrópolis/RJ e sou
        instrutor na{' '}
        <a
          href="https://www.udemy.com/user/willian-justen-de-vasconcellos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Udemy
        </a>
        , além de ser um nômade digital e tirar{' '}
        <a
          href="https://unsplash.com/@willianjusten"
          target="_blank"
          rel="noopener noreferrer"
        >
          algumas fotos
        </a>{' '}
        por onde vou.
      </p>

      <p>
        Já passei por empresas como{' '}
        <a
          href="http://www.toptal.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Toptal
        </a>
        ,{' '}
        <a
          href="http://www.hugeinc.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Huge
        </a>
        ,{' '}
        <a
          href="http://www.globo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Globo.com
        </a>
        ,{' '}
        <a
          href="https://queremos.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Queremos
        </a>{' '}
        e outras mais. Cursei Tecnologia da Informação na Faeterj-Petrópolis no
        ano de 2014, mas curiosamente, essa não foi minha primeira faculdade, eu
        também fiz <strong>Química Industrial</strong> na Uff. Sim, você leu
        certo, eu realmente fiz Química… E por que eu trabalho com web agora?
        Ah… porque web é incrível, a facilidade em aprender cada dia mais e
        ainda poder ajudar um grande número de pessoas me deixa feliz e
        realizado todos os dias.
      </p>

      <p>
        Eu amo trabalhar em equipe e sou bem comunicativo. No meu tempo livre,
        gosto de ensinar meus amigos sobre alguma coisa que aprendi, acho que
        por isso nasceu esse blog.
      </p>

      <h2>Contato</h2>

      <p>
        Você pode entrar em contato comigo através de qualquer uma das minhas
        redes sociais.
      </p>

      <SocialLinks hideStyle />
    </MainContent>
  </Layout>
)

export default AboutPage
