import React from "react"

import Requests from './requests'
import Inventory from './inventory'
import Rooms from './rooms'
import Users from './users'
import Tools from './tools'
import Settings from './settings'
import NotFold from './404'

const Main = ({user, content}) => {
  return (
    <div className="main-container">
      <div className="main-content">
        {
          content == 0?<Requests user={user} />:
          content == 1?<Inventory user={user} />:
          content == 2?<Rooms user={user} />:
          content == 3?<Users user={user} />:
          content == 4?<Tools />:
          content == 5?<Settings />:
          <NotFold />
        }
      </div>
    </div>
  )
}

export default Main