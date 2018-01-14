const express = require('express')
const router = express.Router()
const Gdax = require('gdax')
const Crypto = require('crypto')
const hush = require('../../private/hush')

const apiURI = 'https://api.gdax.com'
let timestamp = Date.now()
const method = 'GET'
const requestPath = '/accounts'

const what = timestamp + method + requestPath

const key = hush.key // change to your own key
const secret = hush.secret // change to your own secret
const passphrase = hush.passphrase // change to your own passphrase
const hashedSecret = Buffer(hush.secret, 'base64')

// let hmac = Crypto.createHmac('sha256', hashedSecret)
// let test = hmac.update(what).digest('base64')
let data
let connected

const publicClient = new Gdax.PublicClient()
const authedClient = new Gdax.AuthenticatedClient(
  key,
  hashedSecret,
  passphrase,
  apiURI
)

// GET private
router.get('/api', function (req, res, next) {
  authedClient.getAccounts((error, response, account) => {
    console.log('getting accounts')
    if (error) {
      console.log(error)
      connected = false
    } else {
      console.log('private account')
      // console.log(account)
      connected = true
      res.send({account: account})
    }
  })
})

router.get('/api/orders', function (req, res, next) {
  authedClient.getOrders((error, response, orders) => {
    console.log('getting orders')
    if (error) {
      console.log(error)
    } else {
      console.log('orders')
      res.send({ orders: orders })
    }
  })
})

// POST buy / sell
router.post('/api/order', function (req, res, next) {
  console.log('order', req.body)

  let orderParams = {
    type: req.body.orderType,
    price: req.body.price,
    size: req.body.size,
    product_id: req.body.coin
  }

  if (req.body.order === 'Buy') {
    console.log('its a buy order')
    authedClient.buy(orderParams, (error, response, order) => {
      if (error) {
        console.log(error)
      } else {
        console.log('order successful', order)
        res.json(order)
      }
    })
  }

  if (req.body.order === 'Sell') {
    console.log('its a sell order')
    authedClient.sell(orderParams, (error, response, order) => {
      if (error) {
        console.log(error)
      } else {
        console.log('order successful', order)
        res.json(order)
      }
    })
  }
})
// Cancel order
router.post('/api/cancelorder', (req, res, next) => {
  console.log(req)
  authedClient.cancelOrder(req.body.orderId, (error, response, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data[0])
    }
  })
})

module.exports = router
