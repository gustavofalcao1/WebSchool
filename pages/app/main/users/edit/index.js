import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import { db, storage } from '../../../../../api/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'

const Edit = ({setShowEdit, data}) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [formData, setFormData] = useState({
    displayName: data?.displayName,
    email: data?.email,
    password: data?.password,
    group: data?.group,
    process: data?.process,
    sector: data?.sector,
    type: data?.type,
    username: data?.username,
    createAt: data?.createAt,
    updateAt: data?.updateAt
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0]
      setPhotoURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const imageRef = ref(storage, `public/${formData.process}`)
    await uploadBytes(imageRef, photoURL)

    const imageUrl = await getDownloadURL(imageRef)

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const securityPassword = bcrypt.hashSync(formData.password, salt)

    const timestamp = new Date()
    try {
      const itemRef = doc(db, 'users', data?.id);
      const updatedData = {
        displayName: formData.displayName,
        email: formData.email,
        password: securityPassword,
        group: formData.group,
        photoURL: imageUrl,
        process: formData.process,
        sector: formData.sector,
        type: formData.type,
        username: formData.displayName.replace(/\s/g, '').toLowerCase(),
        createAt: timestamp,
        updateAt: timestamp,
      };

      await updateDoc(itemRef, updatedData);  
      console.log(`Item com ID ${data?.process} foi editado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao editar o item com ID ${data?.code}:`, error);
    }

    setShowEdit(false)
  };

  return (
    <div className='reg-container'>
      <form className="reg-form" onSubmit={handleSubmit}>
        <div className='reg-tr 1'>
          <input
            className='reg-input process'
            placeholder={locale.pt.users.inputs.process}
            name="process"
            type="number"
            value={formData.process}
            onChange={handleChange}
          />
          <input
            className='reg-input name'
            placeholder={locale.pt.users.inputs.name}
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
          />
          <select
            className='reg-input group'
            name="group"
            type="button"
            value={formData.group}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.users.inputs.group.default}</option>
            <option value={locale.pt.users.inputs.group.prof}>{locale.pt.users.inputs.group.prof}</option>
            <option value={locale.pt.users.inputs.group.nProf}>{locale.pt.users.inputs.group.nProf}</option>
          </select>
        </div>
        <div className='reg-tr 2'>
          <input
            className='reg-input email'
            placeholder={locale.pt.users.inputs.email}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            className='reg-input sector'
            name="sector"
            value={formData.sector}
            onChange={handleChange}
          >
            <option value=''>{locale.pt.users.inputs.sector.default}</option>
            <option value={locale.pt.users.inputs.sector.sec}>{locale.pt.users.inputs.sector.sec}</option>
            <option value={locale.pt.users.inputs.sector.admin}>{locale.pt.users.inputs.sector.admin}</option>
            <option value={locale.pt.users.inputs.sector.it}>{locale.pt.users.inputs.sector.it}</option>
            <option value={locale.pt.users.inputs.sector.edu}>{locale.pt.users.inputs.sector.edu}</option>
            <option value={locale.pt.users.inputs.sector.account}>{locale.pt.users.inputs.sector.account}</option>
            <option value={locale.pt.users.inputs.sector.clean}>{locale.pt.users.inputs.sector.clean}</option>
            <option value={locale.pt.users.inputs.sector.security}>{locale.pt.users.inputs.sector.security}</option>
          </select>
        </div>
        <div className='reg-tr 3'>
          <input
            className='reg-input password'
            placeholder={locale.pt.users.inputs.password}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            className='reg-input type'
            name="type"
            type="button"
            value={formData.type}
            onChange={handleChange}
          >
            <option value='user'>{locale.pt.users.inputs.type.default}</option>
            <option value='user'>{locale.pt.users.inputs.type.user}</option>
            <option value='manager'>{locale.pt.users.inputs.type.manager}</option>
            <option value='admin'>{locale.pt.users.inputs.type.admin}</option>
          </select>
          <input
            className='reg-input photoURL'
            placeholder={locale.pt.users.inputs.photoURL}
            name="photoURL"
            type="file"
            accept='image/*'
            onChange={handleImageUpload}
          />
        </div>
        <button className='reg-submit' type="submit">{locale.pt.edit.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Edit

