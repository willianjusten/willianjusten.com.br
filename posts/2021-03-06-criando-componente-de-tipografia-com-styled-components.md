---
layout: post
date: 2021-03-06 10:50:06
image: /assets/img/maxresdefault.jpg
title: Criando componente de Tipografia com styled-components
description: Utilizando o poder do polymorphic no styled-components
introduction: Utilizando o poder do polymorphic no styled-components
twitter_text: Utilizando o poder do polymorphic no styled-components
main-class: js
color: "#D6BA32"
tags:
  - dicas
categories:
  - Dicas rápidas
---
## Introdução

Fala pessoal, eu recentemente comecei uma [série de vídeos com dicas bem rápidas](https://www.youtube.com/watch?v=1dNNL95BsJE&list=PLlAbYrWSYTiOviR_zL01FMa-kWEMDIjeO) lá no meu canal do YouTube, mas como eu também gosto de texto e também quero facilitar a busca seja pelo Google ou pelo YouTube, vou portar os vídeos para cá também. Espero que dê certo =)

## Vídeo

<iframe width="560" height="315" src="https://www.youtube.com/embed/2bqMX2in9AY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Utilizando o poder do `as` polymorphic

Dentro do Styled Components existe um método muito bacana, que é a [polymorphic prop](https://styled-components.com/docs/api#as-polymorphic-prop), que serve para criar um componente e determinar que ele se comporte `como (as)` a tag que você desejar.

Isso é muito legal, pois permite que criemos diferentes estilos, mas sem perder a semântica das tags e não fiquemos reféns a usar `div` em tudo.

No vídeo acima eu mostro como utilizar o `attr` junto ao `as` exatamente para determinar estilos visuais e também que tipo de tag deve ser.

## Exemplo de código

Ao trabalhar com styled components, normalmente nós temos um tema que tem as cores e tamanhos, um exemplo seria:

```javascript
const theme = {
  colors: {
    white: '#eee',
    black: '#111',
    gray: '#333',
    lightGray: 'CCC'
  },
  sizes: {
    xsmall: '1rem',
    small: '1.2rem',
    medium: '1.6rem',
    large: '2.4rem',
    xlarge: '3.2rem',
    xxlarge: '4.0rem'
  }
}
```

Se você estiver utilizando TypeScript, nós também devemos determinar os types disponíveis para o componente, por exemplo:

```typescript
export type HeadingProps = {
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.sizes
  fontWeight?: 100 | 400 | 700
  level?: 1 | 2 | 3 | 4 | 5 | 6
}
```

E aí baseado nisso, podemos criar nosso componente, tendo valores default e também podendo receber esses valores passados:

```typescript
export const Heading = styled('h1').attrs<HeadingProps>(({ level }) => ({
  as: `h${level}`
}))<HeadingProps>`
  ${({
    color = 'white',
    size: 'medium',
    fontWeight: 700
  }) => css`
    font-size: ${theme.sizes[size]};
    color: ${theme.colors[color]};
    font-weight: ${fontWeight};
  `}
`
```

Note que nós utilizamos um `level` exatamente para poder determinar qual vai ser a tag semântica e aí fazemos um concatenação da string no `as`  para ter nosso `h${level}` que pode ir de 1 a 6.

Com o componente pronto, você pode usar da seguinte maneira:

```javascript
<Heading>Esse é o h1 padrão branco, size medium e negrito</Heading>
<Heading level={2} size="xxlarge" color="gray">Esse é um h2 bem grande e cinza</Heading>
```

Como você pode ver, esse foi um exemplo bem rápido e simples, mas você pode criar toda uma estrutura para seus Headings, textos e etc. É essa maneira que bibliotecas maiores como o Material Design utilizam.

## Conclusão

E aí, gostou da dica? Se curtiu, não deixa de se inscrever lá no [canal do YouTube](https://www.youtube.com/WillianJustenCursos/) para essa e mais outras dicas.