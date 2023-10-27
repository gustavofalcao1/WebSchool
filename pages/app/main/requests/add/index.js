import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import {db} from '../../../../../api/firebase'
import { collection, addDoc } from 'firebase/firestore'

const Add = ({ users, item, setShowAdd}) => {
  const [formData, setFormData] = useState({
    codeItem: '',
    displayName: '',
    reqAt: '',
    resAt: '',
    createAt: '',
    updateAt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const timestamp = new Date()
    console.log(formData)
    try {
      const data = {
        codeItem: formData.codeItem,
        displayName: formData.displayName,
        reqAt: timestamp,
        resAt: null,
        createAt: timestamp,
        updateAt: timestamp
      };

      const docRef = await addDoc(collection(db, "requests"), data);
      console.log(`Item adicionado ao Firestore com id: ${docRef.id}`);
    } catch (error) {
      console.error('Erro ao adicionar o item ', error);
    }
    setShowAdd(false)
  };

  return (
    <div className='add-container'>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className='add-tr 1'>
          <select
            className='add-input codeItem'
            name="codeItem"
            value={formData.codeItem}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.codeItem.default}</option>
            {item?.map((item, index) => (
              <option key={index} value={item.code}>{item.code}</option>
            ))}
          </select>
          <select
            className='add-input displayName'
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.displayName.default}</option>
            {users?.map((item, index) => (
              <option key={index} value={item.displayName}>{item.displayName}</option>
            ))}
          </select>
        </div>
        <button className='add-submit' type="submit">{locale.pt.add.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Add

