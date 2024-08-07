import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import {db} from '../../../../../api/firebase'
import { collection, addDoc, getDoc, doc } from 'firebase/firestore'

const Add = ({ users, item, setShowAdd}) => {
  const [formData, setFormData] = useState({
    idItem: '',
    idUser: '',
    reqAt: '',
    resAt: '',
    createAt: '',
    updateAt: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const timestamp = new Date()
    try {
      const itemDocRef = doc(db, 'items', formData.idItem);
      const itemSnapshot = await getDoc(itemDocRef);
      const itemData = itemSnapshot.data();

      const userDocRef = doc(db, 'users', formData.idUser);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.data();

      if (itemData && userData) {
        const requestData = {
          idItem: formData.idItem,
          item: itemData,
          idUser: formData.idUser,
          user: userData,
          reqAt: timestamp,
          resAt: null,
          createAt: timestamp,
          updateAt: timestamp
        };

        const docRef = await addDoc(collection(db, "requests"), requestData);
        console.log(`Item adicionado ao Firestore com id: ${docRef.id}`);
      } else {
        console.error('Objeto item ou user não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o item ', error)
    }
    setShowAdd(false)
  };

  return (
    <div className='add-container'>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className='add-tr 1'>
          <select
            className='add-input codeItem'
            name="idItem"
            value={formData.idItem}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.codeItem.default}</option>
            {item?.map((item, index) => (
              <option key={index} value={item.id}>{item.code}</option>
            ))}
          </select>
          <select
            className='add-input displayName'
            name="idUser"
            value={formData.idUser}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.displayName.default}</option>
            {users?.map((item, index) => (
              <option key={index} value={item.id}>{item.displayName}</option>
            ))}
          </select>
        </div>
        <button className='add-submit' type="submit">{locale.pt.add.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Add

