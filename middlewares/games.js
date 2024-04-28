const { readData } = require("../utils/data"); // Чтение и запись данных в JSON-файл

const getAllGames = async (req, res, next) => {
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
  next();
};

module.exports = { getAllGames };
