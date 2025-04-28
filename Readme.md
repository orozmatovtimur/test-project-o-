# Test Project O

Полный стек проекта: **NestJS (backend)** + **Vue (frontend)** + **PostgreSQL** + **Docker Compose**

---

## 📦 Установка

1. Клонировать репозиторий:

```bash
git clone https://github.com/orozmatovtimur/test-project-o-.git
cd test-project-o
```

2. Убедиться, что установлены:

- Docker
- Docker Compose

Проверить версии:

```bash
docker --version
docker-compose --version
```

---

## 📂 Структура проекта

```
test-project-o/
├── api/         # Сервер на NestJS
│   ├── src/
│   ├── ...
│   └── Dockerfile
├── client/      # Клиент на Vue 3 + Vite
│   ├── src/
│   ├── public/
│   ├── ...
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

---

## 🚀 Запуск проекта

1. Построить и запустить контейнеры:

```bash
docker-compose up --build
```

2. Открыть в браузере:

- **Фронтенд:** [http://localhost](http://localhost)
- **Бэкенд API напрямую:** [http://localhost:8000](http://localhost:8000)


- **При развертывании создается пользователь с ролью админ, и через него осуществляется вход в систему изначально:**

- **ivanov@o.kg**
- **timur123**

---

## ⚙️ Особенности настроек

### Backend (NestJS)

- Автоматически подключается к базе PostgreSQL через Docker-сеть.
- При старте автоматически создаётся админ-пользователь.
- Включены CORS-заголовки для поддержки авторизации через токены.

### Frontend (Vue + Nginx)

- Все запросы на `/api/*` автоматически проксируются через Nginx в контейнер `backend` на порт `8000`.
- В коде фронтенда рекомендуется использовать **относительные пути** (`/api/endpoint`), без явного указания `http://api:8000`.

### PostgreSQL

- Все данные сохраняются в Docker volume `postgres_data`.
- При перезапуске контейнера данные сохраняются.

---

## 🛠 Полезные команды Docker

- Остановить контейнеры:

```bash
docker-compose down
```

- Пересобрать контейнеры после изменений:

```bash
docker-compose up --build
```

- Посмотреть логи конкретного сервиса:

```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

---

## ❗ Возможные ошибки и решения

| Ошибка | Решение |
|:------|:--------|
| `net::ERR_NAME_NOT_RESOLVED` | Убедитесь, что в коде фронта все пути пишутся через `/api/`, а не через `http://api:8000`. |
| `CORS error` | Все запросы должны идти через `/api/` и проксироваться через Nginx. Настройка CORS должна быть активирована на бэкенде (`app.enableCors()`). |
| `ECONNREFUSED при подключении к БД` | Бэкенд может стартовать раньше базы данных. Просто перезапустите backend: `docker-compose restart backend`. |

---

## 📋 Замечания

- Все запросы фронтенда должны использовать базовый путь `/api`.
- База данных создается автоматически при первом запуске контейнеров.
- Обязательно используйте `docker-compose down -v`, чтобы сбросить данные при изменении настроек БД.
- Для продакшн-сборки можно дополнительно настроить HTTPS через Nginx.

---

## 📬 Контакты

Если у вас возникли вопросы — создавайте Issue или пишите мне напрямую!

---
