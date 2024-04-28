// controllers/games.js

// const gamesRouter = require("express").Router();
const { readData, writeData } = require("../utils/data"); // Чтение и запись данных в JSON-файл
const getAllGames = require("../middlewares/games");

// Получим игры из JSON-файла и отправим в ответ на запрос
const sendAllGames = async (req, res) => {

  res.send(req.games);
};

const getGameById = async (req, res) => {
  console.log(req.params);
  const games = await readData("data/games.json");
  if (!games[req.params.id]) {
    res.send(`Такой игры не существует`);
    // Не забудем выйти из функции
    return;
  }
  console.log(games[req.params.id]);
  const { title, description } = games[req.params.id];

  res.send(
    `Новое издание игры - ${title}, откроет для вас новый мир: ${description}`
  );
};
const deleteGame = async (req, res) => {
  console.log(21);
  // Получим данные из файла

  // Прочитаем запрашиваемый id игры из запроса
  const id = Number(req.params.id);
  // Найдём игру, которую хотят удалить, в общем массиве с играми по id
  req.game = req.games.find((item) => item.id === id);

  // Найдём индекс удаляемой игры в общем массиве игр
  const index = req.games.findIndex((item) => item.id === req.game.id);

  // Удалим из массива игр игру
  req.games.splice(index, 1);

  // Запишем обновлённый массив игр в JSON-файл
  await writeData("data/games.json", req.games);
  // Вернём ответ о проделанной операции с данными об играх
  res.send({
    games: req.games,
    updated: req.game,
  });
};

const addGameController = async (req, res) => {
  // Проверяем, есть ли уже в списке игра с таким же названием
  req.isNew = !Boolean(req.games.find((item) => item.title === req.body.title));
  // Если игра, которую хотим добавить, новая (её не было в списке)
  if (req.isNew) {
    // Добавляем объект с данными о новой игре
    const inArray = req.games.map((item) => Number(item.id));
    let maximalId;
    if (inArray.length > 0) {
      maximalId = Math.max(...inArray);
    } else {
      maximalId = 0;
    }
    req.updatedObject = {
      id: maximalId + 1,
      title: req.body.title,
      image: req.body.image,
      link: req.body.link,
      description: req.body.description,
    };
    // Добавляем данные о новой игре в список с другими играми
    req.games = [...req.games, req.updatedObject];
  } else {
    res.status(400);
    res.send({ status: "error", message: "Игра с таким именем уже есть." });
    return;
  }
  // Записываем обновлённый список игр в файл
  await writeData("./data/games.json", req.games);
  // В качестве ответа отправляем объект с двумя полями
  res.send({
    games: req.games, // Обновлённый список со всеми играми
    updated: req.updatedObject, // Новая добавленная игра
  });
};

module.exports = { sendAllGames, getGameById, deleteGame, addGameController };
