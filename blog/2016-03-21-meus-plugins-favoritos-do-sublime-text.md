---
layout: post
title: "Meus plugins favoritos do Sublime Text"
date: 2016-03-21 18:48:36
image: '/assets/img/sublime-plugins/sublime-tema.png'
description: "Confesso que o Sublime é meu amorzinho, nele eu consigo ser produtivo e fazer muitas coisas. Veja o que eu uso no meu workflow."
main-class: 'dev'
color: '#637a91'
tags:
    - workflow
    - dev
categories:
twitter_text: "Veja os plugins que eu utilizo e me ajuda bastante no meu workflow."
introduction: "Confesso que o Sublime é meu amorzinho, nele eu consigo ser produtivo e fazer muitas coisas. Veja o que eu uso no meu workflow."
---

## Introdução

Faaaala galera! (roubando aqui a clássica fala do [Daniel Filho](https://twitter.com/danielfilho)). Esses dias eu liberei meu curso sobre como desenvolver sites estáticos utilizando Jekyll bem [aqui](https://www.udemy.com/criando-sites-estaticos-com-jekyll/) e uma coisa que muitos vieram perguntar foram quais plugins e temas eu utilizo no meu Sublime. Como eu também sou um cara super curioso no que os outros usam e vivo caçando plugins, resolvi escrever o que uso.

Vai ser um post bem rapidinho e a ideia é que todo mundo compartilhe aqui os plugins que utiliza e que eu não listei, sempre bom saber de algo que pode acelerar meu desenvolvimento.

## Por que eu uso o Sublime?

Olha, já mexi em váaaarios editores e no Sublime eu encontrei todas as facilidades de comandos e personalização, num editor extremamente leve. Com os plugins certos, eu consigo fazer tudo que preciso, consigo ter linter (beijos Webstorm), consigo fazer tudo pelo teclado (beijos Vim) e minha máquina não esquenta o suficiente para fritar um ovo (beijos Atom).

Brincadeiras a parte, o Sublime é um excelente editor de texto para mim, mas não significa que você precisa desistir de usar o seu e começar a usar o Sublime só porque eu falei que gosto. A melhor ferramenta é aquela que você sabe trabalhar melhor. Esse post é só mesmo para passar o que uso para quem já usa e talvez para os curiosos que não se decidiram ainda qual ferramenta utilizar.

## Instalando as coisas

Se você ainda não tem o Sublime, é só baixar no [site oficial](https://www.sublimetext.com/), eu uso o 3, que é muito bom e tem recebido várias atualizações por agora.

Para instalar os temas e plugins, você precisa do [Sublime Package Control](https://packagecontrol.io/), é só seguir as instruções no site, que não tem erro, já vai estar funcionando em segundos.

## Tema e Highlight

![Tela do meu Sublime](/assets/img/sublime-plugins/sublime-tema.png)

Para o tema eu utilizo o maravilhoso [Material Theme](http://equinusocio.github.io/material-theme/) na opção Darker Oceanic. Esse tema é maravilhoso, além de deixar o sublime muito mais bonito, ele é super funcional, mudando todos os ícones dos arquivos por seus tipos, então eu consigo descobrir do que se trata cada arquivo sem nem mesmo abrir.

O highlight dele é espetacular, as cores são pastéis, e o fundo, eu preferi deixar num cinza bem escuro, então fica bem suave de ler, consigo ficar horas trabalhando sem dor de cabeça ou precisar forçar a vista.

## Language Syntax

Bom, o Sublime já vem com a maioria dos Highlights para as principais linguagens, mas algumas de template e pre-processador ele ainda não tem, para isso eu instalei. Os pacotes que uso são:

- [Jade Syntax](https://packagecontrol.io/packages/Jade)
- [Sass Syntax](https://packagecontrol.io/packages/Syntax%20Highlighting%20for%20Sass)
- [Stylus Syntax](https://github.com/billymoon/Stylus)
- [Liquid Syntax](https://github.com/siteleaf/liquid-syntax-mode)

## Git

Todo mundo aqui usa Git né (quem não usa, deveria =p), e uma das coisas que eu fazia muito era ficar digitando `git status` para saber quais linhas eu alterei antes de dar o push, foi aí que descobri o maravilhoso [Sublime Git Gutter](https://github.com/jisaacks/GitGutter), ele coloca do lado um aviso das coisas que mudei, não é incrível?

![Tela mostrando o Git Gutter em ação](/assets/img/sublime-plugins/sublime-gutter.png)

Mas poxa, só ver as mudanças não adianta, eu quero poder adicionar, quero dar `git blame` direto no arquivo para ver quem foi o safado que escreveu aquele código ruim no freela, então nada melhor que o [Sublime Text Git](https://github.com/kemayo/sublime-text-git), ele integra ao Git e te permite fazer TUDO que você faria no terminal.

![Tela mostrando o Git Blame em ação](/assets/img/sublime-plugins/sublime-git.png)

E aqui embaixo usando o comando `git blame` em um arquivo, olha o [Fernando Daciuk](http://blog.da2k.com.br/) commitando ali =p

![Tela mostrando o Git Blame em ação](/assets/img/sublime-plugins/sublime-blame.png)

## Trabalhar com Arquivos e Pastas

Uma coisa que eu achava ruim no sublime eram as opções para mexer com arquivos, criar, importar e etc. Era uma coisa bastaaaante chata, precisar escrever todo o endereço do arquivo para mim era um parto, por isso eu achei essas ferramentas incríveis:

- [Advanced New File](https://github.com/skuroda/Sublime-AdvancedNewFile) - posso criar pastas e arquivos direto do teclado, usando os atalhos dele
- [AutoFileName](https://github.com/BoundInCode/AutoFileName) - completa os paths dos arquivos, coisa linda demais
- [Sidebar Enhancements](https://github.com/titoBouzout/SideBarEnhancements) - mais opções na barra lateral! YEY!
- [Sublime All Autocomplete](https://github.com/alienhard/SublimeAllAutocomplete) - ele acha palavras, métodos, enfim, tudo que tiver nos outros arquivos, super bom.

## Linters e organização de código

Eu sou bastante preocupado com código, gosto de tudo seguindo o mesmo padrão do projeto, sem espaços errados/etc. Para isso, tenho meus plugins salvadores:

- [Sublime CssComb](https://github.com/csscomb/sublime-csscomb) - padroniza meu CSS de acordo com o padrão passado no arquivo do .csscomb
- [EditorConfig Sublime](https://github.com/sindresorhus/editorconfig-sublime) - segue padrão definido no .editorconfig (USE AGORA MESMO!)
- [Sublime Linter](https://github.com/SublimeLinter/SublimeLinter3) - o responsável por fazer o Linter dentro do Sublime, ferramenta magnífica.
- [Sublime Linter JSCS](https://packagecontrol.io/packages/SublimeLinter-jscs) - junto com o Sublime Linter, ele verifica o padrão do código JS de acordo com o definido no arquivo do jscs

## Snippets

Sou um cara preguiçoso, que adora atalhos, então a primeira coisa que procurei, foram bons snippets, para facilitar a minha vida.

- [Emmet](http://emmet.io/) - esse é só o plugin mais importante nesse quesito para quem trabalha com web, ele é uma mão na roda fenomenal, se você não conhece, veja imediatamente.
- [Stylus Snippets](https://github.com/billymoon/Stylus-Snippets) - meu pre-processador favorito, não poderia ficar sem snippet para eles =)
- [Java​Script & Node​JS Snippets](https://packagecontrol.io/packages/JavaScript%20%26%20NodeJS%20Snippets) - muitos snippets úteis, me agiliza bastante ao escrever JS
- [DocBlockr](https://github.com/spadgos/sublime-jsdocs) - ninguém gosta de documentar as coisas, então é melhor que tenha algo que agilize e facilite isso, para não se tornar algo ainda mais chato. O DocBlockr ajuda bastante, só escrever `/**` e apertar tab e ele já gera um bloquinho com todas as infos daquele método, muito bom.

## Jekyll

Meu blog é escrito em Jekyll e depois do curso que lancei esses dias, vocês já devem imaginar que eu gosto bastante dele certo, então porque não ter coisas para facilitar minha vida?

- [Sublime Jekyll](http://23maverick23.github.io/sublime-jekyll/) - agiliza criação dos posts, drafts e etc.
- [Markdown Extended](https://github.com/jonschlinkert/sublime-markdown-extended) - melhora o jeito de escrever Markdown, que é a linguagem que utilizo nos posts.


## Métrica

Esse tópico na real é para falar só de um mesmo, mas que é tão bom que merece um tópico próprio, o [wakatime](https://wakatime.com/) é uma ferramenta que metrifica tudo que você faz no seu editor, como projetos que trabalhou, linguagens que usou, horas gastas, etc.

Você pode usar para metrificar seus freelas, mas também pode usar só de curioso (como eu), para saber o que anda programando e talz. Acho muito muito legal <3

## Conclusão

Bom pessoal, tema light e rapidinho, mas com coisinhas bem interessantes, espero que vocês gostem e não esqueçam de falar o que utilizam nos comentários abaixo, adoro descobrir plugins novos!!
