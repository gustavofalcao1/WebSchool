import React, {useEffect, useState} from 'react'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

const History = ({ filter, order}) => {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const getRequest = onSnapshot(query(collection(db, 'requests'), /*orderBy(order)*/), (querySnapshot) => {
      const updateRequest = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        /*if (filter) {
          if (data.displayName === filter) {
            updateRequest.push({ id: doc.id, ...data })
          }
        } else {
          updateRequest.push({ id: doc.id, ...data });
        }*/
        updateRequest.push({ id: doc.id, ...data });
      });
      setRequest(updateRequest);
    });
  
    return () => {
      getRequest();
    };
  }, [filter, order]);
  
  return (
    <div className="request-container">
      <table className="request-table">
        <thead className="request-title">
          <tr>
          <th>{locale.pt.requests.request.code}</th>
            <th>{locale.pt.requests.request.item}</th>
            <th>{locale.pt.requests.request.requester}</th>
            <th>{locale.pt.requests.request.foto}</th>  
            <th>{locale.pt.requests.request.reqAt}</th>
            <th>{locale.pt.requests.request.resAt}</th>
            
          </tr>
        </thead>
        <tbody className="request-content">
          {request?.map((item, index) => (
            item.resAt !== null?
              <tr key={index}>
                <td>{item.item.code}</td>
                <td><img src={item.item.img} width={40} height={40} alt='item image' /></td>
                <td>{item.user.displayName}</td>
                <td><img src={item.user.photoURL} width={40} height={40} alt='user photo' /></td>
                <td>{item.reqAt.toDate().toLocaleString()}</td>
                <td>{item.resAt?.toDate().toLocaleString()}</td>
              </tr>
              :null
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History

