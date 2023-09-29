import React, { useState } from "react"
import { MdSchool, MdSpaceDashboard, MdInventory, MdPeople, MdHandyman, MdSettings } from 'react-icons/md'

const Navigation = ({setContent}) => {
  const [menu, setMenu] = useState([
    { id: 0, text: 'Dashboard', icon: <MdSpaceDashboard size={35} />, status: true },
    { id: 1, text: 'Inventory', icon: <MdInventory size={35} />, status: false },
    { id: 2, text: 'Users', icon: <MdPeople size={35} />, status: false },
    { id: 3, text: 'Tools', icon: <MdHandyman size={35} />, status: false },
    { id: 4, text: 'Settings', icon: <MdSettings size={35} />, status: false },
  ]);

  const handleMenu = (id) => {
    const novosItens = menu.map((item) =>
      item.id === id ? { ...item, status: true } : { ...item, status: false }
    );
    setMenu(novosItens);
    setContent(id);
  };

  return (
    <div className="navigation-container">
      <div className="navigation-logo">
        <MdSchool size={40} />
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