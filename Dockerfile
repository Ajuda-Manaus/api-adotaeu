# instalando pacotes essenciais do node
FROM node:6.6

RUN useradd --user-group --create-home app 

ENV HOME=/home/

RUN chown -R app:app $HOME/*

ENV HOME=/home/app

USER app

#WORKDIR $HOME/app/api

ENV NODE_ENV=development

#RUN mkdir -p /app
COPY . $HOME/api
#ADD . /

WORKDIR $HOME/api

USER root

COPY . $HOME/api

RUN chown -R app:app $HOME/*

#USER app

RUN npm install express 
#RUN npm install

#porta da aplicação
EXPOSE 4000

ENTRYPOINT ["npm", "start"]

