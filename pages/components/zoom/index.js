import React from "react"

const Zoom = ({data, setZoom}) => {
  return (
    <div className="zoom-container" onClick={() => setZoom(false)}>
      <img className="zoom-img" src={data?.photoURL} width={500} alt='user image' />
    </div>
  )
}

export default Zoom