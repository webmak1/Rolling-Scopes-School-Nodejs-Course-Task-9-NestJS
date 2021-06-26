# RS School Task 7 PostgreSQL Typeorm

Привет!

Разрабатывается и тестируется в последней Ubuntu LTS.

Если вы работаете windows и есть gmail аккаунт, работу можно протестировать в бесплатных облаках google.  
https://shell.cloud.google.com/

<br/>

### Запуск

Нужно установить docker и docker-compose.

Скопировать проект.

В каталоге Rolling-Scopes-School-Nodejs-Course-Task-7-PostgreSQL-Typeorm выполнить.

<br/>

```
$ docker-compose up --build
```

<br/>

Чтобы проверить работу, можно подключиться

http://localhost:4000/doc/

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

### Возможные проверки

Запуск приложения и тестов.

<br/>

![Application](/img/pic-01.gif?raw=true)

<br/>

**Ошибки линтера отсутствуют:**

![Application](/img/pic-02.png?raw=true)

<br/>

### Возможно, полезные команды

    $ yarn db:drop
    $ yarn db:create CreateMigrations
    $ yarn db:migrate

<br/>

## Комментарии к задачам:

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxOTgzNTU0LWY0ZjAtNGM1ZS1iZmE1LTQzNWUzNDY3MDVmMSIsImxvZ2luIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCR1NkFBN3ZybFRlbEtyMnluZjhMeHVPYlB1MmZUNGc0aWhWVThCR3VFM1dLMlNJWWFFL1ZsLiIsImlhdCI6MTYyNDcwMDg5M30.BMNoRv1V_voeK5I4hyzuqCubSo89TpJ-OTLF8s9J0qE"
}
```

<br/>

```
$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxOTgzNTU0LWY0ZjAtNGM1ZS1iZmE1LTQzNWUzNDY3MDVmMSIsImxvZ2luIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCR1NkFBN3ZybFRlbEtyMnluZjhMeHVPYlB1MmZUNGc0aWhWVThCR3VFM1dLMlNJWWFFL1ZsLiIsImlhdCI6MTYyNDcwMDg5M30.BMNoRv1V_voeK5I4hyzuqCubSo89TpJ-OTLF8s9J0qE
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
    "id": "5d37b0b1-d5f7-4272-9349-e384c1cffec8",
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
        "id": "71983554-f4f0-4c5e-bfa5-435e346705f1",
        "login": "admin",
        "name": "admin"
    },
    {
        "id": "5d37b0b1-d5f7-4272-9349-e384c1cffec8",
        "login": "user",
        "name": "user"
    }
]
```

<br/>

### Пробуем подключиться пользователем отсутствующем в базе данных fake/fake

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
