import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import Form from './Form'
import Header from './Header'
import data from '../../Data/socketData'
import Orders from './Orders'
// console.log('websocket data', data)

export default class Home extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      coin: 'BTC-USD',
      size: '',
      price: '',
      order: 'Buy',
      stopOrder: false,
      orderType: 'limit', 
      balances: null,
      tickers: null,
      bitcoin: null,
      litecoin: null,
      ethereum: null,
      orders: null,
      orderMessage: ''
    }
  }

  componentDidMount = () => {
    this.getBalance()
    this.getOrders()
    this.socketTickers();
  }

  socketTickers = () => {
    let self = this
    data.socket.addEventListener("message", function(event) {
      let res = JSON.parse(event.data);

      if (res.type === "ticker") {
        switch (res.product_id) {
          case "BTC-USD": {
            data.bitcoin = res.price;
            self.setState({ bitcoin: res.price });
            break;
          }
          case "LTC-USD": {
            data.litecoin = res.price;
            self.setState({ litecoin: res.price });
            break;
          }
          case "ETH-USD": {
            data.eth = res.price;
            self.setState({ ethereum: res.price });
            break;
          }
        }
      }
    });
  }

  getBalance = () => {
    let self = this;
    console.log('get balance')
    axios.get('/api').then((res, error)=>{
      console.log('balances', res.data.account)
      this.setState({balances: res.data.account}, () => {

      })
    })
  }

  getOrders = () => {
    let self = this;
    console.log('get orders')
    axios.get('/api/orders').then((res, error)=>{

      console.log('open orders', res.data.orders)
      this.setState({orders: res.data.orders})
    })
  }

  selectOrderType = (e) =>{
    this.setState({orderType: e.target.value}, ()=>{
      console.log('order type', this.state.orderType)
    })
  }

  selectCoin = (e) =>{
    this.setState({coin: e.target.value}, ()=>{
      console.log('coin state', this.state.coin)
    })
  }

  setSize = (e) => {
    console.log('set size')
    this.setState({size: e.target.value})
  }

  setPrice = (e) => {
    console.log('set price')
    this.setState({price: e.target.value})
  }

  selectOrder = (e) => {
    console.log('select order');
    this.setState({order: e.target.value}, ()=>{
      console.log(this.state.order)
    })
  }

  placeOrder = () => {
    let self = this;
    console.log('place order');
    if (this.state.size !== '' && this.state.price !== '') {
      axios.post('/api/order',{ 
      orderType: this.state.orderType, 
      order: this.state.order, 
      coin: this.state.coin, 
      size: this.state.size, 
      price: this.state.price, 
      stopOrder: this.state.stopOrder })
      .then((response)=>{
        console.log('order response', response)
        console.log('order message', response.data.message);
        self.setState({orderMessage: response.data.message})
        this.getBalance();
        this.getOrders();
      })      
      .catch(function(error) {
        console.log(error)
      })
    } else {
      alert('please enter all fields');
    }
  }

  cancelOrder = (orderId) => {
    let self = this;
    console.log('cancel order', orderId);
    axios.post("/api/cancelorder", {orderId: orderId})
    .then((res) => {
      console.log(res)
      if (res.data === orderId){
        console.log('equal values. should remove.')
        this.getOrders();
        this.getBalance()
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleData = (data) => {
    console.log('handle data');
    console.log(data)
  }

  render () {
    return this.state.balances ? <div>
      <Header balances={this.state.balances} bitcoin={this.state.bitcoin} litecoin={this.state.litecoin} ethereum={this.state.ethereum} />
      <Form size={this.state.size} price={this.state.price} placeOrder={this.placeOrder} selectOrderType={this.selectOrderType} orderType={this.state.orderType} selectCoin={this.selectCoin} setSize={this.setSize} setPrice={this.setPrice} selectOrder={this.selectOrder} placeOrder={this.placeOrder} />
      <p className='order-message'>{this.state.orderMessage}</p>
      {this.state.orders ? <Orders cancelOrder={this.cancelOrder} orders={this.state.orders} /> : <div />}
      </div> : <div>loading</div>
  }
}
