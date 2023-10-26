import React, {useEffect, useState} from 'react'
import { MdOutlineModeEditOutline, MdDeleteOutline } from 'react-icons/md'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, doc, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

const Person = ({ user, filter, order, users, setUsers, editItem }) => {
  const [request, setRequest] = useState([]);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "items", itemId))
      console.log(`Item deletado do Firestore com ID: ${itemId}`)
    } catch (error) {
      console.error('Erro ao deletar o item: ', error)
    }
  }

  useEffect(() => {
    const getUsers = onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
      const updateRequest = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        updateRequest.push({ id: doc.id, ...data });
      });
      setUsers(updateRequest);
    });

    const getRequest = onSnapshot(query(collection(db, 'requests'), orderBy(order)), (querySnapshot) => {
      const updateRequest = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (filter) {
          if (data.displayName === filter) {
            updateRequest.push({ id: doc.id, ...data })
          }
        } else {
          updateRequest.push({ id: doc.id, ...data });
        }
      });
      setRequest(updateRequest);
    });
  
    return () => {
      getUsers();
      getRequest();
    };
  }, [filter, order]);
  
  return (
    <div className="person-container">
      <table className="person-table">
        <thead className="person-title">
          <tr>
            <th>{locale.pt.users.inputs.process}</th>
            <th>{locale.pt.users.inputs.name}</th>
            <th>{locale.pt.users.inputs.email}</th>
            <th>{locale.pt.users.inputs.group.default}</th>
            <th>{locale.pt.users.inputs.sector.default}</th>
            <th>{locale.pt.users.inputs.type.default}</th>
          </tr>
        </thead>
        <tbody className="person-content">
          {users?.map((item, index) => (
            <tr key={index}>
              <td>{item.process}</td>
              <td>{item.displayName}</td>
              <td>{item.email}</td>
              <td>{item.group}</td>
              <td>{item.sector}</td>
              <td>{
                item.type=='user'?locale.pt.users.inputs.type.user:
                item.type=='manager'?locale.pt.users.inputs.type.manager:
                item.type=='admin'?locale.pt.users.inputs.type.admin:null
              }</td>
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

export default Person

