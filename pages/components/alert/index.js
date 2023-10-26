import React from "react"

const Alert = ({data, setAlert}) => {
  return (
    <div className="alert-container">
      <div className="alert-content">
        <div className="alert-header">
          <h1>{data?.title}</h1>
        </div>
        <div className="alert-main">
          <p className="alert-text">{data?.text}</p>
          <p className="alert-name">{data?.name}</p>
        </div>
        <div className="alert-buttons">
          <button className='alert-confirm' onClick={data?.button}>Confirm</button>
          <button className='alert-cancel' onClick={() => setAlert(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Alert