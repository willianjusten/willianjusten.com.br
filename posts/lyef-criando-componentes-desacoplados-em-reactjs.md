---
layout: post
title: "Lyef - Criando componentes desacoplados em ReactJS"
date: 2017-08-19 15:31:42
image: '/assets/img/lyef-1/main.png'
description: "Um boilerplate para criar componentes reutilizáveis e desacoplados em ReactJS"
main-class: 'js'
color: '#D6BA32'
tags:
- react
- js
categories:
- "Aprendendo ReactJS"
twitter_text: "Um boilerplate para criar componentes reutilizáveis e desacoplados em ReactJS"
introduction: "Um boilerplate para criar componentes reutilizáveis e desacoplados em ReactJS"
---

## Introdução

Fala pessoal, eu sou um cara que curte bastante dados e vejo bastante o meu analytics e uma coisa que sempre reparei foi como meus posts sobre React sempre possuem muitos acessos. Inclusive em muitas buscas, se você colocar `aprender React` no Google, alguns posts meus aparecem bem rankeados. Pensando nisso, resolvi que vou voltar a escrever mais sobre React, já que tem bastante procura e eu tenho uma coisa ou outra para poder compartilhar.

Nesse post, eu decidi falar um pouco sobre a [Lyef](https://github.com/lyef/) que é uma organização que eu acabei criando para abrigar uma ideizinha de um projeto de React que eu fiz ano passado. Depois meus amigos [Jonas Mendes](http://github.com/nipher) e [Guilherme Louro](https://github.com/guilouro) também participaram com várias coisinhas lá.

Lembrando que as escolhas para esse projeto são bastante pessoais e não necessariamente são as melhores/piores escolhas. Elas foram feitas baseadas num projeto que eu estava trabalhando e abaixo eu vou explicar o porquê de tudo.

Enquanto escrevo o post, vou ouvindo uma banda indie bem legal chamada [Silversun Pickups](https://open.spotify.com/artist/6qyi8X6MdP1lu6B1K6yh3h).

## Por que do nome Lyef?

Essa é uma das perguntas que meus amigos sempre fazem quando eu falo da `Lyef` e bom, não tem bem uma resposta para isso. Eu estava com o [Jonas](http://github.com/nipher) falando sobre a ideia e mostrando o que eu tinha feito e aí pensamos que precisava ter um nome. Ficamos buscando uns nomes celtas, islandeses, nórdicos porque curtimos essas paradas, mas nada era legal ou então já estava sendo usado. Depois de algumas ideias, acabamos caindo na ideia de `Leaf`, folha em inglês. Mas aí para dar uma diferenciada, resolvemos colocar assim, `Lyef`, mas lê-se `Líf`.

## Por que desse projeto?

Na época eu estava iniciando um freela para uma empresa grande, e a empresa queria basicamente o seguinte:

- Criar vários produtos que eram muito similares entre si.
- Iniciar a estrutura do projeto e treinar as pessoas, para eles depois seguirem sozinhos.
- Permitir que as pessoas trabalhassem de forma independente, tanto os freelas como os devs da empresa. Sem que um bloqueasse o outro.
- Queriam utilizar React ou Meteor ou qualquer tecnologia nova para evitar ficarem desatualizados rápidos.

Pensando nisso, a primeira coisa que obviamente veio a cabeça foi usar `React` e trabalhar com vários componentes separados, assim poderíamos plugar nos diferentes produtos, já que muita coisa seria reutilizada. Outra coisa é que trabalhando com componentes, seriam pequenas partes e cada um poderia ficar encarregado de um componente, assim ninguém travava ninguém.

Mas aí entrava um detalhe, os componentes seriam completamente separados, ou seja, não seria uma App grande com os componentes separados lá dentro. Seriam vários componentes e cada um teria o seu repositório e seria instalado com um `npm install componente`. E como testar esses componentes se não teria um App agregando tudo? Como mostrar o funcionamento do componente sem precisar ficar instalando/desinstalando coisas?

E se vão ser tão separados e cada pessoa vai fazer um componente, como garantir que tudo siga um mesmo padrão, não correndo o risco de cada um ficar de um jeito diferente e confundir na hora de dar manutenção?

Pensando em todos esses detalhes, eu resolvi criar a Lyef, que é um boilerplate (estrutura, organização, use seu nome favorito) bem simples, onde eu consigo definir várias coisas importantes e o mais importante, consigo testar e rodar os componentes em ambientes completamente isolados sem problema nenhum.

## Definindo padrões

Como dito acima, eu precisava primeiro de tudo, fazer algumas coisas para poder manter a qualidade e padrão em todos os componentes que seriam criados. Para isso, eu comecei com as coisas básicas, primeiro de tudo foi colocar o [.editorconfig](https://github.com/lyef/lyef-react-component/blob/master/.editorconfig), assim eu garantia que todos iriam usar o mesmo tipo de indentação, tamanho, assim como garantir que os arquivos teriam uma linha branca no final, que os whitespaces seriam removidos e etc.

Depois vinha outra coisa bastante importante, que era garantir um Styleguide para o código, para que todos seguissem as mesmas regras para usar métodos, definir variáveis e várias outras boas práticas/padrões. Para isso, eu escolhi o [Styleguide da Airbnb](https://github.com/airbnb/javascript/tree/master/react), que é um ótimo Styleguide e é muito bem organizado. Assim eu não precisava reinventar a roda e todos teriam acesso as regras de forma fácil.

Para implementar o Styleguide, eu utilizei o [Eslint](https://eslint.org/), que agora já é bem conhecido de todos e permite fazer essa verificação das regras, que são definidas no arquivo [.eslintrc](https://github.com/lyef/lyef-react-component/blob/master/.eslintrc).

Para rodar o linter separadamente eu tinha os seguintes comandos:

```bash
$ npm run lint # verificar todos os arquivos por erros
$ npm run lint:fix # verificar e corrigir os erros possíveis automaticamente
```

E o pulo do gato final foi o seguinte: "Ok, os padrões vão estar todos lá escritos, mas o que me garante que vão seguir?". Para ter certeza que todos iriam seguir os padrões definidos eu utilizei o [Husky](https://github.com/typicode/husky) que trabalha com [Git Hooks](https://willianjusten.com.br/trabalhando-com-git-hooks-de-forma-facil/), ou seja, antes de qualquer push, eu rodava o eslint e se algo estivesse errado, a pessoa não conseguia subir o código. De início isso causou um pouquinho de chateação, mas depois foi visto como isso ajudava a ter um código correto e foi bem recebido.

## Testes são importantes!

Eu acredito que uma aplicação se começa pelos testes e que uma aplicação sem testes é fadada a dar enormes dores de cabeça no futuro. Pensando nisso, a segunda parte relacionada a padrões e boa qualidade foi criar um sistema de testes que fosse fácil de rodar e fácil de trabalhar. Porque também não adianta você querer que as pessoas escrevam testes se for um "pé no saco" toda vez. Para isso eu utilizei ferramentas já mais conhecidas, ao invés de usar o Jest, que na época estava melhorando, mas ainda era bem desconhecida e com coisas chatas.

Usei a dobradinha [Mocha](https://github.com/mochajs/mocha) e [ChaiJS](https://github.com/chaijs/chai), que são bem conhecidos e funcionam super bem. O Mocha serviria para criar meu ambiente de testes e rodar. Enquanto com o ChaiJS, eu poderia ter o poder do `expect` para poder escrever meus testes.

Mas como estávamos trabalhando com React, outra incrível ferramenta veio para ajudar (e muito!), que é o [Enzyme](https://github.com/airbnb/enzyme) da galera do Airbnb. Com o Enzyme ficava fácil de simular eventos, montar componentes, buscar por elementos dentro desses componentes e muito mais.

E também se unindo ao time, eu precisava de algo que pudesse simular o DOM para mim, assim eu poderia rodar meus testes, sem precisar levantar um PhantomJS, que seria extremamente pesado e chato para ficar testando. Com isso a escolha foi o levíssimo [JSDOM](https://github.com/tmpvar/jsdom), que é uma implementação super pequena do DOM para rodar em ambiente Node.

E só para também fechar a parte de testes, eu adicionei o [Nyc/Istambul](https://github.com/istanbuljs/nyc), que fica responsável por fazer o teste de cobertura e caso os valores estivessem abaixo do determinado, a pessoa também não poderia subir o código, até que ela cobrisse corretamente os trechos de código não testados.

Para rodar os testes, existiam os seguintes comandos:

```bash
$ npm test # rodava os testes em single-run mode, ou seja, só uma vez
$ npm run test:tdd # rodava os testes e ficava assistindo atrás de mudanças
$ npm run test:coverage # rodava os testes e gerava os relatórios de cobertura
```

![Imagem dos testes rodando](https://github.com/lyef/lyef-react-component/raw/master/images/tests.gif)

## Criando um ambiente isolado

E a parte mais importante do projeto em si estava aqui. Como fazer para ter um ambiente isolado para esses componentes? Na época já tinha visto um projeto da Scup que era o [Atellier](http://scup.github.io/atellier/), mas não era bem isso que eu queria. Foi então que eu encontrei o [Storybook](https://storybook.js.org/) e foi paixão a primeira vista! Ele me permitia não só ter meus componentes isolados, como me dava todo um ambiente para desenvolvimento com direito a live reloading e criação de histórias, que é uma metodologia ótima para criar componentes.

Na época o Storybook tinha acabado de ganhar a versão 1.0 e eu precisava fazer algumas edições no `webpack` deles para funcionar como eu queria, mas isso não era nada em frente a todas as vantagens que a ferramenta me trazia.

Através do Storybook, eu consigo fazer coisas como na imagem abaixo:

![Imagem da Interface do Storybook](https://github.com/lyef/lyef-react-component/raw/master/images/storybook-example.gif)

Ou seja, não só criar meu componente, mas mostrá-lo em diferentes situações com diferentes tipos de dados. Isso respondia a tudo que eu precisava para responder as demandas da empresa. E foi assim que eu criei a primeira versão do boilerplate, que com tempo foi se atualizando e hoje já utiliza o Storybook 3 e você pode ver [o repositórido o lyef-react-component aqui](https://github.com/lyef/lyef-react-component).

## Botando isso na prática

Depois de ter então essa estrutura e todos os padrões definidos, bastava que nós criássemos nossos componentes. E o flow funcionava da seguinte forma.

- Criar um repositório do Componente.
- Criar as coisas necessárias daquele Componente.
- Para cada atualização, utilizar o [Semver](https://willianjusten.com.br/semantic-version/) para versionar corretamente aquele componente.
- Esse componente ficava disponível então no Github Privado com suas tags definidas

Repare que o processo acima poderia ser feito por várias pessoas para diferentes componentes, sem que um atrapalhasse o outro, isso ajudava demais. Depois da criação dos componentes, também tinha obviamente os produtos, que trabalhavam com Redux, usando também um boilerplate criado pela Lyef, que é o [Lyef Redux Boilerplate](https://github.com/lyef/lyef-redux-boilerplate), que também será explicado num post futuro. O que era feito é ter esses produtos e neles, nós instalávemos só os componentes que desejávamos e nas versões desejados. Seguindo o exemplo da imagem abaixo:

![Imagem mostrando 3 produtos independentes usando diferentes componentes](/assets/img/lyef-1/grafico.png)

## Conclusão

Bom galera, esse é um dos primeiros posts que pretendo fazer sobre a Lyef e React. Nele eu preferi fazer uma introdução do que é o projeto e os motivos por trás dele, que basicamente foi um estudo de caso de um freela passado que eu fiz. Espero que tenham curtido e comentários são mais do que bem vindos! Nos próximos posts pretendo mostrar como criar componentes do zero utilizando o Boilerplate e depois falar um pouco Redux e o boilerplate da app.
