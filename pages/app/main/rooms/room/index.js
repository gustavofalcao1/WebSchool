import React, {useEffect, useState} from 'react'
import { MdOutlineModeEditOutline, MdDeleteOutline} from 'react-icons/md'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, doc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

const Room = ({user, filter, order, editRoom}) => {
  const [rooms, setRooms] = useState([]);

  const handleDelete = async (roomId) => {
    try {
      await deleteDoc(doc(db, "rooms", roomId))
      console.log(`Item deletado do Firestore com ID: ${roomId}`)
    } catch (error) {
      console.error('Erro ao deletar o item: ', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'rooms'), orderBy(order)), (querySnapshot) => {
      const updatedrooms = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (filter) {
          if (data.type === filter) {
            updatedrooms.push({ id: doc.id, ...data })
          }
        } else {
          updatedrooms.push({ id: doc.id, ...data });
        }
      });
      setRooms(updatedrooms);
    });
  
    return () => {
      unsubscribe();
    };
  }, [filter, order]);
  
  return (
    <div className="room-container">
      <table className="room-table">
        <thead className="room-title">
          <tr>
            <th>{locale.pt.rooms.room.code}</th>
            <th>{locale.pt.rooms.room.name}</th>
            <th>{locale.pt.rooms.room.floor}</th>
            <th>{locale.pt.rooms.room.place}</th>
            <th>{locale.pt.rooms.room.project}</th>
            <th>{locale.pt.rooms.room.cable}</th>
            <th>{locale.pt.rooms.room.computers}</th>
          </tr>
        </thead>
        <tbody className="room-content">
          {rooms?.map((item, index) => (
            <tr key={index}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.floor}</td>
              <td>{item.place}</td>
              <td>{item.project}</td>
              <td>{item.cable}</td>
              <td>{item.computers}</td>
              {user?.type=='admin'?
              <td className='room-buttons'>
                <MdOutlineModeEditOutline className='icon' onClick={() => editRoom(item)} />
              </td>:null}
              {user?.type=='admin'?
              <td className='room-buttons'>
                <MdDeleteOutline className='icon' onClick={() => handleDelete(item.id)} />
              </td>:null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Room

