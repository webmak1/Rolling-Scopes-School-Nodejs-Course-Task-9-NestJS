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

### Создать пользователя admin/admin

```
$ curl \
-d '{"name": "Admin",
        "login": "admin",
        "password": "admin"}' \
-H "Content-Type: application/json" \
-X POST localhost:4000/users \
| python -m json.tool
```

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTljMGJkYzIzMzBhZmIxNWY5ZDA0NCIsImlhdCI6MTYwMzkxNDc0OX0.JboHbReUuTiEcHGz0S5_XxsciQmPbTTP6KbjGm1OKsw"
}
```

<br/>

### Пробуем получить всех пользователей без token

<br/>

    $ curl -s -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users

<br/>

**Результат - Unauthorized:**  
401

<br/>

### Пробуем получить всех пользователей с неправильным token

    $ curl -s -o /dev/null -w "%{http_code}" \
    -H "Content-Type: application/json" \
    -X GET localhost:4000/users \
    -H "authorization: Bearer ABCDEFGH"

<br/>

**Результат - Unauthorized:**  
401

<br/>

### Пробуем получить всех пользователей с валидным token

```
$ export TOKEN=
```

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
    {
        "id": "5f99bfacc2330afb15f9d043",
        "login": "admin",
        "name": "Admin"
    },
    {
        "id": "5f99c0bdc2330afb15f9d044",
        "login": "user",
        "name": "User"
    },

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

