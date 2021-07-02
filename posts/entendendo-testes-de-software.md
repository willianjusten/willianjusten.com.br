---
layout: post
date: 2015-12-12T13:49:42.000Z
image: /assets/img/testes/visao-programador.png
title: Entendendo Testes de Software
description: >-
  Para que servem os testes? O que eu ganho com eles? Que tipos de testes
  existem? O que fazer e o que não fazer.
introduction: >-
  Para que servem os testes? O que eu ganho com eles? Que tipos de testes
  existem? O que fazer e o que não fazer. Algumas dúvidas importantes para
  começarmos a brincar nesse mundo dos testes e TDD.
twitter_text: >-
  Para que servem os testes? O que eu ganho com eles? O que fazer e o que não
  fazer?
main-class: dev
color: '#637a91'
tags:
  - tdd
  - dev
---
## Índice

* [Introdução](#intro)
* [Qualidade de Software](#qualidade)
  * [Qualidade para o Cliente](#qualidade-cliente)
  * [Qualidade para o Chefe](#qualidade-chefe)
  * [Qualidade para o Desenvolvedor](#qualidade-dev)
* [Test Driven Development (TDD)](#tdd)
* [Ciclo de desenvolvimento com TDD](#ciclo)
* [Por que poucos fazem TDD?](#poucos)
* [O que ganho com TDD?](#ganho)
* [Tipos de testes](#tipos)
  * [Teste Unitário (Unit Test)](#unit)
  * [Teste de Sanidade (Smoke Test)](#smoke)
  * [Teste de Integração (Integration Test)](#integracao)
  * [Teste de Aceitação (Acceptance Test)](#aceitacao)
* [Mocks](#mocks)
* [Dicas para se fazer melhores testes](#dicas)
* [Ferramentas para testar](#ferramentas)
  * [JS](#tool-js)
  * [Python](#tool-python)
  * [Ruby](#tool-ruby)
* [Conclusão](#conclusao)

<h2 id="intro">Introdução</h2>

Fala pessoal, esse talvez seja um dos posts que mais quis escrever e mais demorei também. Muito pelo fato de que eu não conseguia definir uma linha de pensamento de como escrever. Eu decidi que irei falar as teorias primeiro, que eu considero muito importante <s>por mais que ninguém goste</s> e então farei a prática.

Enquanto eu vou escrevendo, vou ouvindo [Ghost B.C.](https://open.spotify.com/artist/1Qp56T7n950O3EGMsSl81D), uma banda bastante controversa, mas que passei a curtir bastante.

Pega lá um cafézinho e vem comigo, sei que você não gosta de teoria, mas é importante saber umas coisinhas.

<h2 id="qualidade">Qualidade de Software</h2>

Antes mesmo de começar a falar sobre Testes, precisamos voltar um pouco e falar sobre Qualidade de Software. A nossa preocupação por ter um sistema de qualidade, que nos fez pensar em métodos para garantir isso e daí nasceram os testes! =D

Esse ano eu tive a oportunidade de palestrar na Imasters DeveloperWeek 2015 - RJ e falei sobre Qualidade de Software, você pode ver os [slides aqui](https://willianjusten.github.io/imasters-2015/#/). E como a palavra _qualidade_ é um termo vago e que possuem diferentes pontos de vista, eu resolvi mostrar algumas dessas visões.

<h3 id="qualidade-cliente">Qualidade para o cliente</h3>

Para um cliente, ele quer que tudo esteja funcionando, que seja bonito e o principal, que ele não gaste muito com isso. O medidor de qualidade para o cliente é quando ele faz uma cara mais ou menos assim:

![Foto de um cara sorrindo](https://willianjusten.github.io/imasters-2015/img/visao-cliente.gif)

<h3 id="qualidade-chefe">Qualidade para o chefe</h3>

Já para o seu chefe/empresa, qualidade é quando você faz as coisas sem demorar muito ou ter que refazer. Quando ele consegue gerar lucros e o cliente está feliz. Uma imagem que demonstra muito bem o que importa (qualidade) para o seu chefe é:

![Um homem deitado no dinheiro](https://willianjusten.github.io/imasters-2015/img/visao-chefe.gif)

<h3 id="qualidade-dev">Qualidade para o desenvolvedor</h3>

Nós desenvolvedores, obviamente vamos ver qualidade aonde? Se você respondeu no código, ponto para você! Quanto mais fácil de ler e entender o código, mais qualidade ele tem para nós. Assim como você ter uma boa documentação. Segue abaixo uma imagem que descreve bastante nossas reações a códigos bons e ruins:

![Uma imagem com duas portas e pessoas discutindo, uma tem várias reclamações pelo código ruim, a outra tem poucas, pois o código é bom.](https://willianjusten.github.io/imasters-2015/img/visao-programador.png)

Pensando num código legível, documentação e agilidade, que nasceu o TDD, trazido pelo Kent Beck, na época da ascenção do Método Ágil.

<h2 id="tdd">Test Driven Development (TDD)</h2>

TDD é o desenvolvimento de software orientado a testes, Test Driven Development em inglês. Porém mais do que simplesmente testar seu código, TDD é uma filosofia, uma cultura. E foi fortemente adotado e influenciado pelo movimento ágil.

De acordo com Kent Beck, um método ágil é comparável ao ato de dirigir um
carro: você deve observar a estrada e fazer correções contínuas para se manter no caminho. Neste contexto onde a agilidade é fundamental, o testador seria aquele que ajuda o motorista a chegar com segurança ao seu destino, impedindo que sejam feitas conversões incorretas durante o percurso, evitando que o motorista se perca e fazendo com que ele pare e peça instruções quando necessário.

Neste ambiente, destaca-se o TDD, como sendo uma abordagem evolutiva na qual o desenvolvedor escreve o teste antes de escrever o código funcional necessário para satisfazer aquele teste.

<h2 id="ciclo">Ciclo de desenvolvimento com TDD</h2>

![Flow de Desenvolvimento com TDD](https://willianjusten.github.io/imasters-2015/img/tdd_flow.gif)

Todos que já viram pelo menos um pouco sobre TDD devem ter visto essa imagem. Ela é basicamente a estrutura do funcionamento da cultura do TDD. Possuindo 3 grandes passos:

* `Red`: etapa inicial do TDD, onde você escreve um teste que falha, para alguma funcionalidade que você ainda vai escrever.
* `Green`: já com o teste criado, é o momento que você precisa fazer o teste passar, lembrando sempre de ir para solução mais simples primeiro.
* `Refactor`: etapa para eliminar códigos redundantes, remover acoplamentos e deixar o design de código mais legível.

<h2 id="poucos">Por que poucos fazem TDD?</h2>

Existem alguns pontos principais que os desenvolvedores falam, quando tentam justificar porque não fazem TDD:

* `Perda de tempo`: os desenvolvedores acham que por ter de escrever além do código, os testes, vai fazer com que demorem mais para desenvolver. Para quê perder tempo aprendendo uma coisa que eu não vejo como útil/importante não é mesmo?
* `Curva de aprendizado`: o estilo de programar muda, é uma nova cultura e para isso, você precisa se adaptar. E é nesse ponto que a maioria desiste, pois não conseguem ver o valor do esforço inicial.

<h2 id="ganho">O que ganho com TDD?</h2>

Bom, ali acima eu dou algumas das justificativas que os desenvolvedores dão para não usar. Mas se eles continuassem, olhe as vantagens que eles teriam:

### Reduz o tempo gasto em depuração e correção de bugs

Quando iniciamos o processo de correção de um bug, a primeira coisa que geralmente fazemos é tentar reproduzir o erro, para em seguida depurar o fluxo onde ocorre o bug para enfim analisar o estado dos objetos em busca da raíz do problema. Quando você não possui testes, você precisa mais uma vez realizar os passos de um teste funcional para depurar. Se você escrever um teste unitário que “estimule” o sistema a passar pelo código defeituoso, você estará “reproduzindo” o erro sem necessidade de executar a aplicação como um todo.

### Não é desenvolvido código desnecessário

Essa pode parecer uma frase um pouco controversa, mas não é. Como o flow de desenvolvimento é "Criar testes antes, fazer solução depois", você acaba não criando código desnecessário, visto que você sempre faz o suficiente para os testes passarem.

### Auxilia testes de regressão

É comum, ao corrigir um bug, introduzir um novo bug. Em outras palavras, a correção de um bug pode ter como efeito colateral que uma parte do software que antes funcionava deixe de funcionar. Quando isto ocorre, dizemos que o software regrediu. Chamam-se “teste de regressão” os testes que visam verificar a integridade geral do sistema quando um bug é corrigido, ou até mesmo quando uma nova funcionalidade é implementada no sistema. O uso do TDD vai reduzir a introdução de efeito colaterais junto com alterações no código. É claro que apenas na parte do código que seja coberta pelo testes unitários. Além disso, quando um teste passa a falhar após sua alteração, você acabou de identificar o bug num momento muito próximo de sua introdução.

### Melhora a qualidade do código

O TDD encoraja que você pense antes de desenvolver a solução e que você sempre crie as soluções mais simples. Existe uma frase muito importante no TDD que é:

> "Se são necessárias muitas linhas de código criando objetos para uma simples
> asserção, então há algo de errado."

Isso faz com que você já saiba se está indo na direção certa para construção da solução ou se ela está fortemente acoplada e precisa ser modularizada/simplificada.

### Documentação pelos testes

Os testes nos ajudam a documentar o sistema se nomearmos ele bem. Como pensamos antes de codificar e fazemos testes pequenos para cada pedaço de funcionalidade, praticamente somos obrigados a escrever um teste legível. Se pararmos para ver todos os testes de uma funcionalidade temos ali praticamente uma documentação de caso de uso.

### Refatoração constante

Como o próprio ciclo do TDD já sugere, a última etapa é a refatoração. Então, para cada teste que escrevemos, olhamos novamente nosso código e se nos sentirmos incomodados devemos refatorá-lo. O grande diferencial de trabalharmos com testes automatizados é que temos a segurança de fazer alterações, pois nossos testes devem garantir que nosso código continuará funcionando. Outro aspecto interessante é que refatorando a cada “verde”, evitamos que nosso código fique ilegível e com repetições desnecessárias.

<h2 id="tipos">Tipos de testes</h2>

O TDD se baseia principalmente nos testes unitários, que de fato são a base para o desenvolvimento orientado por testes. Mas existem outros testes tão importantes quanto. Martin Fowler, que é basicamente um dos maiores apoiadores do TDD, disse o seguinte: a maioria do desenvolvimento sempre foi pensada na interface e, com isso, os testes mais criados também eram os de interface. Mas o problema é que esses testes são muito lentos e nós não queremos isso. Nós queremos respostas eficientes e rápidas, por isso, os testes unitários precisam ser o de maior de número e os mesmos precisam ser bem rápidos. Seguindo esse pensamento, ele desenvolveu a seguinte pirâmide:

![Pirâmide de testes](/assets/img/pyramid.png)

Nessa pirâmide, podemos ver que os testes unitários formam a base, seguidos pelos testes de serviço, que podem ser entendidos como testes de integração e testes de sanidade. Por final, temos os testes de interface, também conhecidos como testes de aceitação. Esse tipo de lógica faz com que os testes sejam mais eficazes e rápidos.

E eles seguem o seguinte fluxo, se os testes unitários passarem, realizamos a integração entre os componentes e vemos se os mesmos continuam funcionando. Tudo estando ok, fazemos os testes de aceitação, que já trabalham com a interface e também com usuários diretamente. Se algum teste quebra, todo o resto é abortado, evitando assim de rodarmos testes mais lentos sem necessidade.

Existem outros vários tipos de testes, mas irei abordar os principais, que serão os utilizados no nosso dia-a-dia.

<h3 id="unit">Teste Unitário (Unit Test)</h3>

O teste unitário tem por objetivo testar a menor parte testável do sistema (unidade), em geral, um método.

Idealmente, o teste unitário é independente de outros testes, validando assim cada parte ou funcionalidade individualmente.

Para seguir um padrão legal do seu teste unitário, ele deve ser capaz de responder as seguintes perguntas:

* O que eu estou testando?
* O que o método deveria fazer?
* Qual o seu atual retorno?
* O que eu espero que retorne?

Se você conseguir olhar para o teste e responder tudo isso, seu teste é bastante válido e irá te ajudar bastante caso algo dê errado.

<h3 id="smoke">Teste de Sanidade (Smoke Test)</h3>

Esse é um teste pouco conhecido e pouco utilizado, mas que tem sua utilidade. Originado dos testes de hardware, ele serve para dizer somente se sua aplicação está respondendo corretamente ou não. Na nossa área de web, ele seria basicamente o teste de retorno das rotas e nada mais que isso.

<h3 id="integracao">Teste de Integração (Integration Test)</h3>

Teste de integração é a fase do teste de software em que módulos são combinados e testados em grupo. Ela vem depois dos testes unitários, em que os módulos são testados individualmente, e vem antes dos testes de aceitação, em que o sistema completo é testado num ambiente que simula o ambiente de produção.

O teste de integração é alimentado pelos módulos previamente testados individualmente pelos testes unitários, agrupando-os assim em componentes, como estipulado no plano de teste, e resulta num sistema integrado e preparado para o teste de sistema.

<h3 id="aceitacao">Teste de Aceitação (Acceptance Test)</h3>

O teste de aceitação verifica se todo o projeto funciona de acordo com sua especificação, ele já é um teste final, que visa juntar todos os módulos e testá-los em conjunto já a uma interface gráfica. Esses testes visam aferir se algo na interface faça o sistema não funcionar ou que dificulte o acesso ao usuário, um exemplo seria se um input não estivesse aparecendo para que dados fossem inseridos.

<h2 id="mocks">Mocks</h2>

Os mocks são extremamente úteis quando precisamos isolar pontos de integração externos, como Web Services e bancos de dados, por exemplo. Vamos imaginar o seguinte ambiente:

Temos 2 métodos:

* `buscaInfoProduto`: método que vai ao banco de dados e retorna um objeto contendo o nome e preço do produto.
* `blackFriday`: método que pega o valor do produto, multiplica ele por 2 e retorna o objeto desse produto.

Concorda comigo que para testar o método `blackFriday`, eu só preciso saber que dado um objeto com preço X, ele vai multiplicar esse valor por 2?

Sendo assim, eu não preciso rodar o `buscaInfoProduto`, pois requisições ao banco são muito mais lentas. Para isso, eu crio um objeto esperado (mock) e analiso o que de fato é a **responsabilidade única** do método `blackFriday`.

<h2 id="dicas">Dicas para se fazer melhores testes</h2>

Já tendo uma ideia de como funciona o Ciclo do TDD, quais tipos de testes existem e como eles devem ser organizados e testados, é bom ter algumas dicas, para que a gente não saia testando coisas a mais ou coisas a menos.

### Não coloque a carroça na frente dos bois

Sim, é isso mesmo que você leu. Não tente avançar o ciclo dos testes, só porque você já sabe como implementar do início ao fim. É importante que você se mantenha no ciclo (Red, Green, Refactor), isso vai fazer com que através da prática e disciplina, você se acostume e acabe ganhando agilidade e melhor visão do processo de desenvolvimento.

### Trate código de teste como código de produção

O código de teste precisa ser legível, separado em etapas bem definidas e possuir um bom report. Isso vai permitir termos nossa documentação, além de facilitar com que outros desenvolvedores entendam o sistema a partir dali. De nada adianta criar um conjunto de testes se eu não souber qual problema aconteceu se algum teste quebrar.

### Evite acoplamento

Quanto mais desacoplados seus testes, melhor. Isso evita a quebra em cascata, auxiliando na busca de erros. Isso também auxilia até mesmo o seu design de código, garantindo algo modularizado e de bem mais fácil manutenção.

### Um teste de cada vez

Esse é o padrão do TDD, mas não custa reafirmar, só escreva um próximo teste, se o primeiro passar. Isso garante que não ficarão coisas pela metade e nem o risco de acabar esquecendo algo no meio do caminho.

### Não teste o desnecessário

Por exemplo, se você estiver usando um framework, você não precisa testar se o método dele está funcionando, isso já foi amplamente testado no framework e o que você estará fazendo, nada mais é que repetindo testes.

### Responsabilidade Única

Isso serve para o seu código e para o seu teste também, se você precisa escrever muito para fazer um teste, significa que alguma coisa está errada. Sempre faça testes pequenos, em geral, um teste para um método ou mais testes para um mesmo método, nunca o contrário. Um teste jamais poderá testar mais de um método.

<h2 id="ferramentas">Ferramentas para testar</h2>

Claro que para rodar todos esses testes, é melhor automatizar tudo, assim, a cada teste que escrevemos, uma ferramenta roda tudo e nos reporta os erros que tivermos e os que passaram. Para auxiliar, seguem algumas ferramentas comuns, lembrando que existem centenas por aí, então vou me atentar a colocar algumas das mais comuns.

<h3 id="tool-js">Javascript</h3>

* [Mocha](https://mochajs.org/) - bastante conhecido, altamente plugável e com várias features excelentes.
* [Jasmine](http://jasmine.github.io/edge/introduction.html) - trabalha com BDD (behavior-driven development), ou seja, teste orientado a comportamento, bastante utilizado também.
* [Ava](https://github.com/sindresorhus/ava) - como se entitula, um test runner futurista, desenvolvido pelo famoso Sindresorhus, promete ser bem mais veloz que todos os outros.
* [Tape](https://github.com/substack/tape) - criado pelo Substack, outro com proposta de ser bem pequenino, mas com bastante plugins.
* [Jest](https://facebook.github.io/jest/) - criado pelo Facebook para realizar testes no React, trabalha em cima de Mocks por default.
* [QUnit](https://qunitjs.com/) - usada pela galera do JQuery e vários outros grandes projetos, tendo o [Leo Balter](https://twitter.com/leobalter) como um dos desenvolvedores.
* [Karma](http://karma-runner.github.io/0.13/index.html) - diferente dos outros, o Karma não serve para escrever os testes e sim para rodá-los em cima de browsers, dos quais inclui até headless browser como o PhantomJS.
* [CasperJS](http://casperjs.org/) - permite rodar testes de aceitação usando headless browser (PhantomJS e SlimerJS), numa sintaxe bastante simples.
* [Nightwatch](http://nightwatchjs.org/) - talvez um dos melhores para se fazer testes End-to-End (E2E), onde você faz um teste completo de sua aplicação.
* [Protractor](http://www.protractortest.org/#/) - outro para testes E2E, mais focado para o AngularJS.

<h3 id="tool-python">Python</h3>

* [Unit testing framework](https://docs.python.org/2/library/unittest.html) - talvez a mais comum e conhecida do Python, até por já vir inclusa com a linguagem. Bastante poderosa e simples de se utilizar.
* [Pytest](http://pytest.org/latest/) - outra bastante utilizada no universo python, possui várias integrações e ótima sintaxe.
* [Splinter](https://splinter.readthedocs.io/en/latest/) - criada por uma galera da Globo para realizar testes E2E, vale uma olhada.
* [Locust](https://locust.io/) - ferramenta para teste de carga.

<h3 id="tool-ruby">Ruby</h3>

* [Test::Unit](http://test-unit.github.io/) - outra que vem por padrão na linguagem, sendo amplamente utilizada.
* [RSpec](http://rspec.info/) - framework para testes BDD em Ruby, tem uma ótima documentação.
* [Minitest](http://docs.seattlerb.org/minitest/) - é uma suite completa de testes, para TDD, BDD, mocks e benchmarking.

<h2 id="conclusao">Conclusão</h2>

Bom pessoal, sei que foi um post grande, talvez um pouco cansativo, mas é bastante importante que se entenda a teoria para partir para a prática, ao menos um pouquinho, para que a prática seja mais proveitosa. Nos próximos posts falarei sobre CI/CD e então a prática de tudo que falamos. Peço que comentem sobre o que acharam, o que esperam ler/ver sobre o assunto, enfim, qualquer feedback será bastante importante para o desenvolvimento dos outros posts.
