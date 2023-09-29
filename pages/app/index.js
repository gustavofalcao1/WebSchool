import React, {useState} from "react"

import Header from "./header"
import Navigation from "./navigation"
import Main from "./main"

const App = () => {
  const [content, setContent] = useState(0)

  return (
    <div className="app-container">
      <Header />
      <Navigation setContent={setContent} />
      <Main content={content} />
    </div>
  )
}

export default App