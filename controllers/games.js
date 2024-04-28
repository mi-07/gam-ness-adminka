// controllers/games.js

// const gamesRouter = require("express").Router();
const { readData, writeData } = require("../utils/data"); // Чтение и запись данных в JSON-файл

const sendAllGames = (req, res) => {
  res.send(req.games);
};

const sendGameById = async (req, res) => { 
  console.log(req.params);  
  console.log(req.games[req.params.id]); 
  const { title, description } = req.games[req.params.id] || { title: "Идите Вы все", description: "Домой" }; 
 
  res.send( `
    Новое издание игры - ${title}, откроет для вас новый мир: ${description} 
  `); 
};


const sendUpdatedGames = (req, res) => {
  res.send({
    games: req.games,
    updated: req.updatedObject
  });
};

module.exports = { sendAllGames, sendGameById, sendUpdatedGames };
