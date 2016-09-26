<!-- XD TODO -->

## Package.json

https://docs.npmjs.com/cli/run-script



Tive problemas no windows com eslint

npm install -g --save-dev eslint-config-airbnb babel-eslint eslint-plugin-react eslint
 eslint-plugin-import@latest


### Npm shrinkwrap

Um dos problemas que podemos ter com dependêcias no projeto são os módulos dos módulos do projeto, e caso um deles esteja comprometidos isso poderá ocorrer um problema com o módulo principal e consequentemente quebrar o projeto

`npm-shrinkwrap.json`




## Docker 

https://hub.docker.com/_/node/


Comandos básicos

Criar a imagem 

`
docker build -t <nome_da_imagem> <caminho_para_dockerfile>  
`


`
docker build -t node .  
`

Comando para acessar o container

`
docker exec -it <id do container> /bin/bash

`


`
docker run -d -p <porta_host>:<porta_container> --name <nome_container> <nome_imagem>  

`
`
docker run -d -p 4000:4000 --name teste ebb7af871a1a
`


`
docker-compose build //cria a imagem
`

`
docker-compose up // inicia um container
`

http://stefanteixeira.com.br/2015/03/17/comandos-essenciais-docker-monitoramento-containers/

http://www.mundodocker.com.br/o-que-e-dockerfile/


FROM: Informa a partir de qual imagem será gerada a nova imagem, lembrando que em poucos casos (Veremos em posts futuros), uma imagem será gerada se um imagem base;
MAINTAINER: Campo opcional, que informa o nome do mantenedor da nova imagem;
RUN: Especifica que o argumento seguinte será executado, ou seja, realiza a execução de um comando;
CMD: Define um comando a ser executado quando um container baseado nessa imagem for iniciado, esse parâmetro pode ser sobrescrito caso o container seja iniciado utilizando alguma informação de comando, como: docker run -d imagem comando, neste caso o CMD da imagem será sobrescrito pelo comando informado;
LABEL: Adiciona metadados a uma imagem, informações adicionais que servirão para identificar versão, tipo de licença, ou host, lembrando que a cada nova instrução LABEL é criada uma nova layer, o Docker recomenda que você não use muitas LABEL. É possível realizar filtragens posteriormente utilizando essas LABEL.
EXPOSE: Expõem uma ou mais portas, isso quer dizer que o container quando iniciado poderá ser acessível através dessas portas;
ENV: Instrução que cria e atribui um valor para uma variável dentro da imagem, isso é útil para realizar a instalação de alguma aplicação ou configurar um ambiente inteiro.
ADD: Adiciona arquivos locais  ou que estejam em uma url, para dentro da imagem.
COPY: Copia arquivos ou diretórios locais para dentro da imagem.
ENTRYPOINT: Informa qual comando será executado quando um container for iniciado utilizando esta imagem, diferentemente do CMD, o ENTRYPOINT não é sobrescrito, isso quer dizer que este comando será sempre executado.
VOLUME: Mapeia um diretório do host para ser acessível pelo container;
USER: Define com qual usuário serão executadas as instruções durante a geração da imagem;
WORKDIR: Define qual será o diretório de trabalho (lugar onde serão copiados os arquivos, e criadas novas pastas);
ONBUILD: Define algumas instruções que podem ser realizadas quando alguma determinada ação for executada, é basicamente como uma trigger.