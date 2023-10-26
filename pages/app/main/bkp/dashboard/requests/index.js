import React, {useEffect, useState} from 'react'
import {getItems, putItem} from '../../../../../../api/firebase'
import { locale } from '../../../../../../public/locale'

const Requests = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await getItems();
      setItems(itemsData);
    };
    
    fetchData();
  }, [])
  
  return (
    <div className="items-container">
      <table className="items-table">
        <thead className="items-title">
          <tr>
            <th onClick={putItem}>{locale.pt.request.table.code}</th>
            <th>{locale.pt.request.table.name}</th>
            <th>{locale.pt.request.table.place}</th>
            <th>{locale.pt.request.table.requester}</th>
            <th>{locale.pt.request.table.requestAt}</th>
            <th>{locale.pt.request.table.returnAt}</th>
            <th>{locale.pt.request.table.note}</th>
          </tr>
        </thead>
        <tbody className="items-content">
          {items?.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.place}</td>
              <td>{item.requester}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Requests

