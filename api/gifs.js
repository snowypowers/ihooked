var router = require('express').Router()

const gifs = [
  {
    tag: 0,
    terms: ["a", "b"],
    link: "https://media.giphy.com/media/Ssp4nSr5YkM8g/giphy.gif",
    blurb: "Hi this is a blurb 0"
  },
  {
    tag: 1,
    terms: ["a","c"],
    link: "https://media.giphy.com/media/sFhRQMzT8ag6Y/giphy.gif",
    blurb: "Hi this is a blurb 1"
  },
  {
    tag: 2,
    terms: ["a", "b"],
    link: "https://media.giphy.com/media/rFA5aTDGXmHOU/giphy.gif",
    blurb: "Hi this is a blurb 2"
  },
  {
    tag: 3,
    terms: ["a", "b","c"],
    link: "https://media.giphy.com/media/xbAmZlEGejTDG/giphy.gif",
    blurb: "Hi this is a blurb 3"
  }
]

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

  let term = String(req.params.term).split('_')
  let selected = gifs.filter((x) => {
    for (let t of term) {
      if (!x.terms.includes(t)) return false
    }
    return true
  })
  let ret = selected[Math.floor(Math.random()*selected.length)]
  console.log("Searched: " + req.params.term + " Found: " + (ret?ret.tag:"NIL"))
  res.json(ret)
})

module.exports = router
