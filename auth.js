const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const accessTokenSecret = 'youraccesstokensecret'

const refreshTokenSecret = 'yourrefreshtokensecretthere'
const refreshTokens = []


// ПОЛУЧИТЬ ТОКЕНЫ ПО ЛОГИНУ И ПАРОЛЮ
app.post('/login',(req,res)=> {
  const {username, password } = req.body

  // Поиск пользователя в массиве 
  const user = users.find( u=> {return u.username === username && u.password === password})

  // Если найден генерируем токены, сохраняем refresh токен и отправляем пользователю
  if (user) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret)
    const refreshToken = jwt.sign({ username: user.username, role: user.role}, refreshTokenSecret)

    refreshTokens.push(refreshToken)

    res.json({
      accessToken,
      refreshToken
    })
  } else {
    // Иначе сообщаем об ошибке
    res.send('Username or password incorrect')
  }

})

// ОБНОВЛЕНИЕ ТОКЕНОВ
app.post ('/token', (req,res) => {
  const { token } = req.body
  // Если токена нет, то статус 401 Не авторизован
  if (!token) {
    return res.sendStatus(401)
  }

  // Если рефреш токена нету в кэше, то статус 403 Запрещено
  if (!refreshTokens.includes(token)){
    return res.sendStatus(403)
  }

  jwt.verify(token, refreshTokenSecret, (err,user) => {
    // Если ошибка верификации, то статус 403 Запрещено
    if (err) {
      return res.sendStatus(403)
    }
    // Иначе генерим аксес токен и отправляем
    const accessToken = jwt.sign({ username: user.name, role: user.role}, accessTokenSecret, { expiresIn: '20m'})
    res.json({
      accessToken
    })
  })
})

// ВЫЙТИ 
app.post('/logout', (req,res) => {
  const {token} = req.body 
  refreshTokens = refreshTokens.filter(token => t !== token )

  res.send('Logout successful')
})

app.use(bodyParser.json())
// Запуск сервера
app.listen(3000, ()=>{
  console.log('Authentication service started on port 3000')
})

// массив пользователей !!! пароль нада хранить в захешированном виде !!!
const users = [
  {
    username: 'john',
    password: 'password123admin',
    role: 'admin'
  },{
    username: 'anna',
    password: 'password123member',
    role: 'member'
  }  
]