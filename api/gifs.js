var router = require('express').Router()
var gifs = require('./db.js')

/* GET gifs listing. */
router.get('/gifs', function (req, res, next) {
  res.json(gifs)
})

/* GET a gif by tag. */
router.get('/gifs/tag/:tag', function (req, res, next) {
  var tag = parseInt(req.params.tag)
  if (tag >= 0 && tag < gifs.length) {
    res.json(gifs[tag])
  } else {
    res.sendStatus(404)
  }
})

/* GET a random gif by search. */
router.get('/gifs/:term', function (req, res, next) {
  let term = String(req.params.term).toLowerCase().split('_')
  //Exact search
  let selected = gifs.filter((x) => {
    for (let t of term) {
      if (!x.terms.includes(t)) return false
    }
    return true
  })
  //Word Search
  if (!selected && term.length > 1) {
    selected = gifs.filter((x) => {
      for (let t of term) {
        if (x.terms.includes(t)) return true
      }
      return false
    })
  }
  if (!selected) {
    res.sendStatus(404)
    return
  }
  let ret = selected[Math.floor(Math.random()*selected.length)]
  console.log("Searched: " + req.params.term + " Found: " + (ret?ret.tag:"NIL"))
  res.json(ret)
})

module.exports = router
