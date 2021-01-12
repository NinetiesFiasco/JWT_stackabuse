const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const accessTokenSecret = 'youraccesstokensecret'

// MiddleWare требование токена
const authenticateJWT = (req, res, next) => {
  // Ищем заголовок Authorization
  const authHeader = req.headers.authorization

  // Если есть заголовок авторизации выделяем из него токен
  if (authHeader) {
      const token = authHeader.split(' ')[1]

      // Верификация токена
      jwt.verify(token, accessTokenSecret, (err, user) => {
          // Если есть ошибка верификации, то статус 403 Запрещено
          if (err) {
              return res.sendStatus(403)
          }
          // Иначе сохраняем пользователя и запускаем следующий обработчик
          req.user = user
          next()
      })
  } else {
      // Если нет заголовка авторизации, то статус 401 Не авторизован
      res.sendStatus(401)
  }
}

// Получить все книжки (требуется авторизация)
app.get('/books', authenticateJWT, (req,res) => {
  res.json(books)
})

// Добавить книжку (требуется авторизация)
app.post('/books', authenticateJWT, (req,res) => {
  const { role } = req.user

  if (role !== 'admin')
    return res.sendStatus(403)

  const book = req.body
  books.push(book)

  res.send('Book added successfully')
})

app.use(bodyParser.json())

// Запуск сервера
app.listen(4000, () => {
  console.log('Books service started on port 4000')
})

// Массив книжек
const books = [
  {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958
  },
  {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "pages": 784,
      "title": "Fairy tales",
      "year": 1836
  },
  {
      "author": "Dante Alighieri",
      "country": "Italy",
      "language": "Italian",
      "pages": 928,
      "title": "The Divine Comedy",
      "year": 1315
  },
];