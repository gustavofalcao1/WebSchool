import React, {useEffect, useState} from 'react'
import { MdDoneAll } from 'react-icons/md'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, doc, updateDoc, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

const Request = ({ user, users, filter, order, setItem, setUsers }) => {
  const [request, setRequest] = useState([]);

  const handleRes = async (requestId) => {
    const timestamp = new Date()
    try {
      const itemRef = doc(db, 'requests', requestId)
      const updatedData = {
        resAt: timestamp,
        updateAt: timestamp
      };
  
      await updateDoc(itemRef, updatedData); 
      console.log(`Item com ID ${requestId} foi editado com sucesso.`)
    } catch (error) {
      console.error(`Erro ao editar o item com ID ${requestId}:`, error)
    }
  }

  useEffect(() => {
    const getItem = onSnapshot(query(collection(db, 'items'), orderBy('code')), (querySnapshot) => {
      const updateRequest = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        updateRequest.push({ id: doc.id, ...data })
      })
      setItem(updateRequest);
    })

    const getUsers = onSnapshot(query(collection(db, 'users')), (querySnapshot) => {
      const updateRequest = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        updateRequest.push({ id: doc.id, ...data })
      })
      setUsers(updateRequest)
    })

    const getRequest = onSnapshot(query(collection(db, 'requests'), orderBy(order)), (querySnapshot) => {
      const updateRequest = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        if (filter) {
          if (data.displayName === filter) {
            updateRequest.push({ id: doc.id, ...data })
          }
        } else {
          updateRequest.push({ id: doc.id, ...data })
        }
      })
      setRequest(updateRequest)
    })
  
    return () => {
      getItem()
      getUsers()
      getRequest()
    };
  }, [filter, order])
  
  return (
    <div className="request-container">
      <table className="request-table">
        <thead className="request-title">
          <tr>
            <th>{locale.pt.requests.request.code}</th>
            <th>{locale.pt.requests.request.requester}</th>
            <th>{locale.pt.requests.request.reqAt}</th>            
          </tr>
        </thead>
        <tbody className="request-content">
          {request?.map((item, index) => (
            item.resAt === null?
              <tr key={index}>
                <td>{item.codeItem}</td>
                <td>{item.displayName}</td>
                <td>{item.reqAt.toDate().toLocaleString()}</td>
                <td><img src={item.photoURL} width={30} height={30} alt='user photo' /></td>
                {user?.type=='admin'||user?.type=='manager'?
                <td className='request-buttons'>
                  <MdDoneAll className='icon' onClick={() => handleRes(item.id)} />
                </td>:null}
              </tr>
            :null
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Request

