// routes/games.js
const gamesRouter = require("express").Router(); // Создали роутер
const { readData, writeData } = require("../utils/data"); // Чтение и запись данных в JSON-файл

// Получим игры из JSON-файла и отправим в ответ на запрос
const getAllGames = async (req, res) => {
  const games = await readData("data/games.json");
  if (!games) {
    res.status(400);
    res.send({
      status: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  console.log(req.params);

  req.games = games;
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
  
  res.send(`Новое издание игры - ${title}, откроет для вас новый мир: ${description}`);
}
const deleteGame = async (req, res) => {
  console.log(21);
  // Получим данные из файла
  const games = await readData("data/games.json");
  console.log(games);
  if (!games) {
    res.status(400);
    res.send({
      status: "error",
      message: "Нет игр в базе данных. Добавьте игру.",
    });
    return;
  }
  req.games = games;

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

gamesRouter.get("/games", getAllGames);
gamesRouter.get("/games/:id", getGameById);
gamesRouter.delete("/games/:id", deleteGame);

module.exports = gamesRouter;
