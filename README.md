# Digital Card - Backend

Цифровая визитка на NestJS, GraphQL, Prisma. Backend отдает профиль, навыки, опыт работы и проекты через GraphQL API с Apollo Sandbox.

## Стек

- Git;
- TypeScript;
- Node.js;
- NestJS;
- Prisma;
- GraphQL;
- Docker.

## Запуск через Docker

1. Скопируйте файл окружения:

   ```bash
   cp .env.example .env
   ```

2. Соберите и запустите контейнеры:

   ```bash
   docker compose up --build
   ```

   При старте контейнера автоматически применяются миграции Prisma и заполняется база данных.

3. Откройте Apollo Sandbox в браузере:

   ```
   http://localhost:3000/graphql
   ```

## Пример запроса

```graphql
query {
  profile {
    name
    description
    skills { name }
    experience { company position }
    projects { name url }
  }
}
```

## Завершение

Сбросить базу и остановить контейнеры. Следующий запуск применит миграцию и заполнит данные:

```bash
docker compose down -v
```
