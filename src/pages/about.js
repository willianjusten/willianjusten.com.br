import { NextSeo } from 'next-seo'
import SocialLinks from 'components/SocialLinks'

import { MainContent } from 'styles/base'

const AboutPage = () => (
  <>
    <NextSeo
      title="Sobre mim | Willian Justen"
      description="Saiba um pouco mais sobre o desenvolvedor por trás deste blog."
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: 'https://willianjusten.com.br',
        site_name: 'Willian Justen',
        title: 'Willian Justen',
        images: [
          {
            url: 'https://willianjusten.com.br/assets/img/blog-cover.png',
            width: 1200,
            height: 630,
            alt: 'Willian Justen Blog'
          }
        ]
      }}
    />
    <MainContent>
      <h1>Sobre mim</h1>
      <p>
        Meu nome é Willian Justen de Vasconcellos, nasci em Petrópolis/RJ e
        trabalho como Staff Product Engineer na{' '}
        <a href="https://spoke.com" target="_blank" rel="noopener noreferrer">
          Spoke
        </a>
        , construindo produtos web com React, Next.js e TypeScript.
      </p>

      <p>
        Também sou instrutor na{' '}
        <a
          href="https://www.udemy.com/user/willian-justen-de-vasconcellos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Udemy
        </a>
        , onde ensino desenvolvimento web para mais de 250 mil alunos, com
        cursos sobre Git e GitHub, React e outros temas. Pelo trabalho com a
        comunidade, fui reconhecido como GitHub Star (Top Teacher em 2021) e{' '}
        <a
          href="https://mvp.microsoft.com/en-us/mvp/Willian%20%20Justen%20de%20Vasconcellos-5004209"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft MVP
        </a>
        .
      </p>

      <p>
        Já passei por empresas como{' '}
        <a
          href="https://www.appcues.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Appcues
        </a>
        ,{' '}
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
        e outras mais.
      </p>

      <p>
        Cursei Tecnologia da Informação na Faeterj-Petrópolis, mas antes disso
        fiz <strong>Química Industrial</strong> na UFF. Sim, Química mesmo.
        Migrei para a web porque é uma área em que sempre tem algo novo para
        aprender e onde consigo ajudar muita gente, e é isso que me mantém
        animado até hoje.
      </p>

      <p>
        Gosto de trabalhar em equipe e de ensinar o que aprendo, e foi daí que
        nasceu esse blog. No tempo livre, viajo e tiro{' '}
        <a
          href="https://unsplash.com/@willianjusten"
          target="_blank"
          rel="noopener noreferrer"
        >
          algumas fotos
        </a>{' '}
        por onde passo.
      </p>

      <h2>Contato</h2>

      <p>
        Você pode entrar em contato comigo através de qualquer uma das minhas
        redes sociais.
      </p>

      <SocialLinks hideStyle />
    </MainContent>
  </>
)

export default AboutPage
