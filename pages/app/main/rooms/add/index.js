import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import {db} from '../../../../../api/firebase'
import { collection, addDoc } from 'firebase/firestore'

const Add = ({setShowAdd}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    floor: '',
    place: '',
    project: '',
    cable: '',
    computers: '',
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
        floor: formData.floor,
        place: formData.place,
        project: formData.project,
        cable: formData.cable,
        computers: formData.computers,
        createAt: timestamp,
        updateAt: timestamp
      };

      const docRef = await addDoc(collection(db, "rooms"), data);
      console.log(`Sala adicionado ao Firestore com id: ${docRef.id}`);
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
            className='add-input floor'
            name="floor"
            value={formData.floor}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.floor.default}</option>
            <option value={locale.pt.add.inputs.floor.zero}>{locale.pt.add.inputs.floor.zero}</option>
            <option value={locale.pt.add.inputs.floor.one}>{locale.pt.add.inputs.floor.one}</option>
          </select>
          <select
            className='add-input place'
            name="place"
            value={formData.place}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.place.default}</option>
            <option value={locale.pt.add.inputs.place.epad}>{locale.pt.add.inputs.place.epad}</option>
            <option value={locale.pt.add.inputs.place.pav}>{locale.pt.add.inputs.place.pav}</option>
          </select>
        </div>
        <div className='add-tr 2'>
        <select
            className='add-input project'
            name="project"
            value={formData.project}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.project.default}</option>
            <option value={locale.pt.add.inputs.project.yes}>{locale.pt.add.inputs.project.yes}</option>
            <option value={locale.pt.add.inputs.project.no}>{locale.pt.add.inputs.project.no}</option>
          </select>
          <select
            className='add-input cable'
            name="cable"
            value={formData.cable}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.add.inputs.cable.default}</option>
            <option value={locale.pt.add.inputs.cable.hdmi}>{locale.pt.add.inputs.cable.hdmi}</option>
            <option value={locale.pt.add.inputs.cable.vga}>{locale.pt.add.inputs.cable.vga}</option>
          </select>
          <input
            className='add-input computers'
            placeholder={locale.pt.add.inputs.computers}
            name="computers"
            type="number"
            value={formData.computers}
            onChange={handleChange}
          />
        </div>
        <button className='add-submit' type="submit">{locale.pt.add.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Add

