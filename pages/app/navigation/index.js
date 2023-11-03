import React, { useState } from "react"
import { MdSchool, MdSpaceDashboard, MdInventory, MdHomeFilled, MdPeople, MdHandyman, MdSettings } from 'react-icons/md'
import { locale } from '../../../public/locale'

const Navigation = ({setContent}) => {
  const [menu, setMenu] = useState([
    { id: 0, text: locale.pt.navigation.requests, icon: <MdSpaceDashboard className="icon" size={35} />, status: true },
    { id: 1, text: locale.pt.navigation.inventory, icon: <MdInventory className="icon" size={35} />, status: false },
    { id: 2, text: locale.pt.navigation.rooms, icon: <MdHomeFilled className="icon" size={35} />, status: false },
    { id: 3, text: locale.pt.navigation.users, icon: <MdPeople className="icon" size={35} />, status: false },
    { id: 4, text: locale.pt.navigation.tools, icon: <MdHandyman className="icon" size={35} />, status: false },
    { id: 5, text: locale.pt.navigation.settings, icon: <MdSettings className="icon" size={35} />, status: false },
  ]);

  const handleMenu = (id) => {
    const novosItens = menu.map((item) =>
      item.id === id ? { ...item, status: true } : { ...item, status: false }
    );
    setMenu(novosItens);
    setContent(id);
  };

  const handleHome = () => {
    window.location.reload()
  }

  return (
    <div className="navigation-container">
      <div className="navigation-logo" onClick={handleHome}>
        <MdSchool className="icon" size={40} />
        <h1>Logo</h1>
      </div>
      <ul className="navigation-menu">
        {menu.map((item) => (
          <li
            key={item.id}
            className={item.status ? 'navigation-menu-item true' : 'navigation-menu-item'}
            onClick={() => handleMenu(item.id)}
          >
            {item.icon}
            <h1>{item.text}</h1>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navigation