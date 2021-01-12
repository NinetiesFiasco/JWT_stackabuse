# JWT_stackabuse
Clear Node JS

Токены отправляются с помощью HTTP заголовка Authorization  
Формат: Bearer <token>

## auth.js
* POST `localhost:3000/login` - Войти с помощью логина и пароля (получить refresh и access токены)
* POST `localhost:3000/token` - Обновить access токен при помощи refresh токена
* POST `localhost:3000/logout` - Выйти
 
## books.js
* GET `localhost:4000/books` - Получить все книжки (требуется авторизация)
* POST `localhost:4000/books` - Добавить одну книгу (требуется авторизация и роль admin)


## Запуск
`node auth.js` - сервис авторизации работает на 3000 порту
`node books.js` - книжный сервис работает на 4000 порту
