import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'

const Form = (props) => {
  return <div className="orders">
    <h5>Orders</h5>
    <ul>
      {props.orders.map((order, i) => {
        return <li key={order.id}>
          {i + 1}:
          <span> {order.side.toUpperCase()}</span>
          <span>Type: {order.type}</span>
          <span> {order.product_id}</span>
          <span>Price: {`$${Number(order.price).toFixed(2)}`}</span>
          <span>Size: {Number(order.size).toFixed(4)}</span>
          <span>Status: {order.status}</span>
          <span className='cancel-button' onClick={() => props.cancelOrder(order.id)} style={{color: 'blue', cursor: 'pointer'}}>Cancel</span>
        </li>
      })}
    </ul>
  </div>
}

export default Form
