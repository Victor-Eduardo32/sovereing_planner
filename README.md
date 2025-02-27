# Sovereing Planner
A powerful and flexible tool designed to optimize personal organization and productivity, allowing efficient planning of tasks, events, and goals.
## 🔥 Introduction
The goal of this project is to provide a comprehensive personal planner that centralizes and simplifies the management of daily activities and personal financial control. It facilitates tracking appointments, tasks, goals, and finances, ensuring more efficient personal organization and more precise financial control.
## ⚙️ Prerequisites
- Node (version 20 or higher)
- Postgres Server (version 17 or higher)
- PgAdmin or another DBMS of your choice

### ⚒️ Installation Guide

This guide assumes that you already know how to install all the listed prerequisites.

Install the `node_modules` dependencies in the front-end:
```
cd front-end
npm i
```
Install the `node_modules` dependencies in the back-end:
```
cd back-end
npm i
```

Then, create you `.env` from the [`.env.example`](.env.example).

```
cp .env.example .env
```

Set the following environment variable with your PostgreSQL details:

```
DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/{DATABASE}?schema={SCHEMA_NAME}"
```

Replace `{PASSWORD}`, `{DATABASE}`, and `{SCHEMA_NAME}` with the appropriate values in the connection string. If you are using a different connection user, change `postgres` to the one you commonly use.

**Remember:** All the above data refers to your personal postgres configuration, so make sure all the data is correct.

If you do not yet have a `JWT_SECRET_KEY` in your `.env`, it is recommended to set a value for the field. It is possible to use it without setting a value, but it may cause some issues with authentication.

And if your database does not yet have the tables, just run the migrations:
```
npx prisma migrate dev
```

If the database does not exist, it will be created automatically.

Now just start the API:

```
npm run dev
```

Then, start the vue:

```
cd front-end
npx quasar dev
```

And that's it, you can now use the application normally at: [http://localhost:9000](http://localhost:9000).

### 💾 Technologies Used
* [Node](https://nodejs.org/pt)
* [Postgres](https://www.postgresql.org)
* [Vue](https://vuejs.org)
* [Quasar Framework](https://quasar.dev)