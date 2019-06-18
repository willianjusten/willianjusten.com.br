---
layout: post
title: "Trabalhando com Git Hooks de forma fácil"
date: 2016-07-10 12:37:37
image: '/assets/img/git-hooks/main.png'
description: "Evite que código sujo ou não testado suba para o repositório remoto."
main-class: 'dev'
color: '#637a91'
tags:
- git
- tutorial
categories:
twitter_text: "Evite que código sujo ou não testado suba para o repositório remoto."
introduction: "Garanta a qualidade e evite que código sujo ou não testado suba para o repositório remoto."
---

## Introdução

Faaaala pessoal, faz um tempinho que escrevi meu último post, nesses últimos dias tiveram vários e vários eventos em São Paulo e eu tive o prazer de participar =D

Lá eu palestrei sobre dois assuntos bem legais e se você ainda não viu meus slides, seguem:

- [CSS loves Math - Meetup CSS SP](https://willianjusten.com.br/meetup-css-sp)
- [JS loves Music](https://willianjusten.com.br/frontinsampa-16)

Enquanto escrevo esse post vou ouvindo a trilha de um jogo que estou viciado, o jogo em questão é o premiado [Life is Strange](https://www.youtube.com/watch?v=AURVxvIZrmU) e se você só de assistir esse trailer, já se apaixonou pelo jogo, segue comigo na [playlist](https://open.spotify.com/user/officiallifeisstrange/playlist/1f5ZzLDTXHTDR8CYIEddpW), que é incrivel <3

## Git Hooks

Git hooks são scripts que rodam automaticamente cada vez que você realiza alguma ação em particular no repositório Git. Eles permitem modificar o comportamento interno do Git e adicionar triggers customizáveis em vários pontos chave do ciclo de desenvolvimento.

Casos comuns do uso de Git Hooks são encorajar alguma política de commit, alterar algo do ambiente dependendo do estado do repositório ou implementar algum workflow de Integração Contínua.

Essas triggers podem ser ativadas através de commits, push para o repositório remoto, rebase, merges e etc.

## Como funciona

Todo repositório Git ao ser criado, gera um pasta `.git`, que, em geral, é oculta pelos sistemas operacionais. Dentro dessa pasta que é feita toda a mágica de versionamento, logs, separação de branches e etc. E lá também que temos os hooks, se você mandar listar o que tem na pasta `.git`, você verá algo como:

```bash
$ tree -d -L 1
.
├── branches
├── hooks
├── info
├── logs
├── objects
└── refs

6 directories
```

Como vamos trabalhar com Hooks, já é de se imaginar que devemos nos preocupar com a pasta `hooks`. Se listarmos os arquivos, teremos:

```bash
$ ls

applypatch-msg.sample     pre-applypatch.sample     pre-rebase.sample
commit-msg.sample         pre-commit.sample         prepare-commit-msg.sample
post-update.sample        pre-push.sample           update.sample
```

Se você reparar, eles já possuem nomes bem distintos de quando serão ativados. Todos estão com a extensão `.sample` e para fazê-los funcionar, basta remover essa extensão. Todos eles já possuem algum código dentro, por exemplo, se eu pegar o arquivo `commit-msg.sample`.

```bash
#!/bin/sh
#
# An example hook script to check the commit log message.
# Called by "git commit" with one argument, the name of the file
# that has the commit message.  The hook should exit with non-zero
# status after issuing an appropriate message if it wants to stop the
# commit.  The hook is allowed to edit the commit message file.
#
# To enable this hook, rename this file to "commit-msg".

# Uncomment the below to add a Signed-off-by line to the message.
# Doing this in a hook is a bad idea in general, but the prepare-commit-msg
# hook is more suited to it.
#
# SOB=$(git var GIT_AUTHOR_IDENT | sed -n 's/^\(.*>\).*$/Signed-off-by: \1/p')
# grep -qs "^$SOB" "$1" || echo "$SOB" >> "$1"

# This example catches duplicate Signed-off-by lines.

test "" = "$(grep '^Signed-off-by: ' "$1" |
         sort | uniq -c | sed -e '/^[   ]*1[    ]/d')" || {
        echo >&2 Duplicate Signed-off-by lines.
        exit 1
}
```

Poderíamos editar esse mesmo arquivo e colocar algo como:

```bash
#!/bin/sh

echo 'Boa! Continue trabalhando campeão!'
```

No momento de commitar algo, ele irá mostrar da seguinte forma:

![Mensagem de Boa! Continue trabalhando campeão logo após ter realizado um commit](/assets/img/git-hooks/commit-message.png)

Demais isso né? Aí você pode chegar e falar, mas eu não sei escrever shell script, sem problemas, nosso lindo Python também funciona <3

Ahhh, mas eu também não sei Python... Sem problemas, para isso temos algumas outras ferramentas para nos ajudar!

## Utilizando o Husky

O [Husky](https://github.com/typicode/husky) é uma ferramenta incrível feita para o ecossistema Node/Npm e permite criar hooks da forma mais fácil de todas =D

Primeiro você precisa instalar, o que é um simples:

```bash
$ npm install husky --save-dev
```

Depois disso, basta ir no seu `package.json` na parte de scripts e colocar os hooks desejados e as tarefas que você deseja fazer. Segue um exemplo:

```json
{
    "scripts": {
        "precommit": "npm run lint && npm test",
        "prepush": "npm run lint && npm test",
        "lint": "eslint ./src",
        "test": "..."
    }
}
```

Ali eu estou criando dois hooks que são `precommit` e `prepush` e estou dizendo que antes de um commit ou um push para o remoto, eles deverão rodar os comandos `lint` e `test`, que eu também determinei no meu npm script. Isso vai garantir que ele verifique se no código não tem nada fora do padrão de escrita, usando o nosso lint. E também irá rodar os testes, evitando que suba algo quebrado.

![Um carinha com bigodes e vestido com camisa de unicórnio falando it's magic de forma bem engraçada](https://i.imgur.com/iZcUNxH.gif)

Se você não conhece o `eslint` para verificar seu padrão de escrita, dá uma olhada nesse [post sobre linters](https://willianjusten.com.br/analisando-seu-codigo-js-com-linter/) que eu escrevi.

## Conclusão

Bom galera, espero que vocês tenham entendido o quanto é simples de se utilizar um Git Hook e como ele pode ser importante para o nosso desenvolvimento. Não quero mais ninguém subindo código fora de padrão e com testes quebrando hein! =p
