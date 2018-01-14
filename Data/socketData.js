const data = {
  socket: new WebSocket('wss://ws-feed.gdax.com'),
  subscription: {
    type: 'subscribe',
    product_ids: ['BTC-USD', 'LTC-USD', 'ETH-USD'],
    channels: [
      // 'level2', <-- turn that on to see order
      // 'heartbeat'
      {
        name: 'ticker',
        product_ids: ['BTC-USD', 'LTC-USD', 'ETH-USD'] // <--  fills aka price
      }
    ]
  }
}

data.socket.addEventListener('open', function (event) {
  data.socket.send(JSON.stringify(data.subscription))
})

export default data
