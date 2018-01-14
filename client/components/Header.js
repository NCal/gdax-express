import React from 'react'
import Balance from './Balance'

const Header = (props) => {
  return <div className="header">
    <div className="ticker-header">
      <h5 style={{ display: 'inline', color: '#fff' }}>
        <img src="../images/trend.svg" /> &nbsp;
          BTC: {Number(props.bitcoin).toFixed(2)} &nbsp; LTC: {Number(props.litecoin).toFixed(2)} &nbsp; ETH: {Number(props.ethereum).toFixed(2)}
      </h5>
    </div>
    <div className="balance-header" style={{ backgroundColor: '#444' }}>
      <img src="../images/dollar.svg" /> &nbsp;
      <h6 style={{ display: 'inline', color: '#fff' }}>Balances: </h6>
      {props.balances.map(account => {
        return <Balance account={account} className="balance" key={account.currency} />
      })}
    </div>
  </div>
}
export default Header
