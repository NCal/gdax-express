import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'

const Form = (props) => {
  return <div className="order-form">
    <select onChange={props.selectOrder}>
      <option name="Buy">Buy</option>
      <option name="Sell">Sell</option>
    </select>
    <select onChange={props.selectCoin}>
      <option name="BTC-USD">BTC-USD</option>
      <option name="LTC-USD">LTC-USD</option>
      <option name="ETH-USD">ETH-USD</option>
    </select>
    <select onChange={props.selectOrderType}>
      <option name="limit">limit</option>
      <option name="market">market</option>
      {/* <option name="stop">stop</option> */}
    </select>
    <input type="text" name="size" placeholder="size" value={props.size} onChange={props.setSize} />
    {props.orderType === 'limit' ? <input type="text" name="price" placeholder="price" value={props.price} onChange={props.setPrice} />
      : <span></span>}
    <input type="submit" value="place order" onClick={props.placeOrder} />
  </div>
}

export default Form
