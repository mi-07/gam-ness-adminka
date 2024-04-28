function cors(req, res, next) {
  const { origin } = req.headers;
  const allowedCors = [
    'https://practicum.yandex.ru',
    'https://students-projects.ru',
    'localhost:3000'
  ];
  
  /* res.header('Access-Control-Allow-Origin', '*'); */ // Открываем доступ всем
  if (allowedCors.includes(origin)) { // Если это наш друг
      res.header('Access-Control-Allow-Origin', origin);
  }
  
  next();
}

module.exports = { cors }
