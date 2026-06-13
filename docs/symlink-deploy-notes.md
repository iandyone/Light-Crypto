# Символические ссылки для деплоя

## Зачем нужны symlink в деплое

При деплое удобно, чтобы nginx всегда смотрел в один стабильный путь, а каждая версия приложения лежала в отдельной директории.

Пример структуры:

```text
/var/www/crypto/releases/12
/var/www/crypto/releases/13
/var/www/crypto/current -> /var/www/crypto/releases/13
```

Nginx можно настроить на стабильный путь:

```nginx
root /var/www/crypto/current;
```

Тогда при деплое не нужно удалять текущую рабочую сборку. Новая сборка загружается в отдельную папку, проверяется, а затем ссылка `current` переключается на новый релиз.

## Основная команда

```bash
ln -sfn /var/www/crypto/releases/13 /var/www/crypto/current
```

Что означает:

- `ln` — создать ссылку.
- `-s` — создать symbolic link, то есть символическую ссылку.
- `-f` — force: заменить существующую ссылку/путь при необходимости.
- `-n` — если `current` уже является symlink на директорию, заменить саму ссылку, а не пытаться создать ссылку внутри директории, на которую она указывает.

После команды получится:

```text
/var/www/crypto/current -> /var/www/crypto/releases/13
```

## Локальная тренировка

Создать две тестовые версии:

```bash
mkdir -p links/1 links/2
echo "release 1" > links/1/index.html
echo "release 2" > links/2/index.html
```

Создать `current`, который указывает на релиз `1`:

```bash
ln -sfn 1 links/current
cat links/current/index.html
```

Переключить `current` на релиз `2`:

```bash
ln -sfn 2 links/current
cat links/current/index.html
```

Откатиться обратно на релиз `1`:

```bash
ln -sfn 1 links/current
cat links/current/index.html
```

Смысл: путь `links/current/index.html` остается одним и тем же, но фактически читает файл то из `links/1`, то из `links/2`.

## Относительные пути легко перепутать

В локальном примере правильная команда:

```bash
ln -sfn 1 links/current
```

Цель `1` считается относительно места, где лежит сама ссылка. Ссылка находится здесь:

```text
links/current
```

Поэтому target `1` означает:

```text
links/1
```

Вот такая команда для нашей задачи обычно неправильная:

```bash
ln -sfn ./links/1/index.html ./links/current
```

Почему:

- она ссылается на файл `index.html`, а не на директорию релиза;
- если `links/current` уже существует как обычная директория, `ln` может создать ссылку внутри нее, а не заменить `current`;
- относительный путь может начать резолвиться не так, как ожидается.

Для деплоя обычно нужна ссылка на директорию релиза:

```text
current -> releases/13
```

а не ссылка на конкретный файл:

```text
current -> releases/13/index.html
```

## На VPS лучше использовать абсолютные пути

В deploy-скриптах на сервере лучше использовать абсолютные пути:

```bash
ln -sfn /var/www/crypto/releases/13 /var/www/crypto/current
```

Так команда не зависит от текущей директории remote shell. Она может быть `/root`, `/home/deploy` или другой.

Проверки тоже лучше писать с абсолютными путями:

```bash
test -f /var/www/crypto/current/index.html
ls -la /var/www/crypto/current
```

## Безопасный deploy flow через symlink

Базовый порядок действий:

1. Загрузить новую сборку в новую release-директорию.
2. Проверить, что нужные файлы реально загрузились.
3. Переключить `current` на новый релиз.
4. Проверить конфиг nginx.
5. Перезагрузить nginx.
6. Сделать health check сайта.

Пример команд на сервере:

```bash
test -f /var/www/crypto/releases/13/index.html
test -d /var/www/crypto/releases/13/static
ln -sfn /var/www/crypto/releases/13 /var/www/crypto/current
nginx -t
nginx -s reload
```

Пример rollback:

```bash
ln -sfn /var/www/crypto/releases/12 /var/www/crypto/current
nginx -s reload
```

Rollback быстрый, потому что старый релиз не удаляется. Мы просто возвращаем ссылку `current` назад.

## Частые ошибки

- Создать `current` как обычную директорию вместо symlink.
- Сослаться на `index.html`, хотя нужна ссылка на директорию релиза.
- Использовать относительный путь, который резолвится не оттуда, откуда ожидалось.
- Копировать новый релиз сразу в активную директорию nginx до проверки файлов.
- Удалять текущий production build до того, как новая сборка загружена и проверена.
- Забыть, что `ln` может создать ссылку внутри существующей директории, если `current` уже является обычной папкой.

