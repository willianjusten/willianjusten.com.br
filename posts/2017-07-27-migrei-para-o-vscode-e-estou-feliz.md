---
layout: post
title: "Migrei para o Visual Studio Code e estou feliz!"
date: 2017-07-27 19:08:41
image: '/assets/img/vscode/vscode.png'
description: "Um pouco da minha experiência com esse editor que me fez aposentar o Sublime e plugins que uso."
main-class: 'dev'
color: '#637a91'
tags:
    - workflow
    - dev
categories:
twitter_text: "Minha experiência com esse editor que me fez aposentar o Sublime!"
introduction: "Um pouco da minha experiência com esse editor que me fez aposentar o Sublime e plugins que uso."
---

## Introdução

Faaala pessoal, tentando manter um ritmo de pelo menos um post por semana, vamos lá para mais um post. Enquanto eu escrevo esse post, vou ouvindo uma banda absurdamente boa, formada por uns adolescentes, mas não se deixe enganar, as influências dos anos 70 vão te fazer pensar estar ouvindo Led Zeppelin. A banda em questão é a [Greta Van Fleet](https://open.spotify.com/artist/4NpFxQe2UvRCAjto3JqlSl), pode parar o que está ouvindo e curtir o som deles, vale a pena.

E para o post de hoje, vou falar sobre um editor de texto que me fez largar o Sublime Text e não sentir saudades, isso mesmo, ele fez um milagre, porque sou amante e defensor do Sublime há anos! O editor em questão é o [Visual Studio Code](https://code.visualstudio.com/), sim, a Micro$oft anda acertando!

Obs.: não recebi nada para fazer esse post, <s>mas se alguém for da M$ e quiser oferecer algo, meus contatos estão na página do about!</s>

## Características

Segue um passeio pelas principais features desse editor.

### Intellisense
A primeira coisa que eles já tem orgulho de falar que tem é o [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense), que traz um sistema inteligente de autocomplete para variáveis e métodos, além de mostrar várias informações daquele método/variável. Abaixo segue um Gif dessa maravilha rodando.

![Intellisense em ação](https://code.visualstudio.com/assets/docs_carousel/intellisense_b.png)

### Debugging

Isso mesmo, você pode depurar sua aplicação, adicionar breakpoints, identificar valores dentro da call stack e outras várias coisas, diretamente do editor. E ele roda leve leve, <s>não adianta mais dar desculpa que usa aquela sua IDE pesada.</s> E ele funciona não só para uma linguagem, mas para várias, bastando instalar a extensão que desejar. Dá uma olhada na [página da documentação deles](https://code.visualstudio.com/docs/editor/debugging), vários exemplos legais.

![Exemplo do Debugging funcionando](https://code.visualstudio.com/assets/docs_carousel/debug_b.png)

### Multi-cursor, linter e mais

Isso mesmo, aquelas coisas maravilhosas que você usava no Sublime e não trocava de jeito nenhum, todas estão no VScode e de forma bem melhorada. Dá uma olhadinha na página de [Basic Editing](https://code.visualstudio.com/docs/editor/codebasics) deles, que tem bastante coisa legal mostrando lá.

![Exemplo mostrando o multicursor](https://code.visualstudio.com/assets/docs_carousel/multi-cursor-edit.png)

### Code Navigation e Refactor

Uma das coisas que eu ficava muito chateado de não ter no Sublime (até tinham uns plugins, mas nada muito bom) era o Go to definition. As vezes eu queria saber o que um método fazia e eu tinha que caçar na mão a definição do método, pois não tinha um link. E isso tem no VSCode funcionando muito bem! Isso não é lindo? E unido a isso, ele tem algumas ferramentas que auxiliam o refactor, como, por exemplo, mudar uma variável/método em todas as referências de todos os arquivos a um clique, lindo demais! Dá uma olhada [aqui](https://code.visualstudio.com/docs/editor/editingevolved), vai curtir bastante!

### Integração com o Git

E uma das coisas mais bonitas e funcionais que tem no VSCode é essa integração. Eu confesso que me falavam e eu pensava: "Pow, mas eu sempre tenho terminal aberto, uso muito bem o Git por lá, num preciso disso." e bom, mereço ficar quieto da próxima. É claro que consigo fazer tudo no terminal, mas a forma simples e fácil que o VSCode faz essa integração, agiliza demais no meu workflow. Eu consigo ver difs mais claros entre os arquivos, para resolver conflitos ele ainda me mostra opções como "Ignorar mudanças vindas do remoto, mesclar com as mudanças atuais, ignorar mudanças atuais", cara, isso é uma mão na roda! Olha essa [página](https://code.visualstudio.com/docs/editor/versioncontrol) e tenha ideia de quanta coisa boa essa integração tem!

![Tela mostrando o diff](https://code.visualstudio.com/assets/docs_carousel/git_b.png)

E se depois de tudo isso você não está convencido, acessa lá o [site deles](https://code.visualstudio.com/docs) e leia por si só. Maaaaas, ainda não acabou, agora vem a cereja no topo do bolo, os **plugins**!

## Meus Plugins favoritos

Os plugins do Sublime eram incríveis, eu conseguia transformar um editor simples numa ferramenta de trabalho extremamente poderosa. E no VSCode existem diversos plugins incríveis para continuar com isso! Eu vou listar aqui alguns dos plugins que eu uso e salvam minha vida diariamente.

- [Advanced New File](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file) - o mesmo que tinha no Sublime, permite criar pastas dentro de pastas, arquivos dentro de pastas inexistentes, tudo através do teclado, passando o endereço desejado.
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - basta você mudar o nome de um lado ou do outro da tag e ele já ajusta o outro lado para ti.
- [AutoFileName](https://marketplace.visualstudio.com/items?itemName=JerryHong.autofilename) - completa o nome dos arquivos para mim, perfeito para adicionar imagens.
- [Chai Snippets](https://marketplace.visualstudio.com/items?itemName=nwhatt.chai-snippets) - para quem usa Chai, ajuda bastante para escrever os testes.
- [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) - para rodar seu código diretamente do terminal do VSCode.
- [Colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize) - ele coloca um background nas cores no css, facilitando assim saber qual cor é.
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) - o nome já diz, permite fazer debug no Chrome, lindo.
- [Document this](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) - para criar cabeçalhos em métodos e variáveis.
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - para o editor seguir as regras do arquivo do `.editorconfig`.
- [ES6 Mocha Snippets](https://marketplace.visualstudio.com/items?itemName=spoonscen.es6-mocha-snippets) - para quem escreve testes com o Mocha.
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - acho que vem até por padrão, para rodar o linter no seu código JS.
- [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame) - mostra quem foi o carinha que fez a merda naquele código e isso bem na palma da sua mão, ou melhor, na barrinha inferior.
- [Git History (git log)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) - para mostrar logs bonitinhos do Git.
- [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) - ajuda a criar o `.gitignore`.
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) - snippets lindinhos para o seu código em ES6.
- [jsx](https://marketplace.visualstudio.com/items?itemName=TwentyChung.jsx) - suporte para escrever `jsx`.
- [language-stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus) - suporte para escrever `stylus`.
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - o plugin maravilhoso que tá me ajudando a escrever esse Markdown bonito para o blog.
- [Prettify JSON](https://marketplace.visualstudio.com/items?itemName=mohsen1.prettify-json) - para indentar `JSON`, bastante útil.
- [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets) - snippets para quem usa React.
- [Sublime Text Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings) - o cara que fez a minha transição praticamente imperceptível, ele transforma todos os comandos do Sublime!
- [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer) - para poder visualizar SVG diretamente do editor.
- [vscode-spotify](https://marketplace.visualstudio.com/items?itemName=shyykoserhiy.vscode-spotify) - integra com o Spotify e tem a opção de ver a letra da música! Você pode ver a letra da música cara, isso é demais!
- [Wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime) - porque eu sou fissurado com métricas.

## Conclusão

É isso aí galera, espero que vocês tenham gostado do Post e passem a dar uma olhada no VSCode com carinho, ele é da Micro$oft, mas é bom, eu prometo =D

E se você usa alguma parada que não está no post, **pelamordedeus** coloca aí nos comentários, porque eu sou o rei de testar plugins!
