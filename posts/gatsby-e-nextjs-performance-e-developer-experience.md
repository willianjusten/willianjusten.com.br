---
layout: post
date: 2021-07-06 12:27:07
image: ''
title: 'Gatsby e NextJS: Performance e Developer Experience'
description: Uma breve comparação entre os frameworks e a experiência de desenvolvimento.
main-class: js
color: '#D6BA32'
tags:
  - nextjs
  - gatsby
  - blog
categories:
  - 'NextJS'
---

## Introdução

Fala pessoal! No [post passado](https://willianjusten.com.br/migrei-meu-blog-do-gatsby-para-o-nextjs) eu falei da migração desse blog do Gatsby para o NextJS e disse a razão disso, que basicamente foi "Porque eu quis". Mas nessa migração, pude notar vários detalhes interessantes, estes relacionados a performance e uma coisa não muito falada ainda (mas que vai crescer muito), que é a Developer Experience ou Experiência para desenvolver falando em linguas tupiniquis.

Então chega de enrolar, bota para tocar a [banda Red](https://open.spotify.com/artist/01crEa9G3pNpXZ5m7wuHOk?si=UldtaNAuTe6MwLVKhBe1lg&dl_branch=1) e vem comigo!

## Performance

Ao você entrar nesse post hoje, você deve ter notado como carregou super rápido ~~assim espero né, senão deu ruim~~. Mas antes do blog ser em NextJS, ele já era super rápido com o Gatsby também. Como meu blog é gerado inteiramente estático, a diferença entre um ou outro nesse ponto acaba sendo bem mínima mesmo. Conforme você vai ver nas imagens abaixo. Os valores foram calculados pela [Vercel Analytics](https://vercel.com/analytics) que é uma ferramenta mais confiável que analisa a performance baseada nos seus usuários..

Segue aqui as notas do meu blog usando o **Gatsby**:

![Indica Nota 99 - 1.64 FCP e 1.74 LCP](/assets/img/gatsby-perf.png)

Agora segue a nota do blog atual com **NextJS:**

![Nota 100: 1.48 FCP e 1.49 LCP](/assets/img/next-perf.png)

Como dá para notar, eles praticamente tem a mesma performance, com o NextJS ganhando por muito pouquinho. Mas já me aconteceu o contrário em outros casos, onde o Gatsby era pouco melhor, ou seja, nesse ponto, os 2 são bons demais e você terá uma performance ótima de qualquer forma!

Eu ainda preciso e quero fazer algumas otimizações no blog com o NextJS, como por exemplo, usar o componente de `Image` diretamente nas imagens dos posts. É bem simples, meio que só editar no parser do Markdown, possivelmente farei isso essa semana. E outras coisinhas eu também vou analisando e melhorando, inclusive, se você achar algum bug/brecha para melhoria, me manda mensagem!

## Processo de Build

É aqui que o negócio já começa a mudar e **não é pouco não!** Uma coisa que sempre me chateou quando mudei do Jekyll para o Gatsby, é que meu build que antes tomava apenas alguns segundos, agora levava vários minutos. Mas pelo Gatsby ter tantas outras vantagens, eu acabava aceitando esse trade-off, mas quanto mais posts eu ia escrevendo, mais e mais pesado ele ia se tornando.

Para efeitos comparativos, eu utilizei a mesma máquina para gerar os builds.

```sh
# Minha configuração

Ryzen 9 3950x - 16 cores - 4.7Ghz
64Gb ram DDR5 3200mHZ
ssd m1 nvme 1Tb - 3500Mb/s leitura | 2300Mb/s escrita
Windows 11 WSL2
```

E quanto as informações de conteúdo, eu tenho cerca 190 páginas somando posts e páginas normais. Vamos aos builds!

Ignorem o formato do log do build e se atentem ao **tempo de build**. Segue primeiro o do Gatsby:

![Tempo de build: 98.23s](/assets/img/gatsby-build.jpeg)

E agora o build do NextJS com exatamente o mesmo conteúdo e mesmo layout.

![Tempo de build 3.93s](/assets/img/next-build.jpeg)

Sim! É isso mesmo que você está vendo, enquanto no Gatsby demorou `98.23s`, no NextJS durou apenas `3.93s`. Enquanto num eu posso ir pegar um cafézinho, no outro eu mal consigo piscar e tá pronto! Já pensou quantos cafés estou deixando de tomar agora? Meu estômago agradece!

Mas talvez você venha e fale:

> Ah Willian, mas seu PC é da Nasa, quero ver na Vercel/Netlify

Pois então, segue aqui o tempo de build, consegue adivinhar qual é qual?

![Um dos builds teve 3min e outro teve 58s](/assets/img/build-vercel.png)

Pois é, o NextJS é muito mais rápido no build, tanto localmente numa boa máquina (até nas ruinzinhas) quanto no servidor final. E isso pode parecer bobeira, mas se somar o tempo que perde com builds, você já poderia estar programando outra coisa.

## Developer Experience

E confesso que eu fiz esse post todo só para poder falar dessa parte aqui, que é onde realmente me fez querer migrar do Gatsby para o NextJS. A equipe por trás do NextJS está sempre preocupada em evoluir o projeto de forma bastante constante, em pequeno período de tempo tivemos:

- [NextJS 10](https://nextjs.org/blog/next-10) - primeira major version depois de um tempo, trouxe componente de Imagem, Analytics, rotas internacionalizadas. **Nenhuma breaking change**
- [NextJS 10.1](https://nextjs.org/blog/next-10-1) - veio pouco depois da v10 e já trouxe muitas melhorias em performance, refresh 3x mais rápido em dev, instalação mais rápida e mais. **Nenhuma breaking change**
- [NextJS 10.2](https://nextjs.org/blog/next-10-2) - builds ainda mais rápidos, otimização automática de fontes e mais. **Nenhuma breaking change**
- [NextJS 11](https://nextjs.org/blog/next-11) - outra major version, incluindo mais melhorias na análise de código, com linter próprio, novo componente de script, melhorias em e imagem e mais. **Nenhuma breaking change**

E agora vamos falar do Gatsby:

- [Gatsby v2 para v3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/) - demorou mais de 1 ano para fazer uma grande atualização. **Uma página gigante de breaking changes e mil mudancinhas para fazer**.

Acho que só pelo que escrevi ali, já deu para entender minha grande reclamação né? Por mais que o Gatsby seja legal e que a v3 tenha trazido boas melhorias, demoraram demais para isso e consequentemente criaram várias breaking changes. Isso prejudica demais a experiência do desenvolvedor.

### Modelo de Plugins x Genérico

Aqui tá um outro ponto que pode levar a uma boa discussão. O Gatsby funciona todo em cima dos seus **plugins** e por um outro lado, isso é muito bom, pois ele tem uma "marketplace" com plugin para tudo. Precisa de um plugin para trabalhar com GraphCMS? Ele tem. Gerar sitemap? Tem plugin também. Isso auxilia bastante se você precisa desenvolver algo super rápido. Mas você acaba ficando muito refém desses plugins/estruturas e o Gatsby fica considerado como `configuration over code`, onde você coda menos e configura mais.

Eu confesso que desde a época do Wordpress, nunca fui muito fã de estruturas inteiramente de plugins, porque você fica dependente que os plugins atualizem conforme a plataforma atualiza e nem sempre é assim e você acaba ficando prejudicado. Outro grande problema, é que você acaba sem saber o que está acontecendo direito, é muita "mágica", o que só dificulta ainda mais se precisar customizar algo.

Por um outro lado, no NextJS, ele não tem quase nada muito "pronto", então muitos detalhes você precisa fazer a sua implementação. Então você fica mais no `code over configuration`, ou seja, você acaba codando mais ao invés de ficar configurando coisinhas.

E se você parar pensar, tudo que é mais coisa de "configurar" do que codar, as pessoas tem dificuldades e problemas (alô Webpack?). O Gatsby tem uma boa documentação, o que ajuda bastante, mas se for comparar, eu ainda voto pelo NextJS, por ter uma API mais simples e fácil para começar. Mas, novamente, isso é algo **muito opinativo**.

## Conclusão

Como minha mãe sempre diz:

> O que seria do azul se todo mundo só gostasse do verde?

Como você pode ver pelo post, hoje eu sou "team NextJS", mas isso num impede de mudar no futuro também. Minha preocupação é que essa galera se dedique cada vez mais na experiência do desenvolvedor, para que a gente consiga entregar cada vez mais rápido e melhor.

E você? O que acha dessas duas ferramentas? Compartilha esse post entre seus amigos e levante essa discussão sobre Developer Experience, é bem legal!
