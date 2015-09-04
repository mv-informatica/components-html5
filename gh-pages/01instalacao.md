---
layout: default
title: Instalação
description: Instalação do ambiente de desenvolvimento. 
order: 01
---

1.Instalar o Java Development Kit 8:

 - [JDK 8 Download](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

2.Maven

  - [Maven Download](https://maven.apache.org/download.cgi?Preferred=ftp://mirror.reverse.net/pub/apache/)
  - Baixar e descompactar na pasta *C:\ambiente_desenvolvimento\Apache* renomear para maven- (número da versão baixada). Ex: maven-3.3.3

3.Git

  - [Git Download](https://git-scm.com/downloads)
  - Ferramenta visual para administrar os repositórios Git.
    - Source Tree [Download](https://www.sourcetreeapp.com/download/)

4.Spring Tool Suite

  - [Spring Tool Suite Download](https://spring.io/tools/sts/all)

5.Lombok

  - A instalação do plugin do Lombok, é necessária para a IDE "entender" o framework, evitando erros de compilação.
  - [Lombok Download](https://projectlombok.org/downloads/lombok.jar)
  - Executar o jar e adicionar o caminho do executável do Spring Tool Suite.
  - Documentação de instalação do site do framework [installation](http://jnb.ociweb.com/jnb/jnbJan2010.html#installation).

6.Thymeleaf Eclipse Plugin(facilitar auto-complete do framework)

  - In Eclipse, go to Help >> Install New Software... then either use the update site URL, or download a ZIP archive of the plugin from SourceForge:
  - Update site URL: http://www.thymeleaf.org/eclipse-plugin-update-site/

7.Importar o projeto no Spring Tool Suite:

  - Botão direito opção Import - Maven - Existing Maven Project - adicionar o caminho do projeto baixado di repositório git.

8.Para executar o projeto utilizando o tomcat embarcado:

  - Botão direito em cima do projeto: Run as - Spring Boot. 


 ```Verificar instalação do Java 8 no Spring Tool Suite: Menu Window -> Preferences -> Java -> Installed JREs```

 ```Verificar instalação do Maven no Spring Tool Suite: Menu Window -> Preferences -> Maven -> Installations```