---
layout: default
title: Arquitetura
description: Documentação da arquitetura do novo framework.
order: 02
---

![Diagrama](assets/images/component800.png)


#Módulo

```
POM geral onde configura os repositories, pluginRepositories e distributionManagement.
```
E os módulos:

  - Client
  - Server Back
  - Server Front
  - Tests

##Client

```
Módulo onde fica toda manipulação do front-end, como JS, CSS, LESS, IMG e as bibliotecas externas.
```

Todas as tarefas são orquestradas pelo plugin do maven [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) que realiza as seguintes tarefas:

  - install node and npm
    - Faz o download do node e npm para a pasta node.
  - npm install
    - Executa o install do npm, ou seja instala as dependências do arquivo *package.json*, como descrito abaixo.
  - bower install
    - Executa o install do bower, ou seja instala as dependências do arquivo *bower.json*, como descrito abaixo.
  - gulp less
    - Executa a tarefa optimize-and-copy-less do arquivo gulpfile.js.
    - Pega todos os arquivos da pasta */src/less*, gera um sourceMap\* para cada arquivo, transpila para CSS\*\*, minifica e copia para a pasta */dist/css*.
  - gulp less components
    - Executa a tarefa optimize-and-copy-less-components do arquivo gulpfile.js.
    - Pega todos os arquivos da pasta */src/less/components*, gera um sourceMap\* para cada arquivo, transpila para CSS\*\*, minifica, concatena todos os arquivos no arquivo **components.css** e copia para a pasta */dist/css*.
  - gulp copy-assets
    - Executa a tarefa copy-assets do arquivo gulpfile.js.
    - Copia o arquivo */src/cache.manifest* para */dist/cache.manifest*.
  - gulp optimize-and-copy-css
    - Executa a tarefa optimize-and-copy-css do arquivo gulpfile.js.
    - Pega todos os arquivos da pasta */src/css*, gera um sourceMap\* para cada arquivo, minifica e copia para a pasta */dist/css*.
  - gulp optimize-and-copy-components-js
    - Executa a tarefa optimize-and-copy-components-js do arquivo gulpfile.js.
    - Pega todos os arquivos da pasta */src/components*, gera um sourceMap\* para cada arquivo, realiza o uglify(mifica), concatena todos os arquivos no arquivo **components.js** e copia para a pasta */dist/components*.
  - gulp copy-bower-libs
    - Executa a tarefa optimize-and-copy-bower-libs do arquivo gulpfile.js.
    - Através do plugin mainBowerFiles, é copiado somente os arquivos necessários de cada biblioteca importada pelo bower na pasta */src/lib*, esses arquivos são especificados no arquivo bower.json. Os arquivos são copiados para */dist/lib*.
  - gulp copy-images
    - Executa a tarefa optimize-and-copy-images do arquivo gulpfile.js.
    - Pega todos os arquivos da pasta */src/img*, minifica com o plugin pngcrush e copia para a pasta */dist/img*.

  \* [sourceMap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/?redirect_from_locale=pt): Arquivo gerado para facilitar a legibilidade de arquivos minificados, visto no modo developer dos browsers.

  \*\* [Transpile](https://www.jetbrains.com/phpstorm/help/transpiling-sass-less-and-scss-to-css.html): Atualmente o LESS não é processado pelos Browser, para fazer isso, é necessário convertê-lo para CSS, isso é chamado de transpilação. 


No final é gerado um jar com todo o conteúdo da pasta dist, um WebJar.

####NPM

  Usado para instalar o Bower, Gulp e os módulos do gulp.

####Bower

  - Gerenciador de dependências para front-end, nele são instaladas as bibliotecas externas da aplicação:
    - [awesome-bootstrap-checkbox](https://github.com/flatlogic/awesome-bootstrap-checkbox)
    - [bootstrap](http://getbootstrap.com/)
    - [bootstrap-confirmation2](http://mistic100.github.io/Bootstrap-Confirmation/)
    - [bootstrap-datepicker](https://github.com/eternicode/bootstrap-datepicker)
    - [bootstrap-table](https://github.com/wenzhixin/bootstrap-table)
    - [bootstrap-timepicker](https://github.com/jdewit/bootstrap-timepicker)
    - [bootstrapvalidator](https://github.com/nghuuphuoc/bootstrapvalidator)
    - [font-awesome](http://fontawesome.io/)
    - [jquery](https://jquery.com/)
    - [jQuery-Mask-Plugin](http://igorescobar.github.io/jQuery-Mask-Plugin/)
    - [knockout](http://knockoutjs.com/)
    - [metisMenu](https://github.com/onokumus/metisMenu)
    - [remarkable-bootstrap-notify](http://bootstrap-notify.remabledesigns.com/)
    - [screenfull](http://sindresorhus.com/screenfull.js/)
    - [typeahead.js](http://twitter.github.io/typeahead.js/)

####Gulp

- Realiza tarefas de otimização dos arquivos de CSS, LESS, JS e IMG através dos módulos:
  - [gulp-changed](https://www.npmjs.com/package/gulp-changed)
  - [gulp-concat](https://www.npmjs.com/package/gulp-concat)
  - [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
  - [gulp-less](https://www.npmjs.com/package/gulp-less)
  - [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
  - [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
  - [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
  - [imagemin-pngcrush](https://www.npmjs.com/package/imagemin-pngcrush)
  - [main-bower-files](https://www.npmjs.com/package/main-bower-files)

####Less
 LESS foi escolhido pela facilidade de uso, simplicidade de código, reuso e variáveis.

 - [lesscss.org](http://lesscss.org/)
 - [lesscss.loopinfinito](http://lesscss.loopinfinito.com.br/)
 - [css-facil-flexivel-e-dinamico-com-less](http://blog.caelum.com.br/css-facil-flexivel-e-dinamico-com-less/)

####Knockout
  O Knockout foi escolhido para melhorar o data bind e por sua compatibilidade com o framework Thymeleaf, o Knockout utiliza o pattern [MVVM](http://www.devmedia.com.br/entendendo-o-pattern-model-view-viewmodel-mvvm/18411) para o controle da View.

  - [knockoutjs](http://knockoutjs.com/)
  - [learn.knockoutjs](http://learn.knockoutjs.com/)

##Server Front

```
Módulo onde fica as páginas da aplicação(View) e seus Controladores, arquivo de configuração da aplicação /src/main/resources/config/application.yml, arquivos de internacionalização /src/main/resources/messages/.
```

####ExceptionController
  Controlador que captura todas as exceções do tipo Exception, GenericException e AuthorizationServiceException.

  - handleException
    - Captura as exceções do tipo Exception, printa na console a exceção e direciona para página *exception.html*. 
  - handleBadRequest
    - Captura as exceções do tipo GenericException, prepara e retorna um Json com o erro.
  - handleAuthorizationServiceException
    - Captura as exceções do tipo AuthorizationServiceException, seta o Status da requisição como UNAUTHORIZED e direciona para página *exception.html*

####ServletInitializer
  Configuração para preparação de pacotes war.
####LoginController
  Controlador do Login.
####ModuloEmailSender
  Classe de configuração de envio de email.
####MaskFormat
  Annotation para máscaras.
####Layouts
  - Fragments

    - layout-bar.html

      - Components de "barras" de botões search-group-button, default-crud-bar, modal-group-button-footer e paginationbar.

    - layout-footer.html

      - Layout do Footer.

    - layout-input.html

      - Componentes de "entrada de texto" text-field, text-number-field, number-field e autocomplete.

    - layout-menu-top.html

      - Layout do menu superior.

    - layout-menu.html

      - Layout do menu lateral com todos os menus da aplicação.

    - layout-message.html

      - Componentes de "mensagens" alerts e confirmation.

    - layout-selectable.html

      - Componentes de "seleção" select-field, checkbox-field e radio-field.

    - layout-temporal.html

      - Componentes "temporais" date-field, date-field-periodo e time-field.

    - layout.html

      - Onde fica todos os imports de CSS e JS da aplicação.

  - decorator.html

    Define o layout da aplicação, inserindo os menus superior e lateral, além do footer.

  - index.html

    Página inicial da aplicação.

  - login.html

    Página de login da aplicação.

  - exception.html

    Página de exceção.

  - error.html

    Página de erro, quando ocorre algum erro imprevisto do lado do cliente.

##Server Back

```
Módulo onde fica as configurações de Segurança, Exception e Mensagens, JsonSerializers, Cache.
```

###br.com.mv.geral.controleacesso.authentication.util

#####PasswordEncoderImpl

  - Define o algoritmo de criptografia da senha do usuário.

###br.com.mv.modulo.config

#####CacheConfig

  - Configuração de cache da aplicação.

#####SecurityConfig

  - Configuração de Segurança da aplicação.

###br.com.mv.modulo.exception

#####GenericException

  - Custom Exception para tratar Json.

#####GenericMessages

  - Mensagens Internacionalizadas:
    - getSaveSuccess
      - Retorna mensagem padrão para sucesso no salvar, chave *ctrl.message.success.save*.
    - getDeleteSuccess
      - Retorna mensagem padrão para sucesso no deletar, chave *ctrl.message.success.delete*.
    - getNotFound
      - Retorna mensagem padrão para não encontrado, chave *ctrl.message.error.notfound*.
    - getMessage
      - Recebe uma chave como parâmetro, retorna a mensagem internacionalizada.

###br.com.mv.modulo.model

#####JSON

  - Interface padrão para serialização da entidade em Json.

###br.com.mv.modulo.model.type

#####EnumTipoMensagem

  - Enum que armazena o tipo de mensagem a ser mostrada na tela, de acordo com o tipo muda a cor da mensagem.
  - INFO(azul), ERRO(vermelho), SUCESSO(verde), ATENCAO(amarelo).

###org.springframework.data.convert

  Serializadores e Deserializadores de Json.

  - JsonBooleanDeserializer
  - JsonDateDeserializer
  - JsonDateSerializer


##Tests

```
Módulo fornece todas as dependências necessárias para testar as aplicações:
```

  - spring-security-test
  - selenium-htmlunit-driver
  - spring-boot-starter-test

####TestsConfig

  - Classe abstrata com configuração base para utilização de teste do Spring.

####WebDriverTestsConfig

  - Classe abstrata com configuração base para utilização de teste com Spring e Webdriver.

####AbstractPage

  - Classe padrão para criação de Page Objetcs, páginas para criação de testes de tela.


#Classes Genéricas que facilitam a contrução de CRUDS:

##GenericCrudController

   Classe abstrata com métodos padrões de CRUD para manipulação da view.

   Os Métodos:

 **URIs**

```java 
@RequestMapping(value={"/", "/list"}, method = RequestMethod.GET)
```

  - Instancia um novo objeto.
  - Anula as possíveis páginas da paginação.
  - Direciona para a página de listagem. Ex: testeList.

```java 
@RequestMapping(value="/list", method = RequestMethod.POST)
```
  - Realiza pesquisa paginada chamando o método listModel do Business.
  - A página inicial da pesquisa é 0.
  - A quantidade de elementos da página de pesquisa é 7.
  - Adiciona o resultado no atributo **page**.
  - Adiciona a entidade no model.
  - Retorna para página de listagem.

```java 
@RequestMapping(value="/listPaginated", method = RequestMethod.GET)
```
  - Realiza a pesquisa do componente de paginação.
  - Recebe como parâmetro os atributos:
    - page: Número da página.
    - size: Número de elementos da página.
    - idToRender: ID do elemento da view a ser renderizado no retorno do método, caso seja uma requisição Ajax.
  - Adiciona o resultado no atributo **page**.
  - Adiciona a entidade no model.
  - Retorna para página de listagem.

```java 
@RequestMapping(value="/new", method = RequestMethod.GET)
```
  - Instancia um novo objeto.
  - Direciona para página de criação. Ex: testeForm.

```java 
@RequestMapping(value="/delete", method = RequestMethod.GET)
```
  - Recebe o ID do objeto a ser deletado como parâmetro.
  - Executa o método delete do genericCrudBusiness.
  - Adiciona uma mensagem de sucesso ou de erro no model.
  - Redireciona para o método *returnToList*.

```java 
@RequestMapping(value="/edit", method = RequestMethod.GET)
```
  - Recebe como parâmetro o id do objeto a ser editado.
  - O Spring MVC realiza uma pesquisa (findOne).
  - Adiciona o objeto pesquisado no model.
  - Direciona para página de edição. Ex: testeForm.

```java 
@RequestMapping(value="/save", method = RequestMethod.POST)
```
  - Recebe como parâmetro o objeto a ser salvo.
  - O Spring MVC realiza a validação do objeto com a Entidade, caso existe alguma validação de JPA no modelo.
  - Caso apresente algum erro de validação, é retornado para página de inclusão ou edição.
  - Executa o método save o genericCrudBusiness.
  - Seta o status da sessão para Complete, encerrando-a.
  - Adiciona uma mensagem de sucesso ou de erro no model.
  - Redireciona para o método *returnToList*.

```java 
@RequestMapping(value={"/returnToList"}, method = RequestMethod.GET)
```
  - Instancia um novo objeto.
  - Realiza uma pesquisa paginada.
  - Adiciona o resultado no atributo **page**.
  - Adiciona a entidade no model.
  - Retorna para página de listagem.

 **Métodos**

 *Todos os métodos a seguir podem ser sobrescritos*.

```java 
protected String getFieldToSortList()
```
  - Nome do campo a ser ordenado na pesquisa.
  - Padrão: nulo.

```java 
protected int getDefaultPaginationSize()
```
  - Tamanho da página de pesquisa.
  - Padrão: 7.

```java 
protected String getListPageName()
```
  - Nome da página de listagem.
  - Padrão: nome do objeto minúsculo + "/" + nome do objeto minúsculo + "List". *Ex: teste/testeList*.

```java 
protected String getFormPageName()
```
  - Nome da página de inclusão e edição.
  - Padrão: nome do objeto minúsculo + "/" + nome do objeto minúsculo + "Form". *Ex: teste/testeForm*.

```java 
protected Pageable getPageable(Integer page, Integer size)
```
  - Cria um objeto Pageable, passado para métodos de pesquisa, como returnToList, listPaginated e o list.
  - Recebe como parâmetro:
    - page: Número da página.
    - size: Número de elementos da página.
  - Se o método getFieldToSortList() retornar algum campo para ser ordenado, adiciona esse campo no objeto Pageable.

```java 
protected void instantiateModel(Model model, boolean isList)
```
  - Cria um novo objeto.
  - Adiciona o objeto no model.

```java 
protected boolean isAjax(HttpServletRequest request)
```
  - Verifica se a requisição é Ajax.

####Exemplo de utilização do GenericCrudController

#####*DemoController.java*

```java
@Controller
@RequestMapping("/demo")
@SessionAttributes(types = Demo.class)
public class DemoController extends GenericCrudController<Demo> {
    
    @Autowired
    public DemoController(GenericMessages genericMessages, DemoBusiness demoBusiness) {
        super(genericMessages, demoBusiness);
    }
        
}
```

##GenericCrudBusiness

   Classe abstrata com métodos padrões de CRUD.

   Os Métodos:

```java
@Transactional
public void delete(Long id) {
    repository.delete(id);
}
```

```java
@Transactional
public void save(T t) throws GenericException {
    repository.save(t);
}
```
  - Método save é utilizado tanto para inclusão como para edição.

```java
public abstract Page<T> listModel(T t, Pageable pageable);
```
  - Método abstrato, obrigatório a sua implementação.
  - Define como será realizada a pesquisa da listagem do CRUD.

####Exemplo de utilização do GenericCrudBusiness

#####*DemoBusiness.java*

```java
@Service
@Transactional(readOnly=true)
public class DemoBusiness extends GenericCrudBusiness<Demo, DemoRepository> {

    @Autowired
    public DemoBusiness(DemoRepository demoRepository) {
        super(demoRepository);
    }
    
    @Override
    public Page<Demo> listModel(Demo demo, Pageable pageable) {
        if (StringUtils.isNotBlank(demo.getDescricao())) {
            return repository.findByDescricaoContainingIgnoreCase(demo.getDescricao(), pageable);
        } else {
            return repository.findAll(pageable);
        }
    }
}
```

##GenericCrudRepository

Interface padrão extendida de JpaRepository do Spring Data JPA.

- Hierarquia das interfaces do Spring Data:

  - [JpaRepository](https://github.com/spring-projects/spring-data-jpa/blob/master/src/main/java/org/springframework/data/jpa/repository/JpaRepository.java) -> [PagingAndSortingRepository](https://github.com/spring-projects/spring-data-commons/blob/master/src/main/java/org/springframework/data/repository/PagingAndSortingRepository.java) -> [CrudRepository](https://github.com/spring-projects/spring-data-commons/blob/master/src/main/java/org/springframework/data/repository/CrudRepository.java) -> [Repository](https://github.com/spring-projects/spring-data-commons/blob/master/src/main/java/org/springframework/data/repository/Repository.java)


- Exemplos de uso do Spring Data:
 
  - [UserRepository](https://github.com/spring-projects/spring-data-jpa/blob/master/src/test/java/org/springframework/data/jpa/repository/sample/UserRepository.java)

####Exemplo de utilização do GenericCrudRepository

#####*DemoRepository.java*

```java
@Repository
public interface DemoRepository extends GenericCrudRepository<Demo> {
    
    public Page<Demo> findByDescricaoLikeIgnoreCase(String descricao, Pageable pageable);
    public Page<Demo> findAll(Pageable pageable);

}
```