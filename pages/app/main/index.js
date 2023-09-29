import React from "react"

import Dashboard from './dashboard'
import Inventory from './inventory'
import Users from './users'
import Tools from './tools'
import Settings from './settings'

const Main = ({content}) => {
  return (
    <div className="main-container">
      <div className="main-content">
        {
          content == 0?<Dashboard />:
          content == 1?<Inventory />:
          content == 2?<Users />:
          content == 3?<Tools />:
          content == 4?<Settings />:
          <Dashboard />
        }
      </div>
    </div>
  )
}

export default Main