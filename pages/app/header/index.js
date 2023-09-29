import React from "react"
import { MdSearch, MdNotifications, MdOutlineArrowDropDown } from 'react-icons/md'

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-left">
        <input className="header-left-input" placeholder="Search bar, type what u find..."></input>
        <div className="header-left-search">
          <MdSearch size={22} />
        </div>
      </div>
      <div className="header-right">
        <div className="header-right-status">
          <MdNotifications size={22} />
        </div>
        <div className="header-right-profile">  
          <div className="header-right-profile-photo"></div>
          <h1>Gustavo Falcão</h1>
          <MdOutlineArrowDropDown size={18} />
        </div>
      </div>
    </div>
  )
}

export default Header