
# Golden Raspberry Awards

A aplicação lê um arquivo .CSV e faz o load em uma base em memória ao iniciar a aplicação.
Também obtem o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido.


## Instalação

Configurando a inicialização do projeto

```bash
Configurações: 
NodeJS v20+ LTS
Após clonar o projeto acesse a pasta filmes-app
```
Instalando dependencias
```bash
filmes-app> npm i
```    
Verifique se o arquivo .CSV está na pasta:
```bash
./src/files/movielist.csv

(mantenha o padrão do nome do arquivo).
```  
Inicializar o projeto
```bash
Execute no terminal o comando desejado:
filmes-app> npm run start  <--- Inicialização default
filmes-app> npm run dev    <--- Inicialização utilizando nodemon
filmes-app> npm run test   <--- Realiza o teste utilizando a lib Mocha
```  
## Documentação da API

#### Retorna os itens

```http
  GET localhost:3000/produtores
```


#### Retorna o seguinte modelo JSON
```javascript
{
   "min":[
      {
         "producer":"Producer 1",
         "interval":1,
         "previousWin":2008,
         "followingWin":2009
      },
      {
         "producer":"Producer 2",
         "interval":1,
         "previousWin":2018,
         "followingWin":2019
      }
   ],
   "max":[
      {
         "producer":"Producer 1",
         "interval":99,
         "previousWin":1900,
         "followingWin":1999
      },
      {
         "producer":"Producer 2",
         "interval":99,
         "previousWin":2000,
         "followingWin":2099
      }
   ]
}
```
#### Realizar testes

```
  Para realizar os testes com o comando NPM RUN TEST, é necessario antes deixar rodando 
  a aplicação em outro terminal com o comando NPM RUN DEV.
```
