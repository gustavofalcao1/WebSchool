import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import {db} from '../../../../../api/firebase'
import { collection, addDoc } from 'firebase/firestore'

const Add = ({setShowAdd}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    place: '',
    description: '',
    type: '',
    brand: '',
    model: '',
    sn: '',
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
    try {
      const data = {
        code: formData.code,
        name: formData.name,
        place: formData.place,
        description: formData.description,
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        sn: formData.sn,
        createAt: timestamp,
        updateAt: timestamp
      };

      const docRef = await addDoc(collection(db, "items"), data);
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
          <input
            className='add-input code'
            placeholder={locale.pt.add.inputs.code}
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
          <input
            className='add-input name'
            placeholder={locale.pt.add.inputs.name}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            className='add-input place'
            name="place"
            value={formData.place}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.place.default}</option>
            <option value={locale.pt.add.inputs.place.sec}>{locale.pt.add.inputs.place.sec}</option>
            <option value={locale.pt.add.inputs.place.stock}>{locale.pt.add.inputs.place.stock}</option>
          </select>
        </div>
        <div className='add-tr 2'>
          <input
            className='add-input description'
            placeholder={locale.pt.add.inputs.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            className='add-input type'
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.type.default}</option>
            <option value={locale.pt.add.inputs.type.pc}>{locale.pt.add.inputs.type.pc}</option>
            <option value={locale.pt.add.inputs.type.equipament}>{locale.pt.add.inputs.type.equipament}</option>
            <option value={locale.pt.add.inputs.type.speak}>{locale.pt.add.inputs.type.speak}</option>
            <option value={locale.pt.add.inputs.type.adpter}>{locale.pt.add.inputs.type.adpter}</option>
            <option value={locale.pt.add.inputs.type.hardware}>{locale.pt.add.inputs.type.hardware}</option>
            <option value={locale.pt.add.inputs.type.acessory}>{locale.pt.add.inputs.type.acessory}</option>
            <option value={locale.pt.add.inputs.type.cable}>{locale.pt.add.inputs.type.cable}</option>
          </select>
        </div>
        <div className='add-tr 3'>
          <input
            className='add-input brand'
            placeholder={locale.pt.add.inputs.brand}
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <input
            className='add-input model'
            placeholder={locale.pt.add.inputs.model}
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <input
            className='add-input sn'
            placeholder={locale.pt.add.inputs.sn}
            name="sn"
            value={formData.sn}
            onChange={handleChange}
          />
        </div>
        <button className='add-submit' type="submit">{locale.pt.add.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Add

