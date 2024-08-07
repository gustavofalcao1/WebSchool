import React, {useEffect, useState} from 'react'
import { MdOutlineModeEditOutline, MdDeleteOutline} from 'react-icons/md'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

import Zoom from '../../../../components/zoom';

const Items = ({user, filter, order, editItem}) => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [zoom, setZoom] = useState(false);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "items", itemId))
      console.log(`Item deletado do Firestore com ID: ${itemId}`)
    } catch (error) {
      console.error('Erro ao deletar o item: ', error)
    }
  }

  const zoomPhoto = (e) => {
    const item = {
      photoURL: e,
    };
    setData(item);
    setZoom(true);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'items'), orderBy(order)), (querySnapshot) => {
      const updatedItems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (filter) {
          if (data.type === filter) {
            updatedItems.push({ id: doc.id, ...data })
          }
        } else {
          updatedItems.push({ id: doc.id, ...data });
        }
      });
      setItems(updatedItems);
    });
  
    return () => {
      unsubscribe();
    };
  }, [filter, order]);
  
  return (
    <div className="items-container">
      {zoom && <Zoom data={data} setZoom={setZoom} />}
      <table className="items-table">
        <thead className="items-title">
          <tr>
            <th>{locale.pt.inventory.items.code}</th>
            <th>{locale.pt.inventory.items.img}</th>
            <th>{locale.pt.inventory.items.name}</th>
            <th>{locale.pt.inventory.items.place}</th>
            <th>{locale.pt.inventory.items.type}</th>
            <th>{locale.pt.inventory.items.description}</th>
            <th>{locale.pt.inventory.items.brand}</th>
            <th>{locale.pt.inventory.items.model}</th>
            <th>{locale.pt.inventory.items.sn}</th>
          </tr>
        </thead>
        <tbody className="items-content">
          {items?.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td><img src={item.img} onClick={() => zoomPhoto(item.img)} width={40} height={40} alt='item image' /></td>
              <td>{item.name}</td>
              <td>{item.place}</td>
              <td>{item.type}</td>
              <td>{item.description}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.sn}</td>
              {user?.type=='admin'?
              <td className='items-buttons'>
                <MdOutlineModeEditOutline className='icon' onClick={() => editItem(item)} />
              </td>:null}
              {user?.type=='admin'?
              <td className='items-buttons'>
                <MdDeleteOutline className='icon' onClick={() => handleDelete(item.id)} />
              </td>:null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Items

