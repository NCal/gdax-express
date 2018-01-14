import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'react-router'
import { BrowserRouter, Route, Switch, Redirect, IndexRoute } from 'react-router-dom'
import './styles/style.scss'
import Layout from './components/layout'
import Home from './components/Home'

import { Web3Provider } from 'react-web3'

const App = () => {
  return <div>
      <div className="container">
        <BrowserRouter>
          <Layout>
            {/* <Switch> */}
            <Route path="/" exact render={({ props, history }) => <Home {...props} history={history} />} />
            {/*  <Route path="/contract" render={props => <Contract {...props} />} /> */}
            {/* </Switch> */}
          </Layout>
        </BrowserRouter>
      </div>
    </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
