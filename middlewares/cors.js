// Список сайтов, которым мы разрешаем обращаться к серверу
const allowedCors = [
  'https://practicum.yandex.ru',
  'https://students-projects.ru',
  'localhost:3000'
];

// Функция, которая принимает объекты req (информация о запросе),
// res (объект ответа) и функцию next (для запуска следующего миддлвара)
function cors(req, res, next) {
    const { origin } = req.headers; // Смотрим, кто стучится к серверу
    if (allowedCors.includes(origin)) { // Если это наш друг,
        res.header('Access-Control-Allow-Origin', origin); // говорим: «Добро пожаловать!»
    }
    
    next(); // Идём дальше, не задерживаем очередь
}

module.exports = cors;
