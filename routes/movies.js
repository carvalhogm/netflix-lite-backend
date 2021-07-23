var express = require('express');
var movies = require("../movies.json")
var router = express.Router();

router.get('/', function(req, res, next) {
  let limit = null;
  if(req.query.category) {
    limit = req.query.limit || 6;
    const filteredMovies = movies.filter((movie) => movie.category === req.query.category).slice(0, limit)
    return res.json({ data: filteredMovies })
  }

  limit = req.query.limit || 3;

  let groupedCategories = {}
  let filteredCategories = []

  movies.map((movie) => {
    if (groupedCategories[movie.category]) {
      if(groupedCategories[movie.category].length < 6) {
        groupedCategories[movie.category].push(movie);
      }
    } else {
      groupedCategories[movie.category] = [movie];
    }
  });

  for(let key in groupedCategories) {
    if(filteredCategories.length < limit) filteredCategories.push({ key, movies: groupedCategories[key]})
    else break;
  }

  return res.json({ data: filteredCategories })
});

module.exports = router;
