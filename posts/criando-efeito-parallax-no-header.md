---
layout: post
title: 'Criando efeito parallax no header'
date: 2016-04-16 10:39:03
image: '/assets/img/header-parallax/header-parallax.png'
description: 'Aprenda a fazer esse efeito simples que pode deixar seu site ainda mais bonito.'
main-class: 'css'
color: '#2DA0C3'
tags:
  - css
  - frontend
  - parallax
categories:
twitter_text: 'Aprenda a fazer esse efeito e deixe seu site ainda mais bonito.'
introduction: 'Aprenda a fazer esse efeito simples que pode deixar seu site ainda mais bonito.'
---

## Introdução

E aí pessoal, aproveitando que não escrevo há um tempinho aqui, resolvi fazer esse post bastante simples, explicando como fiz o novo estilo do header do meu blog. Aproveito para pegar feedbacks do que acharam, eu confesso que ainda não sei se gostei ou não =/

Vou ouvindo uma banda bem maneira chamada [Dark Stares](https://open.spotify.com/album/4I63EqCJ5b8sfJyWSo5bvS), um rock bem maneiro com guitarras distorcidas, baixos e baterias bem destacados.

## Motivação

Eu estava com uns amigos brincando com um [crawler](https://github.com/willianjusten/crawler-huge) que eu fiz um tempinho atrás (totalmente experimental, cheio de erros e que ainda não tive tempo de mexer), que rastreia as urls do site e tira screenshots.

Quando eu fui tirar screenshots do meu blog, notei que todas acabavam ficando com o header percorrendo toda a página e aí nem o texto aparecia. Isso acontece, pois como o crawler não tem uma viewport e eu havia definido uma altura de 100% da tela para o header, ele acabava ocupando tudo.

Foi aí que um amigo falou que gostava muito do header do [blog do Invision](http://blog.invisionapp.com/designtalk-a-license-for-creative-advocacy/), eu olhei e pensei, pow isso aí é simplão, dá para fazer com css rapidinho e o detalhe do scroll com js puro. Acabou que eu fiz um para mim...

Se você quiser ver a demo feita para esse post, [clique aqui](https://labs.willianjusten.com.br/header-parallax/).

## Parte do CSS

O esquema é o seguinte, para dar a impressão que o conteúdo está passando por cima do header, precisamos trabalhar com a propriedade `position: fixed`, ela é responsável como o nome já diz, por deixar os elementos fixos na tela, ou seja, sem serem afetados pelo scroll da página. Nosso header também precisa ter uma altura definida e uma largura de 100% para se acomodar bem a página.

Nosso header então vai ter as seguintes propriedades:

```css
.header-paralax {
  background-image: url('img/header.jpg');
  background-size: cover;
  width: 100%;
  position: fixed;
  height: 600px;
}
```

Depois de feito o header, só precisamos ajustar o conteúdo da parte que vai sobrepor o header. Quando colocamos um elemento com `position: fixed` ele passa a não ter "espaço ocupado" e todo conteúdo já sobrepõe ele na hora. Mas não queremos isso, senão o header nem apareceria. Nós precisamos pegar o nosso conteúdo e espaçar exatamente da altura do header, no nosso exemplo `height: 600px`. Para isso, definimos um `position: relative`, que fará nosso conteúdo respeitar a nova posição e daremos um `top: 600px`.

O problema de fazermos isso é que se o conteúdo não tiver um fundo, na hora que ele sobrepôr o header, ele vai ficar todo vazado e feio, para isso, definimos um `background` com a cor que desejarmos, assim ele vai de fato, fazer sumir o header.

As propriedades do nosso exemplo vão ficar assim:

```css
main {
  background: #e7e3da;
  position: relative;
  top: 600px;
  font-family: 'Raleway', sans-serif;
}
```

Pronto! O efeito de sobrepôr já está feito! Se você quiser, já pode parar por aí =)

## Parte do JS

Se você quiser deixar um detalhe sutil e de fato criar a sensação do Parallax (quando elementos se movem em velocidades e planos diferentes). Podemos usar nosso querido JS.

O efeito pode ser aplicado em qualquer parte do hero, seja o background vindo em sua direção, o título movendo e sumindo, enfim, use sua criatividade. No exemplo eu vou mostrar o efeito de sumir e subir um pouco no scroll.

Vou separar bastante para todo mundo, mesmo que não saiba muito de JS, entenda bem o que aconteceu. Existem várias formas de se fazer isso, se você tem uma maneira ainda melhor e mais performática, fala nos comentários =)

```js
function scrollBanner() {
  var scrollPos
  var headerText = document.querySelector('.header-paralax h1')
  scrollPos = window.scrollY

  if (scrollPos <= 600) {
    headerText.style.transform = 'translateY(' + -scrollPos / 3 + 'px' + ')'
    headerText.style.opacity = 1 - scrollPos / 600
  }
}

window.addEventListener('scroll', scrollBanner)
```

Criamos uma função scrollBanner que vai ser a responsável pela mágica. E então criamos um `addEventListener`, que serve para ficar vigiando se houve `scroll` ou não ná página. Se houver um scroll, a função é chamada.

Depois disso, precisamos pegar o valor da posição do scroll, que pode ser capturado pelo `window.scrollY`, pois é no eixo vertical que estamos preocupados.

Para não ficar chamando a função o tempo todo, mesmo depois do header sumir, verificamos se o valor de `scrollPos` é menor que a altura do nosso header. Se for menor, nós aplicamos o `translateY` para subir um pouquinho o título e também diminuímos a `opacity`, causando o efeito desejado. Os cálculos ali acima foram feitos só para a transição ser mais suave e ajustados no olho mesmo. Queremos uma `opacity` de zero quando o scroll for total (600), então `600 - (600/600)` vai se encarregar disso. E a movimentação do título precisa ser mais devagar para dar o efeito de parallax, então divido o valor do scroll por 3.

Se você não clicou ainda, o [demo está aqui](https://labs.willianjusten.com.br/header-parallax/).

## Conclusão

Pronto pessoal, foi um post bastante simples, mas que é interessante para firmarmos algumas propriedades e conceitos importantes. Espero que tenham gostado, devo fazer mais alguns posts do gênero, ensinando a fazer pequenos detalhes/efeitos para deixar seus sites mais legais.

Queria também agradecer o carinho da galera que tem acessado os meus [cursos online](https://willianjusten.com.br/cursos/), tem sido bastante legal ver todo mundo assistindo, aprendendo, divulgando e dando dicas. Se você ainda não acessou, vai lá e se inscreva. Todo mundo que se inscreve nos meus cursos, são avisados quando lanço um novo post e também devo começar a enviar links e notícias interessantes que eu ver por aí, em forma de weekly. Não perde a chance =)
