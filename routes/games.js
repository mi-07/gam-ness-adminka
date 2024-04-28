// routes/games.js
const gamesRouter = require("express").Router(); // Создали роутер
const { sendAllGames, sendGameById, sendUpdatedGames } = require("../controllers/games"); // Чтение и запись данных в JSON-файл
const {
  getAllGames,
  checkIsTitleInArray,
  updateGamesArray,
  updateGamesFile,
  findGameById,
  deleteGame,
} = require("../middlewares/games");

gamesRouter.get("/games", getAllGames, sendAllGames);
gamesRouter.get("/games/:id", getAllGames, checkIsTitleInArray, findGameById, sendGameById);
gamesRouter.delete("/games/:id", getAllGames, findGameById, deleteGame, updateGamesFile, sendUpdatedGames);
gamesRouter.post("/games", getAllGames, checkIsTitleInArray, updateGamesArray, updateGamesFile, sendUpdatedGames);

module.exports = gamesRouter;
