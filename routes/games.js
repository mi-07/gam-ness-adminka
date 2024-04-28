// routes/games.js
const gamesRouter = require("express").Router(); // Создали роутер
const { sendAllGames, getGameById, deleteGame, addGameController } = require("../controllers/games"); // Чтение и запись данных в JSON-файл
const { getAllGames } = require("../middlewares/games");

gamesRouter.get("/games", getAllGames, sendAllGames);
gamesRouter.get("/games/:id", getAllGames, getGameById);
gamesRouter.delete("/games/:id", getAllGames, deleteGame);
gamesRouter.post("/games", getAllGames, addGameController)


module.exports = gamesRouter;
