import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import {db} from '../../../../../api/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const Edit = ({setShowEdit, data}) => {
  const [formData, setFormData] = useState({
    code: data?.code,
    img: data?.img,
    name: data?.name,
    place: data?.place,
    description: data?.description,
    type: data?.type,
    brand: data?.brand,
    model: data?.model,
    sn: data?.sn,
    createAt: data?.createAt,
    updateAt: data?.updateAt
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const timestamp = new Date()
    try {
      const itemRef = doc(db, 'items', data?.id);
      const updatedData = {
        code: formData.code,
        img: formData.img,
        name: formData.name,
        place: formData.place,
        description: formData.description,
        type: formData.type,
        brand: formData.brand,
        model: formData.model,
        sn: formData.sn,
        createAt: formData.createAt?? timestamp,
        updateAt: timestamp
      };
  
      await updateDoc(itemRef, updatedData);  
      console.log(`Item com ID ${data?.code} foi editado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao editar o item com ID ${data?.code}:`, error);
    }
    setShowEdit(false)
  };

  return (
    <div className='edit-container'>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className='edit-tr 1'>
          <input
            className='edit-input code'
            placeholder={locale.pt.add.inputs.code}
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
          <input
            className='edit-input name'
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
            <option value={locale.pt.add.inputs.place.damaged}>{locale.pt.add.inputs.place.damaged}</option>
          </select>
        </div>
        <div className='edit-tr 2'>
          <input
            className='edit-input description'
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
        <div className='edit-tr 3'>
          <input
            className='edit-input brand'
            placeholder={locale.pt.add.inputs.brand}
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <input
            className='edit-input model'
            placeholder={locale.pt.add.inputs.model}
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <input
            className='edit-input sn'
            placeholder={locale.pt.add.inputs.sn}
            name="sn"
            value={formData.sn}
            onChange={handleChange}
          />
        </div>
        <div className='add-tr 4'>
          <input
            className='edit-input img'
            placeholder={locale.pt.add.inputs.img}
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <button className='edit-submit' type="submit">{locale.pt.edit.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Edit

