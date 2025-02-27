# Sovereing Planner
Uma ferramenta poderosa e flexível projetada para otimizar a organização e produtividade pessoal, permitindo o planejamento eficiente de tarefas, eventos e metas.
## 🔥 Introdução
O objetivo deste projeto é fornecer um planejador pessoal abrangente que centralize e simplifique o gerenciamento de atividades diárias e o controle financeiro pessoal. Ele facilita o acompanhamento de compromissos, tarefas, objetivos e finanças, garantindo uma organização pessoal mais eficiente e um controle financeiro mais preciso.
## ⚙️ Pré-requisitos 
- Ter o Node (versão 20 ou superior)
- Ter o Postgres Server (versão 17 ou superior).
- Ter o PgAdmin ou outro SGBD de sua preferência.

### ⚒️ Guia de Instalação 

Esse guia parte do presuposto que você já saiba previamente instalar todos os pré-requisitos anteriormente listados.

Instale as dependências do `node_modules` no front-end:
```
cd front-end
npm i
```
Instale as dependências do `node_modules` no back-end:
```
cd back-end
npm i
```

Em seguida, crie seu `.env` a partir do [`.env.example`](.env.example).

```
cp .env.example .env
```

Configure a seguinte variável de ambiente com os dados do seu PostgreSQL:

```
DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/{DATABASE}?schema={SCHEMA_NAME}"
```

Substitua `{PASSWORD}`, `{DATABASE}` e `{SCHEMA_NAME}` pelos valores apropriados na string de conexão. Caso esteja usando outro usuário de conexão, basta alterar o `postgres` para o que você comumente utiliza.

**Lembre-se:** Todos os dados a acima são referentes a sua configuração pessoal do postgres, por isso, certifique-se de que todos os dados estão corretos.

Caso você ainda não possua uma `JWT_SECRET_KEY` em seu `.env`, é recomendável que defina algum valor ao campo. É possível utilizar sem definir um valor, entretando pode causar algumas bangunças em relação a autenticação.

E caso seu banco de dados ainda esteja sem as tabelas, basta realizar as migrations:
```
npx prisma migrate dev
```

Caso não possua o banco de dados criado, ele irá criar automaticamente.

Agora basta inicializar a api:

```
npm run dev
```

Em seguida, inicialize o vue:

```
cd front-end
npx quasar dev
```

e pronto, agora basta utilizar a aplicação normalmente em: [http://localhost:9000](http://localhost:9000).

### 💾 Tecnologias Utilizadas
* [Node](https://nodejs.org/pt)
* [Postgres](https://www.postgresql.org)
* [Vue](https://vuejs.org)
* [Quasar Framework](https://quasar.dev)