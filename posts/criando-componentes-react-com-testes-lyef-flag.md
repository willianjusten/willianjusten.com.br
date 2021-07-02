---
layout: post
title: "Criando Componentes React com Testes - Lyef-flag"
date: 2017-08-22 17:36:07
image: '/assets/img/lyef-flags/main.png'
description: "Como escrever um componente React com Mocha, Chai, Enzyme e Storybook."
main-class: 'js'
color: '#D6BA32'
tags:
- react
- js
categories:
- "Aprendendo ReactJS"
twitter_text: "Como escrever um componente React com Mocha, Chai, Enzyme e Storybook."
introduction: "Como escrever um componente React com Mocha, Chai, Enzyme e Storybook."
---

## Introdução

Faaaala pessoal, como eu comentei no [post passado](https://willianjusten.com.br/lyef-criando-componentes-desacoplados-em-reactjs/), estarei fazendo mais posts sobre React e claro, irei utilizar o boilerplate da Lyef em questão, que eu descrevi e expliquei bastante no post citado.

Enquanto vou escrevendo, vou ouvindo uma ótima banda chamada [All Them Witches](https://open.spotify.com/artist/29Wmfm1CojrjQ3aQP0FI65), um rock atual mas bem inspirado em clássicos como Led Zeppelin, vale ouvir.

Bom, deixar de conversa e vamos lá. O componente de hoje será extremamente simples, mais para podermos ir acostumando com a estrutura da Lyef, onde iremos ter um flow básico para desenvolver. Pretendo criar uma série de posts com diversos componentes sendo criados.

## Sobre o Componente que iremos criar

Como dito, o componente de hoje será bastante simples e se chama [Lyef-flags](https://github.com/lyef/lyef-flags), o código você pode ver no link ali e se quiser, pode ver a [demo aqui](https://lyef.github.io/lyef-flags/). O componente irá utilizar o banco de images do [Flagpedia](http://flagpedia.net/) para poder renderizar a bandeirinha de acordo com a sigla passada e o tamanho definido.

![Exemplo das bandeirinhas](/assets/img/lyef-flags/flags.png)

### Sobre o flow de desenvolvimento com a Lyef

Para trabalhar com a Lyef, existe um flow bem básico a ser seguido, mas que não é nada complicado e não necessariamente precisa de todas as etapas. É só uma forma que eu acho bem otimizada e interessante de fazer as coisas funcionarem e de uma forma legal.

Primeiro de tudo é necessario clonar o [lyef-react-component](https://github.com/lyef/lyef-react-component) ou gerar com o [Slush-lyef-react](https://github.com/lyef/slush-lyef-react). Uma CLI para facilitar isso também está sendo criada [aqui](https://github.com/lyef/lyef-react-cli).

Depois de clonado/gerado, lembre-se de instalar as dependências todas rodando o comando `npm i`. Feito isso, já podemos prosseguir então.

Todo o processo é baseado em ferramentas ágeis e a primeira dela é a [User Stories](http://www.agilemodeling.com/artifacts/userStory.htm), onde você define coisas básicas da sua aplicação, através de textos bem curtos.

Depois de definidas as `stories` nós iniciamos o desenvolvimento pelos **testes**, já trabalhando com outro método ágil que o TDD (Test Driven Development), você pode ler mais sobre testes [nesse link](https://willianjusten.com.br/entendendo-testes-de-software/).

E para cada teste escrito, nós vamos sempre atualizando o código e passando os testes, lembrando que só se escreve um teste quando se passa no anterior. E depois de etapas de teste, temos também etapa de `refactor` caso seja necessário. No final teremos nosso componente todo testado e graças as `stories` do Storybook já teremos também uma aplicação Demo =D

**Um aviso importante:** o desenvolvimento assim pode parecer lento de início, mas não é e traz uma segurança muito maior no desenvolvimento.

## Escrevendo as Stories

Como dito acima, as `stories` são pequenos textos que definem o funcionamento da aplicação. Escrevendo só um rascunho do nosso componente seria:

- Renderizar bandeira passado a sigla mesmo sem passar `size`
- Renderizar com tamanho `small`
- Renderizar com tamanho `normal`
- Renderizar com tamanho `big`
- Renderizar com tamanho `ultra`
- Renderizar mais de uma bandeira ao mesmo tempo
- Renderizar a mesma bandeira em tamanhos diferentes ao mesmo tempo

Nosso componente poderia ser escrito da seguinte forma então:

```html
<Flag country="br" size="small" />
```

Ele vai ser o `Flag` e poderá receber duas `props` que são `country` e `size`. Tendo isso em mente, a gente já pode então definir o código para as stories, para você entender mais sobre como escrever Stories e como elas funcionam, [segue esse link](https://storybook.js.org/basics/writing-stories/). Dentro do arquivo `stories/Main.js` iremos escrever o seguinte código:

```js
import React from 'react';
import Flag from '../src/Main'; // Nosso Componente
import { storiesOf } from '@storybook/react';

storiesOf('Flag', module)
    .add('small brazil flag without size defined', () => (
        <Flag country="br" />
    ))
    .add('small canada flag', () => (
        <Flag country="ca" size="small" />
    ))
    .add('normal brazil flag', () => (
        <Flag country="br" size="normal" />
    ))
    .add('big brazil flag', () => (
        <Flag country="br" size="big" />
    ))
    .add('ultra brazil flag', () => (
        <Flag country="br" size="ultra" />
    ))
    .add('more than one small flag', () => (
        <div className="flags">
            <Flag country="ca" size="small" />
            <Flag country="br" size="small" />
            <Flag country="us" size="small" />
            <Flag country="mx" size="small" />
            <Flag country="ru" size="small" />
        </div>
    ))
    .add('more than one sized flag', () => (
        <div className="flags">
            <Flag country="br" size="small" />
            <Flag country="br" size="normal" />
        </div>
    ));
```

Como pode ver, eu utilizei o `storiesOf` para criar as `stories` do meu componente que será o `Flag` e utilizei o `.add('description')` para colocar cada `story` que nós queriamos.

Tendo isso pronto, podemos rodar o Storybook com o comando `npm start` e você irá receber a seguinte tela:

![Tela com as Stories](/assets/img/lyef-flags/stories.png)

Como pode ver, as descrições das `stories` são mostradas ao lado, mas ainda só temos um "Hello !" pois nem iniciamos a criação do nosso componente.

## Escrevendo Testes

### Primeira Etapa

Como falado no [primeiro post sobre a Lyef](https://willianjusten.com.br/lyef-criando-componentes-desacoplados-em-reactjs/) iremos utilizar o [Mocha](https://github.com/mochajs/mocha), [ChaiJS](https://github.com/chaijs/chai) e [Enzyme](https://github.com/airbnb/enzyme) para escrever nossos testes de forma bem fácil.

Então vamos lá para o arquivo `tests/specs/Main.spec.js`, podemos apagar o que tiver lá e deixar só os `imports` necessários e escrever nosso primeiro teste, ficando assim:

```js
// tests/specs/Main.spec.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Flag from '../../src/Main';

describe('<Flag />', () => {

   it('should have props for country and size', () => {
        const wrapper = shallow(<Flag country="br" size="small" />);
        expect(wrapper.props().name).to.be.defined;
        expect(wrapper.props().small).to.be.defined;
    });

});
```

Precisamos garantir que o componente vai responder pela tag `<Flag>` e que essa terá suas `props` recebidas corretamente. Se você rodar o teste com o comando `npm run test:tdd`, não vai quebrar pois já tem um código sujo lá em `src/Main.js` criando o "Hello !", mas você vai receber um warning até relacionado a props não passada. Mas claramente vamos arrumar o código lá então:

```js
// src/Main.js

import React from 'react';
import PropTypes from 'prop-types';

const Flag = ({ country, size }) => (
    <h1></h1>
);

Flag.propTypes = {
    country: PropTypes.string.isRequired,
    size: PropTypes.string,
};

export default Flag;

```

Reparem que eu defini então o nosso componente para usar o nome `Flag` como default e também já defini nossas `props` como o teste determinava. Reparem que eu defini o `country` como `isRequired` visto que para renderizar a bandeira eu preciso sempre desse valor, já para o `size` eu só defini que preciso de uma `string`, mas deixei aberto para que possa ter ou não o valor definido.

### Segunda Etapa

Beleza, temos aí o início do nosso componente, mas obviamente tá longe do que queremos. Nós queremos renderizar uma `img` com a bandeira definida né? Então o próximo passo é verificar se estou renderizando uma `img` ao montar o componente, escrevendo o próximo teste:

```js
// tests/specs/Main.spec.js

...

it('should render an image element', () => {
    const wrapper = shallow(<Flag country="br" />);
    expect(wrapper.find('img')).to.have.length(1);
});

...

```

Ao adicionar esse novo teste, nossos testes quebraram, informando `AssertionError: expected { Object (root, unrendered, ...) } to have a length of 1 but got 0`, ou seja, não tem nenhuma `img` renderizada. Para resolver isso de um jeito bem fácil, é só ir no nosso componente e adicionar isso:

```js
// src/Main.js

const Flag = ({ country, size }) => (
    <img src="" alt="" />
);
```

E prontinho, mais um teste passando! Só que ainda longe do que queremos.

### Terceira Etapa

Agora já renderiza uma `img`, mas cadê a bandeirinha? A `src` sequer tá preenchida! Vamos mudar isso né, então vamos a mais um teste:

```js
// tests/specs/Main.spec.js

it('should get have br on img src when country br is passed', () => {
    const wrapper = shallow(<Flag country="br" size="small" />);
    expect(wrapper.find('img').props().src.includes('br')).to.equal(true);
});

```

Nesse meu teste, eu estou fazendo o seguinte, estou checando se dentro da `src` da imagem eu tenho a string `br`, pois eu sei que a url da bandeira do brasil é `http://flagpedia.net/data/flags/small/br.png`, ou seja, utiliza o `br` ali. Para fazer o nosso teste passar, lembrando que:

> Os testes precisam ser resolvidos do jeito mais fácil e "burro" possível, depois existem etapas de refatoração.

Nós podemos alterar o nosso componente para o seguinte código:

```js
// src/Main.js

const Flag = ({ country, size }) => (
    <img src="http://flagpedia.net/data/flags/small/br.png" alt="br" />
);
```

E prontinho! Nosso teste está passando!

### Quarta Etapa

Já estamos chegando lá, a bandeirinha tá inclusive aparecendo agora, mas o código tá `hardcoded`. Qual melhor maneira de evitar isso num teste? Escrever mais um teste similar, só que agora usando uma outra bandeira, ficando assim:

```js
// tests/specs/Main.spec.js

it('should get have ca on img src when country ca is passed', () => {
    const wrapper = shallow(<Flag country="ca" size="small" />);
    expect(wrapper.find('img').props().src.includes('ca')).to.equal(true);
});

```

Claro que o teste quebrou, pois só temos a bandeirinha do Brasil sempre. Para corrigir o código, vamos finalmente iniciar a codificação. Para essa primeira etapa, eu vou alterar a `url` da imagem só na parte da sigla, vou utilizar o [Template String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings) para facilitar nessa concatenação. E como é um código JS, eu preciso encapsular isso entre as chaves também:

```js
// src/Main.js

const Flag = ({ country, size }) => (
    <img src={`http://flagpedia.net/data/flags/small/${country}.png`} alt={country} />
);
```

Agora falta só fazer a parte do tamanho, lembrando que se eu não passar nenhum valor, eu preciso que o tamanho seja `small`.

### Quinta Etapa

Agora já pensando na parte do `size`, precisamos criar um teste que dado um diferente `size` passado, eu mude na url o tamanho. Vamos fazer assim:

```js
// tests/specs/Main.spec.js

it('should get have normal on img src when size normal is passed', () => {
    const wrapper = shallow(<Flag country="br" size="normal" />);
    expect(wrapper.find('img').props().src.includes('normal')).to.equal(true);
});

```

Aqui eu quero verificar que dado `size="normal"` a url precisa conter a string `normal`. E claro, quebrou! Vamos então ao código para corrigir isso:

```js
// src/Main.js

const Flag = ({ country, size }) => (
    <img src={`http://flagpedia.net/data/flags/${size}/${country}.png`} alt={country} />
);
```

E com isso, o teste passou normalmente.

### Sexta Etapa

Mas e se eu não passar `size` nenhum? Eu preciso também garantir que vai vir `small` né? Vamos criar o seguinte código de teste:

```js
// tests/specs/Main.spec.js

it('should get have small on img src even when size is not passed', () => {
    const wrapper = shallow(<Flag country="br" />);
    expect(wrapper.find('img').props().src.includes('small')).to.equal(true);
});

```

Com isso, nosso teste quebrou, mostrando que ainda falta esse pedaço. Para resolver isso vou usar o [default parameter](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Parametros_Predefinidos), garantindo que `size` vai ser `small` caso não receba nada.

```js
// src/Main.js

const Flag = ({ country, size = 'small' }) => (
    <img src={`http://flagpedia.net/data/flags/${size}/${country}.png`} alt={country} />
);
```

E prontinho, nosso teste passou!

### Sétima Etapa

Agora só precisamos garantir que nosso código vai funcionar com os tamanhos `big` e `ultra` também. E para isso vamos adicionar os testes:


```js
// tests/specs/Main.spec.js

it('should get have big on img src when size big is passed', () => {
    const wrapper = shallow(<Flag country="br" size="big" />);
    expect(wrapper.find('img').props().src.includes('big')).to.equal(true);
});

it('should get have ultra on img src when size ultra is passed', () => {
    const wrapper = shallow(<Flag country="br" size="ultra" />);
    expect(wrapper.find('img').props().src.includes('ultra')).to.equal(true);
});

```

E dessa vez não precisamos escrever mais nenhum teste, pois o código já está passando! Se você rodar agora o Storybook novamente com `npm start` você irá ver todo ele funcionando com as bandeirinhas! E você sequer precisou ficar vendo a tela para garantir que está funcionando, pois já tinha teste para tudo =D

![Storybook Rodando](/assets/img/lyef-flags/storybook.gif)

## Conclusão

Bom galera, é isso aí! Esse foi o primeiro post dessa série que pretendo fazer sobre criação de componentes React com Testes. Espero que tenham gostado e qualquer dúvida ou dica que tiverem, postem aí nos comentários.

Lembrando que o processo de User Stories e TDD pode parecer difícil e demorado no início, mas depois de um tempo, ele agiliza bastante o processo e seu desenvolvimento fica muito mais seguro e bem orientado dessa forma =)
