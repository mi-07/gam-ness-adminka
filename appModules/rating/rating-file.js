const fs = require("fs").promises;

/**
 * path — путь к файлу
 * array — список игр
 */
async function makeRatingFile(path, array) {
  // Читаем содержимое файла по пути path. ratingFile — строка со всем содержимым файла
  const ratingFile = await fs.readFile(path, "utf8");
  // Так как ratingFile — строка, то преобразуем её в json
  const ratingArray = JSON.parse(ratingFile);

  // Код далее повторяем для каждой игры из списка игр
  array.forEach((item) => {
    // Если в ratingArray ещё нет игры с таким id,
    if (!ratingArray.find((el) => el.id === item.id)) {
      let obj = {
        id: item.id,
        title: item.title,
        image: item.image,
        link: item.link,
        description: item.description,
        rating: 0,
      };
      // добавляем её к уже существующему списку игр
      ratingArray.push(obj);
    }
  });

  // Обновим список игр в файле по пути path, записав туда обновлённый массив ratingArray
  await fs.writeFile(path, JSON.stringify(ratingArray));
}

module.exports = makeRatingFile;
