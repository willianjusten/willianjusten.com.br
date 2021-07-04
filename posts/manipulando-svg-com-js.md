---
layout: post
title: '#14 - Manipulando SVG com JS'
date: 2015-09-11 21:14:39
image: '/assets/img/manipulando-svg-com-js/main.png'
description: 'Veja como manipular SVG com JS e algumas libs para brincar.'
main-class: 'svg'
color: '#7D669E'
tags:
  - svg
  - js
  - tutorial
categories:
  - 'O mundo mágico do SVG'
twitter_text: 'Veja como manipular SVG com JS e algumas libs para brincar.'
introduction: 'Veja como manipular SVG com JS e algumas libs para brincar.'
---

## Introdução

Caramba! Fazia tempo que eu não escrevia hein! Como estou subindo a serrinha para Petrópolis, resolvi aproveitar esse tempo e escrever um pouco. E advinha sobre o quê? Sim, sobre SVG!

Como de costume, estou ouvindo meu lindo Spotify e apaixonado com a lista de músicas dessa semana que prepararam para mim naquela playlist "Descobertas da Semana", dentre as bandas estão: Mumford & Sons, RAC, Warpaint, The Kooks, etc.

Esse post será bem simples e introdutório, até mesmo porque se fosse sobre tudo, esse seria o maior post da história, visto que existem dezenas de bibliotecas JS para manipular SVG. O objetivo é mostrar como funciona, o que existe por aí e te fazer querer brincar além disso.

## Em que momentos devo usar JS?

