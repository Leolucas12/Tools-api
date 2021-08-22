# Tools-api
Api para criação de ferramentas e tags. Feita para estudo de backend em relacionamentos no banco de dados, arquitetura e documentação.
## Iniciando o projeto:

 - Criar um banco de dados Postgres
 - Renomear o arquivo ```.env.example``` para ```.env ``` e editar com as configurações do seu banco de dados 
```
//Para instalar as dependências
yarn

//Para executar as migrations
yarn typeorm migration:run

//Para iniciar o projeto
yarn dev

//Versão para produção
yarn build && yarn start
```
Documentação na rota `/docs`
