import React, {useEffect, useState} from 'react'
import {db} from '../../../../../api/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { locale } from '../../../../../public/locale'

const History = ({ filter, order}) => {
  const [request, setRequest] = useState([]);

  useEffect(() => {
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
      getRequest();
    };
  }, [filter, order]);
  
  return (
    <div className="request-container">
      <table className="request-table">
        <thead className="request-title">
          <tr>
            <th>{locale.pt.requests.request.code}</th>
            <th>{locale.pt.requests.request.requester}</th>
            <th>{locale.pt.requests.request.reqAt}</th>
            <th>{locale.pt.requests.request.resAt}</th>
            
          </tr>
        </thead>
        <tbody className="request-content">
          {request?.map((item, index) => (
            item.resAt !== null?
              <tr key={index}>
                <td>{item.codeItem}</td>
                <td>{item.displayName}</td>
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

