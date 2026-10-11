# Express Test — Mini Todo Lab

![_.jpg](_.jpg)

Учебный проект: список задач на двух Express-серверах за reverse proxy Caddy, фронтенд на jQuery и Bootstrap.
Цель — потренировать HTTP, Express, проксирование и работу с `$.ajax`.

## Архитектура

```
Браузер → Caddy (:8080) → Express API 1 (:3001)  — чтение и создание (GET, POST)
                        → Express API 2 (:3002)  — изменение и удаление (PATCH, DELETE)
                        → site/ (статика)
```

Оба сервера читают и пишут один файл `data/tasks.json` через `data/store.js`.

## Стек

- Node.js, Express 5
- Caddy 2 (reverse proxy, статика, сжатие)
- jQuery, Bootstrap 5
- nodemon для разработки

## Запуск

Нужны Node.js и [Caddy](https://caddyserver.com/docs/install).

```bash
npm install

npx nodemon servers/express_api_one.js
npx nodemon servers/express_api_two.js
caddy run --config Caddyfile        # после правок: caddy reload --config Caddyfile
```

Приложение открывается на http://localhost:8080.

## Структура

```
Caddyfile                    — конфиг Caddy
data/store.js                — чтение и запись tasks.json
data/tasks.json              — хранилище задач
servers/express_api_one.js   — API 1
servers/express_api_two.js   — API 2
site/                        — index.html, script.js, style.css
```

## Роуты

Все запросы идут через Caddy на `localhost:8080`.

| Метод  | Роут                    | Сервер | Назначение            |
|--------|-------------------------|--------|-----------------------|
| GET    | `/health/api1`          | API 1  | проверка сервера      |
| GET    | `/health/api2`          | API 2  | проверка сервера      |
| GET    | `/api/tasks`            | API 1  | список задач          |
| GET    | `/api/tasks/:id`        | API 1  | одна задача           |
| POST   | `/api/tasks`            | API 1  | создать задачу        |
| PATCH  | `/api/manage/tasks/:id` | API 2  | изменить задачу       |
| DELETE | `/api/manage/tasks/:id` | API 2  | удалить задачу        |

Формат задачи:

```json
{ "id": 1, "title": "Изучить Caddy", "completed": false }
```

## Статус

Проект в разработке: базовые операции и интерфейс дорабатываются.
