import React from "react"

import Requests from './requests'
import Inventory from './inventory'
import Users from './users'
import Tools from './tools'
import Settings from './settings'

const Main = ({user, content}) => {
  return (
    <div className="main-container">
      <div className="main-content">
        {
          content == 0?<Requests user={user} />:
          content == 1?<Inventory user={user} />:
          content == 2?<Users user={user} />:
          content == 3?<Tools />:
          content == 4?<Settings />:
          <Dashboard />
        }
      </div>
    </div>
  )
}

export default Main