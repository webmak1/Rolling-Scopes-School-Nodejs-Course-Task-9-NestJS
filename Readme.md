# RS School Task 7 PostgreSQL Typeorm

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

**Можно удалить и ренее созданные объекты docker **

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

**Повторяем, чтобу проверить код**

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

<br/>

## Комментарии к задачам:

:heavy_check_mark: Пароли пользователей сохраняются в базу в виде хэша с использованием bcrypt. +20 баллов.

:heavy_check_mark: Добавлен роут /login, связанная с ним логика разделена между контроллером (middleware) и соответствующим сервисом. В случае отсутствия юзера в БД, возвращается 403 (Forbidden) HTTP статус. +20 баллов.

:heavy_check_mark: JWT токен содержит userId и login, секретный ключ хранится в .env +20 баллов.

:heavy_check_mark: Доступ ко всем роутам, за исключением /login, /doc и /, требует аутентификации +20 баллов.

:heavy_check_mark: Проверка на наличие токена в реквесте реализована в отдельной middleware на уровне приложения.
В случае если токен не валидный, или отсутствует, возвращается 401 (Unauthorized) HTTP статус. +20 баллов.

<br/>

### Штрафы:

:heavy_check_mark: Наличие изменений в тестах либо в workflow минус 100 баллов

:heavy_check_mark: Внесение изменений в репозиторий после дедлайна не считая коммиты, вносящие изменения только в Readme.md минус 30% от максимального балла за задание (для этого задания 30 баллов)

:heavy_check_mark: За каждую ошибку линтера при запуске npm run lint на основе локального конфига -20 баллов (именно errors, не warnings)

:heavy_check_mark: За каждую ошибку компилятора -20 баллов

:heavy_check_mark: Для успешного прохождения тестов обязательно наличие в БД юзера с логином - admin, паролем - admin. Все тесты npm run test:auth должны проходить успешно, каждый не пройденный тест минус 20 баллов.

:heavy_check_mark: Имеются явно указанные типы any, unknown -20 баллов за каждое использование

:heavy_check_mark: За отсутствие отдельной ветки для разработки -20 баллов

:heavy_check_mark: За отсутствие Pull Request -20 баллов

:heavy_check_mark: За неполную информацию в описании Pull Request (отсутствует либо некорректен один из 3 обязательных пунктов) -10 баллов

:heavy_check_mark: Меньше 3 коммитов в ветке разработки, не считая коммиты, вносящие изменения только в Readme.md — -20 баллов
