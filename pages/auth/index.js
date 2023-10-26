import React from "react"

import Login from './login'

const Main = ({setIsAuth}) => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <Login setIsAuth={setIsAuth} />
      </div>
    </div>
  )
}

export default Main