Como já dito em [posts anteriores](https://willianjusten.com.br/series/), tem como animar SVG com CSS e também com SMIL, então precisamos saber uns motivos para ter mais essa opção né? E elas são:

- Se você estiver trabalhando com dados via JSON (em geral gráficos).
- Quando precisa de alguma lógica mais complexa por trás de acordo com certas condições do contexto.
- Quando precisa de uma grande compatibilidade, inclusive com IE velho.
- Para animações mais complexas, com muitos passos e manipulação em diversos elementos.

## O que eu posso fazer com JS?

Bom...**TUDO!!** Sim, isso mesmo que você leu. Com JS nós podemos criar um SVG sem auxílio de uma ferramenta de edição <s>chupa Illustrator</s>. Podemos estilizar e também animar.

## SVG e o DOM

### Seleção e Manipulação de estilos

Como já sabemos, o SVG quando incorporado numa página de html5, se comporta como se fossem tags novas e, com isso, ele como um todo passa a ser reconhecido no DOM, permitindo sua manipulação.

Vamos considerar o seguinte SVG:

```html
<svg id="icone-lindao">
  <path id="curva" d="..." />
  <path id="outra-curva" d="..." />
</svg>
```

Através do javascript podemos fazer o seguinte:

```js
var icone = document.getElementById('icone-lindao')
var curva = document.getElementById('curva')
var outraCurva = document.getElementById('outra-curva')
```

Com isso, já teríamos todos os elementos selecionados, para ter certeza que selecionou mesmo o elemento, basta imprimir no console.

```js
console.log(icone)
console.log(curva)
console.log(outraCurva)
```

Sabendo disso, podemos aproveitar do nosso lindo javascript e manipular esse elemento como se ele fosse um outro qualquer do meu documento. Para estilizar, podemos usar o `elemento.style` e brincar com suas propriedades. Um exemplo seria mudar a cor do preenchimento (fill) do componente.

```js
curva.style.fill = '#FAFAFA'
```

Além de adicionar estilos diretos, podemos adicionar uma classe/id ao elemento e deixar os estilos a cargo do próprio CSS. Para adicionar classes via JS, você pode usar de várias formas, aqui estou usando o `classList`, que acho bem fácil.

```html
<style type="text/css">
  .vermelhinho {
    fill: red;
  }
</style>

<script type="text/javascript">
  curva.classList.add('vermelhinho')
</script>
```

Segue um exemplo fazendo algumas interações com um SVG:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="NGGoQW" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/NGGoQW">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Criação e Manipulação de propriedades do SVG

Sim, nós podemos criar SVG direto com JS e manipular essas propriedades! Para criar um elemento SVG, precisamos entender alguns métodos importantes e suas informações.

Como dito no [post de estrutura](https://willianjusten.com.br/a-estrutura-do-svg/), o SVG possui um Namespace que o define como um XML do tipo SVG, este é:
`http://www.w3.org/2000/svg`.

E para criar elementos SVG, utilizamos o [createElementNS](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElementNS). A sintaxe é bastante simples:

```js
var element = document.createElementNS(namespaceURI, qualifiedName)
```

Onde `namespaceURI` é o namespace do nosso SVG e o `qualifiedName` é o nome do elemento, por exemplo, se queremos criar um elemento `SVG` iremos usar esse nome, caso queiramos um círculo, vamos usar `circle`.

Após criado o elemento, precisamos definir atributos para o mesmo e para isso usamos o [setAtributeNS](https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttributeNS). Que tem a seguinte sintaxe:

```js
element.setAttributeNS(namespace, name, value)
```

O `namespace` aqui permanece o mesmo padrão para SVG. O `name` é o atributo que você quer definir, o raio de um círculo seria o `r`, por exemplo. E `value` é claro, é o valor dessa propriedade.

Abaixo segue um exemplo de como criar um círculo usando esses simples métodos:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GppemV" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/GppemV">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Você consegue deixar algo mais interativo, editando alguma propriedade usando slides, eventos de botões, etc. Segue um exemplo movimentando um elemento num grid:

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="meeoPg" data-user="willianjusten" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/willianjusten/pen/meeoPg">
  </a> by Willian Justen de Vasconcellos (<a href="https://codepen.io/willianjusten">@willianjusten</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Bibliotecas de Manipulação

Apesar de ser bem simples de fazer as manipulações com JS puro, pode se tornar muito trabalhoso quando precisamos trabalhar com muitos elementos e animações mais trabalhosas. Para facilitar isso, é claro que nasceram várias bibliotecas. Algumas bem específicas para SVG e outras bem genéricas.

Vou listar aqui algumas bibliotecas bem bacanas e suas principais vantagens:

### Snap.svg

Talvez uma das mais famosas bibliotecas de SVG que tem, criada pelo [Dmitry Baranovski](https://twitter.com/DmitryBaranovsk) e mantida pela Adobe, é uma biblioteca que permite manipulação completa do SVG, desde a criação, estilização e animações complexas. Perfeita para quem quer trabalhar com ilustrações e não tem preocupação com suporte a I8 e abaixo.

[Link do Snap.svg](http://snapsvg.io/)

### RaphaelJS

Uma das mais antigas libs de SVG que tem, também criada pelo Dmistry, tem como premissa funcionar em navegadores muito velhos, inclusive o IE6. Possui uma API bastante simples de trabalhar e permite também criar, animar e estilizar o SVG.

[Link do RaphaelJS](https://github.com/DmitryBaranovskiy/raphael)

### D3

É uma biblioteca para manipular documentos baseados em data. Perfeito para criação de gráficos, desde os simples até os mais trabalhados. Possui uma enorme gama de plugins, exemplos e uma ótima documentação. Para quem deseja trabalhar mais a sério com dados e SVG, essa é a lib mais indicada.

[Link do D3](http://d3js.org/)

### SVG.JS

Uma biblioteca bastante leve que permite também bastante coisa com SVG, como criação de novos elementos, estilizações e animações. Indicada para quem não quer carregar uma lib muito grande para fazer coisas um pouco mais simples.

[Link da SVG.JS](http://svgjs.com/)

### Bonsai JS

Outra biblioteca bem leve, mas que permite bastante coisa. Tem uma API bem simples e interativa, podendo criar até joguinhos simples com ela.

[Link da BonsaiJS](http://bonsaijs.org/)

### Greensock GSAP

Essa não é uma biblioteca específica de SVG, mas ela é incrível com qualquer coisa e merecia estar aqui em destaque. Essa lib tem uma das melhores APIs para animação na web. Possuindo ótima documentação e bons exemplos, aconselho muito.

[Link do GSAP](http://greensock.com/gsap)

## Conclusão

Bom galera, eu mostrei aqui o básico de como brincar com o SVG e JS e algumas bibliotecas, agora é você partir para começar a brincadeira. Quem fizer exemplos legais, manda aí nos comentários, adoro ver coisinhas feitas com SVG <3
