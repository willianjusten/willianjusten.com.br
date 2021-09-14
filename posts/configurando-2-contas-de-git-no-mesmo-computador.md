---
layout: post
date: 2021-09-14 10:31:30
title: Configurando 2 contas de Git no mesmo computador
description: Aprenda como configurar uma conta pessoal e uma conta da empresa no
  Git, incluindo chaves SSH e emails.
main-class: dev
color: "#637a91"
tags:
  - git
  - dev
---
## Introdução

Fala povo, recentemente eu voltei ao mercado de trabalho para trabalhar numa startup chamada [Zapt](https://zapt.com.br/) e consequentemente precisei configurar o Git da minha máquina para não usar somente o meu email pessoal, mas também o da empresa, principalmente porque lá utilizam o [GitLab](https://gitlab.com/) ao invés do GitHub, então ele é mais chatinho para reconhecer os emails e chaves SSH. 

É bem simples de configurar, mas percebi que muita gente não sabe como fazer da mesma maneira que eu faço, então resolvi escrever esse post rapidinho para ensinar. Lembrando que os processos descritos abaixo funcionam no Linux, Mac e Windows com WSL, no Windows puro algumas outras configuração seriam necessárias, mas não irei abordar aqui.

Enquanto eu vou escrevendo esse post vou ouvindo [Pitty](https://open.spotify.com/artist/2dmQ0vMD3THLMcz7DsvfaT?si=19mAEx4OQWeiYbx0duNobw&dl_branch=1), isso mesmo, aquela rockeira baiana que era bem famosa nos 2000, como já disse, escuto de tudo xD

## Por que configurar o Git e como fazer?

Antes mesmo de começar a falar de SSH e etc, a gente precisa falar a razão de configurar o Git num é mesmo? Bom, quando nós criamos um commit, ao ver no log, ele fica numa estrutura similar a essa:

```bash
commit 82a24142b6df8049787760c82d29728f8fb0eee5 (HEAD -> master, origin/master, origin/HEAD)
Author: Willian Justen de Vasconcellos <willianjustenqui@gmail.com>
Date:   Sun Sep 5 23:31:04 2021 -0300

    Remove dangerously to use Script
```

Se você notar, tem uma parte separada especificamente para o `Author`. Se você não configurar, o Git vai pegar o que tiver de informação no computador e na maioria das vezes ele não vai colocar direito nem o nome e muito menos o email.

Para configurar uma conta única e global é super simples, basta digitar:

```bash
git config user.name --global "Willian Justen de Vasconcellos"
git config user.email --global "willianjustenqui@gmail.com"
```

Mas e se precisar mudar para o email da empresa no projeto X? A forma não automatizada é **dentro do projeto** definir manualmente:

```bash
git config user.name "Willian Justen de Vasconcellos"
git config user.email "will.justen@zapt.com.br"
```

E aí talvez você pergunte:

> Mas e se tiverem vários projetos da empresa, preciso fazer isso em cada projeto?

A resposta antes desse post seria que sim, você precisa definir manualmente. Mas como vocês sabem, programador é bicho preguiçoso e sempre vai querer automatizar as coisas e bom, é o que faremos xD

## Configurando diferentes emails

Quando o Git vai assinar um commit ele primeiro procura as informações dentro da pasta `.git` dentro do projeto e caso não tenha nada definido localmente, ele procura pela configuração global que fica num arquivo chamado `.gitconfig` na pasta raiz do usuário.

E é aqui que iremos fazer uma jogada para o Git ler o que nós queremos que ele leia. Eu costumo ter uma estrutura de pastas da seguinte forma:

```bash
~/Development
   /github # meus projetos pessoais
   /zapt # projetos da zapt
```

Como é um padrão bem simples, fica fácil de falar para o Git o seguinte:

- Se estiver na pasta `github` use meu email pessoal
- Se estiver na pasta `zapt` use o email da empresa

E aí para definir isso, eu crio 2 arquivos:

- `.gitconfig-github`
- `.gitconfig-zapt`

E os conteúdos ficam:

```yaml
# .gitconfig-github

[user]
  email = willianjustenqui@gmail.com
```

E no outro:

```yaml
# .gitconfig-zapt

[user]
  email = will.justen@zapt.com.br
```

Lembrando que aqui estou mostrando só o email, mas outras configurações como aliases específicos para cada conta e qualquer outra coisa, você consegue separar tranquilamente nesses arquivos.

Mas só fazendo isso, ainda não vai funcionar, nós precisamos informar ao Git quando é parar ler um ou outro, para isso nós editaremos o `.gitconfig` original para ficar assim:

```yaml
[user]
  name = Willian Justen de Vasconcellos
[init]
  defaultBranch = main

[includeIf "gitdir:~/Development/github/"]
  path = .gitconfig-github
[includeIf "gitdir:~/Development/zapt/"]
  path = .gitconfig-zapt
```

Note que eu tenho coisas globais ainda, como meu nome e o branch inicial quando criar. Mas utilizo um `includeIf` exatamente para quando cair numa opção ou outra, ele adicionar meus dados específicos. Só de fazer isso, se eu criar um commit na Zapt, já ficaria com o commit assim:

```bash
commit e07164f972a15bbf7c681970a5cf547db966867d (origin/fix/update-map-use-lat-long, fix/update-map-use-lat-long)
Author: Willian Justen de Vasconcellos <will.justen@zapt.com.br>
Date:   Thu Aug 26 12:16:44 2021 -0300

    Fix Map position to use flat lat and long
```

Como podem ver, o email já fica certinho o da empresa e não o meu pessoal.

## Configurando duas chaves SSH

Agora vamos a segunda parte que é ainda mais importante, afinal de contas, se as chaves não estiverem bem configuradas, você não consegue nem fazer push para o repositório.

Primeiro de tudo, você precisa criar chaves SSH separadas, até para facilitar nessa separação, para isso, é só rodar:


```bash
ssh-keygen -t rsa -C "email@pessoal.com" -f "id_rsa_pessoal"
ssh-keygen -t rsa -C "email@trabalho.com" -f "id_rsa_trabalho"
```

Ao fazer isso, ele vai criar duas chaves separadas na pasta `~/.ssh`, depois basta adicionar na sua máquina usando:

```bash
ssh-add ~/.ssh/id_rsa_pessoal
ssh-add ~/.ssh/id_rsa_trabalho
```

Depois disso precisamos configurar o ssh para também entender quando usar uma chave ou outra. Para isso vamos criar um arquivo `config` dentro da pasta `.ssh`:

```bash
cd ~/.ssh
touch config
code config # você pode usar vi, vim, nano, enfim, editor favorito
```

Lá dentro do arquivo é só editar:

```yaml
# Conta pessoal como default
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_pessoal
   
# Conta do trabalho
Host github.com-trabalho  
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_trabalho
```

Ali está como `github`, mas para o `gitlab` é só mudar no `Host` e `Hostname`, você inclusive pode ter diferentes configs de diferentes repositórios remotos no mesmo arquivo.

E aí, sempre que for clonar um repositório, se ele for de trabalho, basta editar na url para ficar de acordo com a estrutura acima:

```bash
git clone git@github.com-trabalho:seu_user/repo_name.git
```

Prontinho, agora sua máquina está configurada para trabalhar com duas contas do Git e assim você não fica misturando usuários e chaves entre coisas pessoais e empresa!

## Conclusão

Espero que este post tenha sido útil e lembrando que qualquer dúvida e/ou sugestão é só me mandar um [tweet](https://twitter.com/Willian_justen).