# RS School Task 9 NestJS

Привет!

Разрабатывается и тестируется в последней Ubuntu LTS.

Если вы работаете в windows и есть gmail аккаунт, работу можно протестировать в бесплатных облаках google.  
https://shell.cloud.google.com/

<br/>

### Запуск

Нужно установить <a href="//sysadm.ru/devops/containers/docker/setup/ubuntu/">docker и docker-compose</a>.

Клонировать проект. Ветка dev уже установлена по умолчанию.

В каталоге Task-8-Authentification-JWT выполнить.

<br/>

```
$ docker-compose up --build
```

<br/>

**Ожидаемый результат**

<br/>

![Application](/img/pic-01.gif?raw=true)

<br/>

Чтобы проверить работу, можно запустить тесты

```
$ npm run test:auth
```

<br/>

Чтобы запускать миграции c локального хоста, нужно в /etc/hosts прописать.
(В данном случае, это не требуется. Миграции запускаются в контейнере при старте.)

```
127.0.0.1·postgres
```

<br/>

### Остановка и удаление

```
^CTRL + C
```

```
$ docker-compose rm
```

<br/>

**Можно удалить и ренее созданные объекты docker**

```
$ docker system prune -a
$ docker container prune
$ docker image prune -a
$ docker volume prune
$ docker network prune
```

<br/>

### Возможно, полезные команды

```
$ yarn db:drop
$ yarn db:create CreateMigrations
$ yarn db:migrate
$ yarn db:seed
```

<br/>

## Комментарии к задачам:

:heavy_check_mark: Guards должны использоваться для работы с авторизацией/аутентификацией +30 баллов

:heavy_check_mark: В приложении должны использоваться модули для разбиения структуры приложения на различные части (User, Board, Task) +30 баллов

:heavy_check_mark: Exception filters должны использоваться для обработки исключений в приложении +30 баллов

:heavy_check_mark: @nestjs/typeorm должен использоваться для работы с базой данных +30 баллов

:heavy_check_mark: Для логирования может использоваться встроенный Logger или кастомная имплементация. +30 баллов

:heavy_check_mark: Все внешние зависимости для модулей/классов должны предоставляться с помощью механизма dependency injection. +30 баллов

:heavy_check_mark: В зависисимости от env переменной USE_FASTIFY Nest.js должен использовать или express или fastify +30 баллов

:heavy_check_mark: Необходимо сравнить производительность Nest.js с использованием express и fastify (можно использовать для этих целей artillery) +30 баллов

<br/>

### Возможные проверки

<br/>

### Логин пользователем admin/admin

```
$ curl \
    -d '{"login": "admin",
            "password": "admin"}' \
    -H "Content-Type: application/json" \
    -X POST localhost:4000/login \
    | python -m json.tool
```

<br/>

**Возвращает токен:**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MWI0Yjg0LWFjNDItNDQ1NS1iZjZkLWQ5OWMzNmMzOWQ4MiIsImxvZ2luIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCR1NkFBN3ZybFRlbEtyMnluZjhMeHVPYlB1MmZUNGc0aWhWVThCR3VFM1dLMlNJWWFFL1ZsLiIsImlhdCI6MTYyNDcwNjIwNn0.UDq8dBHsEPHIVgOrQ093egunpV_QlUhPhrYt1i4ii6s"
}
```

<br/>

```
$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MWI0Yjg0LWFjNDItNDQ1NS1iZjZkLWQ5OWMzNmMzOWQ4MiIsImxvZ2luIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCR1NkFBN3ZybFRlbEtyMnluZjhMeHVPYlB1MmZUNGc0aWhWVThCR3VFM1dLMlNJWWFFL1ZsLiIsImlhdCI6MTYyNDcwNjIwNn0.UDq8dBHsEPHIVgOrQ093egunpV_QlUhPhrYt1i4ii6s
```

<br/>

### Создать пользователя user/user

```
$ curl \
    -d '{"name": "user",
            "login": "user",
            "password": "user"}' \
    -H "Content-Type: application/json" \
    -H "authorization: Bearer ${TOKEN}" \
    -X POST localhost:4000/users \
    | python -m json.tool
```

<br/>

**возвращает:**

```
{
    "id": "705ca36e-b7db-4aca-9e1d-199422f83f59",
    "login": "user",
    "name": "user"
}
```

<br/>

### Пробуем получить всех пользователей без token

<br/>

```
$ curl -s -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users
```

<br/>

**Результат - Unauthorized:**  
401

<br/>

### Пробуем получить всех пользователей с неправильным token

<br/>

```
$ curl -s -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users \
    -H "authorization: Bearer ABCDEFGH"
```

<br/>

**Результат - Unauthorized:**  
401

<br/>

### Пробуем получить всех пользователей с валидным token

<br/>

```
$ curl \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users \
    -H "authorization: Bearer ${TOKEN}" \
    | python -m json.tool
```

<br/>

**Результат:**

```
[
    {
        "id": "751b4b84-ac42-4455-bf6d-d99c36c39d82",
        "login": "admin",
        "name": "admin"
    },
    {
        "id": "705ca36e-b7db-4aca-9e1d-199422f83f59",
        "login": "user",
        "name": "user"
    }
]
```

<br/>

**Повторяем, чтобы проверить код**

```
$ curl -s -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users \
    -H "authorization: Bearer ${TOKEN}" \
    | python -m json.tool
```

<br/>

**Результат - OK:**  
200

<br/>

### Пробуем подключиться пользователем, отсутствующим в базе данных fake/fake

```
$ curl -s -o /dev/null -w "%{http_code}"  \
    -d '{"login": "fake",
            "password": "fake"}' \
    -H "Content-Type: application/json" \
    -X POST localhost:4000/login
```

<br/>

**Возвращает Forbidden:**  
403

<br/>

```

$ export USER_ID=d55f78af-5ac1-459f-b376-6a50e086aee3

// GET USER BY ID
$ curl \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users/${USER_ID} \
    -H "authorization: Bearer ${TOKEN}" \
    | python -m json.tool
```

<br/>

### Шаги по созданию

<br/>

    $ npm install -g @nestjs/cli
    $ npm install -g typescript

<br/>

    $ cd app/server
    $ nest new .

<br/>

    $ nest generate resource users
    $ nest generate resource tasks
    $ nest generate resource boards
    $ nest generate resource login

<br/>

    $ yarn add typeorm bcryptjs pg
    $ yarn add @nestjs/typeorm

<br/>

### Artillery

    $ npm install -g artillery@latest\
    $ artillery --version

    // $ DEBUG=http:response artillery run artillery.yml --output report.json
    $ artillery run artillery.yml --output report.json

    $ artillery report report.json

<br/>

Или загрузить файл на сайт:

https://reportviewer.artillery.io/
