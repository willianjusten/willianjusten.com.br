---
layout: post
date: 2015-07-10T22:04:05.000Z
image: /assets/img/react-1/main.png
title: '#1 - Começando com ReactJS'
description: Tentando entender o que é? Para que serve? Por onde começar?
introduction: >-
  O ReactJS é a onda do momento! Vamos entender o que é? Para que serve? Por
  onde começar?
twitter_text: ReactJS - Tentando entender o que é? Para que serve? Por onde começar?
main-class: js
color: '#D6BA32'
tags:
  - react
  - js
  - tutorial
categories:
  - Aprendendo ReactJS
---
## Introdução

A trilha sonora da vez fica com a banda [Tristeza](https://open.spotify.com/artist/3oglFEsE6GvwwJFConxKa5), um indie instrumental bastante maneiro, ótimo para quem está querendo focar um pouco e também relaxar.

Como podem notar pelo título **\#1 - Começando com React**, farei uma nova série sobre React e este será o primeiro post sobre o assunto. O objetivo será aprender mais enquanto escrevo esses posts e também passar a bola para quem quiser começar a aprender também.

## Moda Jovem

![Gráfico indicando que o react é cada vez mais falado.](/assets/img/trends.png)

Desde quando o React foi lançado, ele foi crescendo e ganhando bastante força, principalmente por ter o Facebook como seu criador. Isso, de fato, o tornou vítima do rótulo "moda jovem". Mas será que esse rótulo é válido e o React é só uma modinha passageira ou ele tem algo realmente bom? Não irei responder essa pergunta, irei mostrar o que ele faz, como funciona e você deverá escolher se ele te atende ou não em sua necessidade.

## O que é o React?

O React é uma `biblioteca` para criar interfaces, que foi idealizada pela galera do Facebook e Instagram.

Ele funciona como o `V` do `MVC`, permitindo criar seus próprios componentes. Numa aplicação em React, você deve quebrar os diferentes elementos dela em pequenos componentes reutilizáveis. Cada vez que algo for complexo, quebre em pequenas partes e desenvolva esses componentes, essa técnica é chamada de
`component driven development`.

**Mas e esse React? É tipo um Angular né?**

Não, não, não e não! O Angular é um `framework`, ou seja, um conjunto de ferramentas para resolver vários tipos de coisas. Já uma biblioteca serve para resolver uma coisa em específico, no caso do React é renderizar componentes.

## Legal, mas porque usar?

Exatamente por ter um objetivo específico, sua implementação é totalmente voltada para isso e consequentemente garante melhor performance e melhores formas de utilização.

O pessoal que criou o React fez um [post bem bacana](http://facebook.github.io/react/blog/2013/06/05/why-react.html) falando o porquê deles terem criado e algumas de suas vantagens.

Resumindo:

* Facilidade de se criar componentes pequenos e reutilizáveis;
* Trabalhar com a abordagem do Virtual DOM, que é bem mais rápido que o DOM nativo;
* O React pode rodar no lado do servidor, permitindo um melhor SEO;
* Unificar markup e a lógica da view, facilitando a extensão e manipulação.

Se quiser mais alguns motivos:

* [6 Reasons Why We Love React.js](https://www.syncano.io/blog/reactjs-reasons-why-part-1/)

## Como funciona?

A principal mágica do React é de fato o uso do `Virtual DOM`, mas como ele funciona?

Como todos sabemos o `DOM` é super lento e devemos evitar ao máximo manipulá-lo em excesso, visto que precisaríamos fazer muitos repaints e reflows, que iriam custar muito para o nosso browser.

**É aí que o React brilha!**

Quando um componente é inicializado, o método `render` é chamado, gerando uma representação da view. Dessa representação, um markup é produzido e injetado no documento. Quando algum dado muda, o método `render` é chamado novamente e para que tenhamos uma atualização mais eficiente possível, o React faz um diferenciação (`diff`) do valor novo com o valor velho e aplica no DOM somente a nova mudança.

Segue um exemplo abaixo:

![Diagrama mostrando o funcionamento do Virtual DOM no ReactJS](/assets/img/react-1/reactjs-virtual-dom.png)

Como podemos observar, ele inicialmente tem a cópia "original" do componente e o estado que ele deve ter depois, para isso ele faz uma diferenciação entre os 2 modelos no Virtual DOM, vê o que precisa mudar e mandar aplicar, somente após isso que as operações são feitas no DOM real.

Se você quiser saber ainda melhor como funciona, tem esse [post explicando o algoritmo](http://calendar.perfplanet.com/2013/diff/).

## Pensando em Componentes

Como enfatizado em algumas partes do post, o React serve para criar componentes, portanto é importante entender o conceito de componentização e saber como aplicá-lo para os seus sistemas.

### Mas como conseguir separar esses componentes e seus subcomponentes?

Da mesma forma que criamos nossas Classes e Métodos, devemos pensar o mesmo para os nossos componentes e seguir o [princípio da responsabilidade única](https://www.devmedia.com.br/arquitetura-o-principio-da-responsabilidade-unica/18700). Onde uma classe deve fazer apenas uma coisa, deve fazê-la bem e deve fazer somente ela.

### Exemplo

Vou tomar como exemplo, o slide de destaques da Home do [Globoesporte.com](http://globoesporte.globo.com/) e vou chamá-lo de `<Slide>`:

![Destaques Home Globoesporte](/assets/img/react-1/slide.jpg)

O `<Slide>` possui uma única função, que é mostrar os destaques na página através de um Carousel. Dentro desse `<Slide>`, já poderemos separar cada um desses retângulos e dar o nome de `<SlideItem>`, que seriam os subcomponentes de `<Slide>`.

![SlideItem](/assets/img/react-1/slideItem.jpg)

E ainda dentro desses subcomponentes, podemos separar mais 2 elementos, que são o `SlideTitle` e o `SlideSubtitle`.

![SlideItem](/assets/img/react-1/slideElements.jpg)

A partir disso, já conseguimos montar uma hierarquia desses componentes e subcomponentes, que seria:

* Slide
  		- SlideItem
  			+ SlideTitle
  			+ SlideSubtitle

Tendo a estrutura de componentes e seus subcomponentes, fica mais fácil de trabalhar com a abordagem do React e criar suas interfaces.

## Conclusão

Essa foi só a primeira parte, para entendermos pelo menos um pouco do que é, o que não é e seu funcionamento. Para os próximos posts, a ideia é já começar a pôr a mão na massa e codificar pequenos exemplos, até para entender mais algumas coisas de seu funcionamento.

## Veja mais posts

[Série sobre React](https://willianjusten.com.br/series/#aprendendo-reactjs)
