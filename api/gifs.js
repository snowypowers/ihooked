var router = require('express').Router()
var gifs = require('./db.js')
var relations = require('./relations.js')

function matchAllTerms(term) {
  return gifs.filter((x) => {
    for (let t of term) {
      if (!x.terms.includes(t)) return false
    }
    return true
  })
}

function matchOneTerm(term) {
  return gifs.filter((x) => {
    for (let t of term) {
      if (x.terms.includes(t)) return true
    }
    return false
  })
}

function matchRelatedTerms(term) {
  let related = []
  if (term.length == 0) return []
  for (let t of term) {
    related = related.concat(relations[t])
  }
  let results = []
  if (related.length == 0) return []
  results = results.concat(matchOneTerm(related))
  return results
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

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
  let selected = matchAllTerms(term)
  //Word Search
  if (selected.length == 0 && term.length > 1) {
    selected = matchOneTerm(term)
  }
  if (selected.length == 0) {
    res.sendStatus(404)
    return
  }
  console.log("SELECTED: " + selected.length)
  //Multiple Query
  let ret = selected[Math.floor(Math.random() * selected.length)]
  if (req.query.count) {
    let count = parseInt(req.query.count)
    if (selected.length > count/2) selected = selected.slice(0, Math.floor(count/2))
    let related = matchRelatedTerms(term)
    console.log("RELATED: " + related.length)
    if (related.length > count/2) related = related.slice(0, Math.floor(count/2))
    ret = selected.concat(related)
  }
  console.log("Searched: " + req.params.term + " Found: " + (ret.length? ret.length: ret))
  res.json(ret)
})


module.exports = router
