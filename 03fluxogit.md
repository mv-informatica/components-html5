---
layout: default
title: Fluxo do Git
description: Fluxo de trabalho com git e versionamento. 
order: 03
---


O nosso fluxo de trabalho foi baseado no [github-flow](https://guides.github.com/introduction/flow/).

  De forma simplista esse fluxo se baseia em:

  1. Criar uma branch para cada feature ou hotfix.
    Ex:
      - feature/manterCadastroCidadao.
      - hotfix/correcaoNullPointerCadastroCidadao.
  2. Trabalhar nessa branch podendo dar um push para o servidor git, para que a branch fique sincronizada.
  3. Deve-se alterar a versão do pom do projeto raiz seguindo a seguinte diretiva:
     - Para alterar a versão primária da aplicação, altera-se o primeiro número da versão. Ex: 1.0.0 para 2.0.0;
       - Essa versão é alterada de acordo com cada ciclo de entrega de cada aplicação.
     - Para alterações que não gerem incompatibilidades, como novas funcionalidades, deve-se alterar o segundo número da versão. Ex: 1.0.0 para 1.1.0;
     - Para correções de erros deve-se alterar o último número da versão. Ex: 1.0.0 para 1.0.1;
  4. Ao finalizar a atividade, é recomendado que além do teste do desenvolvedor, demais interessados também testem nessa branch.
  5. Deve-se solicitar que essa branch seja "incorporada" a branch master através de um pull/merge Request.
     - Caso haja alguma dúvida durante o desenvolvimento, também pode ser feito um pull/merge Request para que outras pessoas possam ajudar.
  6. Ao solicitar um pull/request outro membro da equipe deve ponderar sobre essas alterações e aprovar ou reprovar o request.
  7. Após aprovado, as alterações são incorporadas na branch master (merge), é construído um novo artefato pelo servidor de integração contínua e depois gerada uma tag com a nova versão no servidor de git.


```A branch master está sempre "deployable", ou seja, pronta para ser posta em produção.```

Referências: 

  - [github-flow](http://scottchacon.com/2011/08/31/github-flow.html)

O versionamento da aplicação segue o padrão [semantic version](http://semver.org/).