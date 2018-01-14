import React from 'react'

const Balance = (props) => {
  return <div className="balance">
    <h6>{props.account.currency}:{Number(props.account.available).toFixed(2)}</h6>
  </div>
}

export default Balance
