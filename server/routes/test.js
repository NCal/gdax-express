let deps = require('../misc/deps.js')
let router = deps.router

let test = router.get('/api/test', function (req, res, next) {
  res.json({'goat': 'milk'})
})

module.exports = test
