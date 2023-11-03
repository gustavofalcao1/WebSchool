import React, {useState} from "react"
import { MdSearch, MdNotifications } from 'react-icons/md'
import { RiLogoutCircleRLine} from 'react-icons/ri'
import {locale} from '../../../public/locale'

import Alert from '../../components/alert'

const Header = ({user}) => {
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState(null)

  const handleLogout = () => {
    const item = {
      title: 'Tens a certeza?',
      text: 'Tens a certeza, que queres desconectar da conta:',
      name: user?.displayName,
      button: handleConfirm
    }
    setData(item)
    setAlert(true)
  }

  const handleConfirm = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div className="header-container">
      {alert && <Alert data={data} setAlert={setAlert} />}
      <div className="header-left">
        <input className="header-left-input" placeholder={locale.pt.header.search.placeholder}></input>
        <div className="header-left-search">
          <MdSearch className="icon" size={22} />
        </div>
      </div>
      <div className="header-right">
        <div className="header-right-status">
          <MdNotifications className="icon" size={28} />
        </div>
        <div className="header-right-profile">  
          <div className="header-right-profile-photo">
            <img src={user?.photoURL} />
          </div>
          <h1>{user?.displayName}</h1>
          <RiLogoutCircleRLine className="icon logout" size={22} onClick={handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default Header