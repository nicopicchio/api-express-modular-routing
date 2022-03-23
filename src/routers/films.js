const express = require('express');
const router = express.Router();
const data = require('../../data');

router.get('/', (req, res) => {
  res.json({films: data.films});
})

router.delete('/:id', (req, res) => {
  const filmToDelete = data.films.find(film => film.id === parseInt(req.params.id))
  if (!filmToDelete) {
    res.status(404)
    res.json({error: 'film not found'});
    return
  }
  data.films = data.films.filter(film => film.id !== filmToDelete.id)
  res.json({films: filmToDelete});
})

router.put('/:id', (req, res) => {
  const existingFilm = data.films.find(film => film.id === parseInt(req.params.id))
  if (!existingFilm) {
    res.status(404)
    res.json({error: 'film not found'})
    return
  }
  if (!req.body.title) {
    res.status(400)
    res.json({error: 'title not provided'})
    return
  }
  if (!req.body.director) {
    res.status(400)
    res.json({error: 'director not provided'})
    return
  }
  existingFilm.title = req.body.title
  existingFilm.director = req.body.director
  res.json({film: existingFilm})
})



module.exports = router