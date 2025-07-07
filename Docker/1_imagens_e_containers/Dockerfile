##Esse é o arquivo responável pela criação da imagem

##Isso representa que ele vai utilizar a imagem base oficial do Noje.js
FROM node  

##Define o diretorio de trabalho dentro do contêiner como /app
WORKDIR  /app

##Copia os arquivos json para o diretório atual no container
COPY package*.json .

## instala as dependencias listadas no package.json
RUN npm install

##Copia todos os arquivos do diretorio atual(host) para o diretório de trabalho no conteiner (/app)
COPY . .

##Diz ao Docker que o conteiner usará a porta 3000
EXPOSE 3000

##Define o comando padrao que será executado quando o contêiner iniciar "node app.js"
CMD ["node", "app.js"]