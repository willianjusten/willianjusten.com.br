---
layout: post
title: "#16 - Criando e Exportando SVG para Web"
date: 2016-02-06 13:29:04
image: '/assets/img/svg-export/google-svg-logos.png'
description: 'Aprenda como otimizar seu SVG para ter a melhor entrega para web. Se você é designer ajude seu amigo dev.'
main-class: 'svg'
color: '#7D669E'
tags:
- svg
- css
- tutorial
categories:
- "O mundo mágico do SVG"
twitter_text: 'Aprenda como otimizar seu SVG para ter a melhor entrega para web'
introduction: 'Aprenda como otimizar seu SVG para ter a melhor entrega para web. Se você é designer ajude seu amigo dev.'
---

## Introdução

Fala pessoal, faz um tempo que não tenho postado aqui, como falei em um post anterior, estou trabalhando na [HUGE](http://hugeinc.com), tem sido bastante divertido, mas também tenho trabalhado bastante. Com isso, tive que dar uma desligada rapidinho, mas já estou de volta =D

Eu já estava para fazer um post parecido, mas alguns amigos lá da HUGE me perguntaram sobre e eu resolvi fazê-lo. Ele será fortemente baseado [num post da Sara Soueidan](https://sarasoueidan.com/blog/svg-tips-for-designers/), que faz um trabalho incrível de SVG pelo mundo afora.

## Importância da otimização

Assim como as imagens vem com várias informações desnecessárias, da qual podemos remover utilizando otimizadores como Tinypng, Imageoptim, etc, o SVG também vem com bastante informação inútil ou não otimizada. Esse peso a mais prejudica os usuários que não possuem uma banda larga boa e até mesmo o browser, que pode sofrer na renderização de alguns elementos mais complexos, que não precisavam ser.

As dicas que vou passar são direcionadas para aqueles que utilizam o Adobe Illustrator, mas que podem ser aplicadas no Sketch também sem problema algum. O motivo disso é porque o Illustrator ainda é o mais utilizado e ele também gera mais sujeira que o Sketch.

Bom, vamos parar de blabla e partir direto para o que realmente importa.

## 1 - Crie formas simples usando os elementos de forma Simples, não `<path>`

É claro que conseguimos fazer basicamente tudo com `<path>`, mas se você quer criar formas básicas, porque não utilizar as formas básicas que o SVG já provê?

Nós temos: `<line>`, `<circle>`, `<rect>`, `<ellipse>`, `<polygon>` e `<polyline>`. Esses elementos são mais fáceis de ler e dar manutenção, visto que suas propriedades são bem descritivas.

As formas básicas vem com um conjunto de atributos que permitem manipular posição (`x`, `y`, `cx`, `cy`) assim como suas dimensões de largura e altura.

Segue um exemplo da diferença entre a criação de um círculo via forma básica e via path:

```html
<circle fill="#FFFFFF"
        stroke="#000"
        cx="28.1"
        cy="28.1"
        r="27.6"/>

<!-- versus -->

<path fill="#FFFFFF"
      stroke="#000"
      d="M55.7,28.1
         c0,15.2-12.4,27.6-27.6,27.6
         S0.5,43.3,0.5,28.1
         S12.9,0.5,28.1,0.5
         S55.7,12.9,55.7,28.1z"/>
```

Um exemplo bem bacana sobre a importância da otimização e o quão impactante é. A Google não faz muito tempo, refez sua logo se baseando em SVG e no quanto podia otimizar/economizar com isso.

A logo inicial, possuía vários pontos e detalhes:

![Logo antiga do Google](https://i.kinja-img.com/gawker-media/image/upload/s--zmSvRcRR--/c_scale,fl_progressive,q_80,w_800/1416113051534017317.png)

Para melhor performance, a Google resolveu trabalhar com formas básicas, diminuindo e muito o uso de pontos e paths.

![Nova Logo do Google](https://i.kinja-img.com/gawker-media/image/upload/s--IcQEd58x--/c_scale,fl_progressive,q_80,w_800/1416113051641962533.png)

## 2 - Converta textos para Outlines... Ou não...

Para converter textos para outlines:

- Selecione o texto que você quer converter
- Escolha **Type > Create Outlines**

![Exemplo convertendo texto para outlines](https://sarasoueidan.com/images/convert-to-outlines.png)

### Prós:

* Textos convertidos para outlines vão preservar a font-face utilizada, sem precisar de uma web font para isso. Isso significa que você pode salvar algumas requisições HTTP e também não vai correr o risco da fonte ser renderizada diferente.
* Outlines são boas para casos de logos em que a forma e fonte precisam ser preservadas.

### Contras:

- Textos convertidos para outlines não são mais texto real. Eles são somente `<path>` que formam o contorno do texto. Consequemente, o texto passa a ser inacessível, não indexável e não selecionável. No caso do uso de logos que são outline, use um `alt text` se a logo for adicionada como `<img>` ou elementos de acessibilidade do SVG como `<title>` para prover textos alternativos para os leitores de tela.

A Sara recomenda e eu também, a leitura sobre como fazer o SVG mais acessível, nesses dois artigos:

* [Tips for creating Acessible SVG](http://www.sitepoint.com/tips-accessible-svg/)
* [Using Aria to Enhance SVG Acessibility](https://www.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/)


Outro contra é que se você converter textos para outlines, pode acabar aumentando bastante o tamanho do arquivo SVG, dependendo da complexidade da fonte, com esse aumento de código, você também pode acabar afetando a leitura do código gerado. Segue um exemplo do texto convertido e o outro não:

![Exemplo de texto convertido e não convertido](https://sarasoueidan.com/images/text-output.jpg)

## 3 - Simplifique seus Paths

Um path é um conjunto de pontos que são definidos por um conjunto de coordenadas. Quanto menor o número de pontos, menor é o código gerado no atributo `d` do path e, consequentemente, menor é o tamanho do arquivo final. É sempre ter arquivos pequenos para melhorar a performance como um todo.

Para simplificar um path:

- Selecione o path
- Vá em **Object > Path > Simplify**
- Modifique as precisões, ângulos e etc.

**Obs.:** lembre de deixar o preview ativado para você ver se o Path não está sendo muito alterado, as vezes você pode destruir seu path se diminuir muito a precisão.

![Paths sendo simplificados](https://sarasoueidan.com/images/simplify-paths.png)

![Opções para simplificar os Paths](https://sarasoueidan.com/images/path-points.png)

Tem um video tutorial criado pela Adobe para explicar esse processo, se você gosta mais de vídeos, dê [uma olhada lá](http://tv.adobe.com/watch/companion-videos-for-inspire/svg-for-the-web-using-the-simplify-panel-in-illustrator-cc/).

Você também pode simplificar os paths usando a `Warp Tool`. Tem um [artigo na Smashing Magazine](http://www.smashingmagazine.com/2011/07/examples-and-tips-for-using-illustrator-s-warp-tools/) explicando mais sobre o uso dessa ferramenta.

## 4 - Evite juntar Paths a menos que você não precise controlá-los individualmente

Muitos designers estão acostumados a juntar os paths sempre que possível, isso pode ser bom ou ruim. Por quê? Bom, quando você junta todos os paths, o desenvolvedor acaba perdendo a possibilidade de controlar diferentes partes do objeto, ficando impossível de realizar certas animações.

Portanto, se você quiser animar algum elemento do SVG ou até mesmo pintar de diferentes cores, por favor, não junte os paths. Se é só um ícone e você tem certeza que não haverá nenhuma manipulação, então faça o merge sem problemas.

Para juntar paths:

- Selecione os paths que deseja juntar
- Vá até **Window > Pathfinder**
- Clique na opção de **merge**, terceira opção de baixo para cima da esquerda para direita. Assim como mostrada no screenshot abaixo:

![Merge Paths](https://sarasoueidan.com/images/merge-paths.png)

## 5 - Crie filtros usando SVG filters, não filtros de Photoshop

Se você utilizar filtros do Photoshop, ao abrir no Illustrator ele irá transformar esses efeitos em imagens rasterizadas, o que não desejamos. O SVG possui filtros incríveis que fazem basicamente a mesma coisa, porém de forma mais leve e através de código.

Para gerar efeitos via SVG:

- Vá em **Efects > SVG Filters**
- Escolha e use um dos filtros disponíveis no painel.

![Usando filtros SVG](https://sarasoueidan.com/images/svg-filters-in-ai.png)

## 6 - Encaixe a artboard ao desenho

**Se você é designer, peloamordedeus faça isso!** Você desenvolvedor já pegou um ícone SVG, foi colocar num lugar e reparou que ele não ficou do tamanho desejado, contendo uns espaços brancos? Na maioria dos casos, isso acontece pois ao exportar o SVG, o designer deixou espaços brancos dentro da [Viewport](https://sarasoueidan.com/blog/svg-coordinate-systems).

Para que isso não aconteça, você precisa garantir que a artboard tem as mesmas dimensões da imagem/vierport, não salvando espaços em branco inúteis.

Para encaixar a artboard ao desenho:

- Selecione toda a arte
- Vá em **Object > Artboards** e escolha a opção **Fit to Artwork Bounds**

## 7 - Use bons nomes, grupos e convencões nas camadas

Sabemos que isso é uma coisa idiota, mas é importante de se falar, por algumas razões:

- **Os ids e classes que você usa no editor gráfico vão ser passados para o código gerado.** Quanto mais semântico e explicativos são seus nomes, menos confusão e ruído gerado com o seu desenvolvedor. Não precisa ser neurótico e querer os nomes perfeitos. Mas, por exemplo, se você estiver desenhando um carro, crie um id para grupo ou layer das rodas, quanto mais fácil de lermos esse código gerado, melhor para a manutenção.
- **Use camadas(layers) para agrupar elementos relacionados.** Camadas são traduzidas em grupos no código, o que auxilia a identificação. Crie grupos/camadas principalmente se você deseja animá-los como um todo. Muito tempo gasto do desenvolvedor é organizando e reagrupando elementos, se você como designer já fizer isso, vai ajudar muito no processo.

## 8 - Escolhas as melhores opções de exportar para web

Em Novembro de 2015 o Illustrator CC foi atualizado, ganhando um novo workflow para exportar SVG, que permite algumas opções como exportar objetos individuais ou um artboard inteiro. Vale dar uma conferida [nesse artigo](https://helpx.adobe.com/illustrator/how-to/export-svg.html).

Se você não tem essa versão, não tem problema, segue como pode ser feito com versões mais antigas:

- Escolha **File > Save As**

![Save as](https://sarasoueidan.com/images/file-save.png)

- Na parte inferior, onde ficam os formatos, escolha **SVG**

![Save as SVG](https://sarasoueidan.com/images/save-as.png)

- Clique em Salvar

Quando você clicar em salvar, uma outra janela irá abrir contendo um conjunto de opções:

![Opções para salvar SVG](https://sarasoueidan.com/images/export-options.png)

As opções mostrada acima são as mais recomendadas para se salvar um SVG para web.

A opção de `Image Location` especifica se qualquer imagem rasterizada será inserida inline no seu SVG ou como um link externo dentro do SVG. Isto vai depender do que você precisa/usa. Eu não aconselho que tenha nada rasterizado em seu SVG, isso aumenta muito o peso, além de em 99% das vezes ser desnecessário. Se tiver algo rasterizado, verifique se não pode ser feito de outra maneira, dentro do próprio SVG.

A opção de `CSS Properties` é uma das mais importantes para a parte de desenvolvimento. Se você escolhe para que fique numa `<style>` tag, pode correr o risco de outros SVG's possuírem uma mesma classe e isso acabar quebrando outros elementos de tela, tenha em mente que você definiu todos os elementos com prefixos específicos e bem separados. Se você escolher `presentation attributes`, tudo já estará no elemento e vai facilitar a vida do desenvolvedor.

Quanto menor o número de casas decimais (`Decimal Places`), menor será o tamanho do SVG. Uma casa decimal já é o suficiente na maioria das vezes.

Uma outra opção muito importante é **Use Artboards**, se você tem o costume de criar várias artboards para seus ícones, vai gostar dessa opção. Ela irá gerar múltiplos arquivos SVG, um para cada artboard.

![Use artboards](https://sarasoueidan.com/images/use-artboards.png)

Por exemplo, se você for criar um Sprite de SVG para um sistema de ícones, existem várias formas de se criar e usar sprites, e para cada técnica se tem uma abordagem diferente: uma técnica requer que os ícones estejam separados, a outra requer que todos os ícones estejam em um só arquivo.

Você pode ler mais sobre essas técnicas:

- [An Overview of SVG Sprite Creation Techniques](https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/)
- [Usando SVG Sprites](https://willianjusten.com.br/usando-svg-sprites/)
- [Sistema de ícones em SVG](https://willianjusten.com.br/sistemas-de-icones-em-svg/)

## Otimizar ou não otimizar...

É recomendável, que após criar as imagens, mesmo que já melhor exportadas, utilizemos ferramentas para otimizar ainda mais. A Sara recomenda o uso do [SVGO](https://github.com/svg/svgo), que de fato é uma excelente ferramenta. Se você quiser uma ferramenta visual para otimizar, eu aconselho muito o [SVGOMG](https://jakearchibald.github.io/svgomg/), que tem várias opções, além de um preview para ver a otimização.

Enquanto estive no Globoesporte, também precisei criar sprites contendo todos os escudos dos times, além de fazer várias otimizações e com isso criei dois projetinhos separados para esse tipo de otimização:

- [SVG Gulp Optimizer](https://github.com/willianjusten/svg-gulp-optimizer)
- [SVG Grunt Optimizer](https://github.com/willianjusten/svg-grunt-optimizer)

São projetinhos bem simples, que fazem otimização, criam os arquivos "bundle" contendo todas imagens em um só arquivo e geram fallback para browsers que não suportem sprite SVG. Aceito sugestões de melhorias, até porque não tenho tido muito tempo para atualizá-los.

## 9 - Se comunique, se comunique cedo.

Possivelmente a dica mais importante é que você se comunique, e faça isso cedo, durante o processo de design ainda.

Quase todas as dicas acima requerem um pouco de conhecimento da fase de desenvolvimento e o que o desenvolvedor pretende fazer para adicionar o SVG na página, animar e criar os scripts necessários. Portanto, a não ser que você seja a mesma pessoa que vai tomar as decisões em todas as fases e a menos que você queira perder uma grande parte do tempo editando e modificando o SVG o tempo todo, você precisa ter certeza do que o desenvolvedor precisa para entregar o SVG na melhor abordagem possível. Se o projeto que você está trabalhando possui uma deadline, provavelmente você não pode perder uma grande parte do tempo fazendo mudanças e revisões dos assets, que você pode evitar se comunicando rápido.

Designers e desenvolvedores podem ser melhores amigos. A natureza do SVG requer tanto a fase de design como a de desenvolvimento e que uma esteja aberta a outra, sendo assim, requer que os designers e desenvolvedores se comuniquem, antes do processo de design começar e durante todo o processo também.

## Conclusão

Bom galera, espero que esse artigo tenha ajudado a vocês. Que no futuro vocês usam os SVG's mais otimizados do mundo e façam projetos maravilhosos, sempre com uma boa comunicação entre designers e desenvolvedores. Deixo também um obrigado a [Sara Soueidan](https://twitter.com/SaraSoueidan), que é uma grande evangelizadora de SVG e que sempre traz um conteúdo excelente para nossa área.
