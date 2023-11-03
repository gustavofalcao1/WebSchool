import React, {useState} from "react"

import Header from "./header"
import Navigation from "./navigation"
import Main from "./main"

const App = ({user}) => {
  const [content, setContent] = useState(0)

  return (
    <div className="app-container">
      <Navigation setContent={setContent} />
      <div className="app-content">
        <Header user={user} />
        <Main user={user} content={content} />
      </div>
    </div>
  )
}

export default App