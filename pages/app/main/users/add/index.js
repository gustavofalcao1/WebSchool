import React, {useState} from 'react'
import {locale} from '../../../../../public/locale'
import { db, storage } from '../../../../../api/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import bcrypt from 'bcryptjs'

const Add = ({setShowAdd}) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    group: '',
    photoURL: '',
    process: '',
    sector: '',
    type: '',
    username: '',
    createAt: '',
    updateAt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imageFile = formData.photoURL;
    const imageType = imageFile.type;
    const mimeTypeToExtension = {
      'image/jpeg': 'jpeg',
      'image/jpg': 'jpg',
      'image/png': 'png',
    };
    if (mimeTypeToExtension[imageType]) {
      const fileExtension = mimeTypeToExtension[imageType];
      const imageRef = ref(storage, `public/${formData.process}.${fileExtension}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      console.log('URL da imagem:', imageUrl);
    } else {
      console.error('Tipo de arquivo não suportado');
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const securityPassword = bcrypt.hashSync(formData.password, salt);

    const timestamp = new Date()
    try {
      const data = {
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
        updateAt: timestamp
      };

      const docRef = await addDoc(collection(db, "users"), data);
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
            className='add-input process'
            placeholder={locale.pt.users.inputs.process}
            name="process"
            type="number"
            value={formData.process}
            onChange={handleChange}
          />
          <input
            className='add-input name'
            placeholder={locale.pt.users.inputs.name}
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleChange}
          />
          <select
            className='add-input group'
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
        <div className='add-tr 2'>
          <input
            className='add-input email'
            placeholder={locale.pt.users.inputs.email}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            className='add-input sector'
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
        <div className='add-tr 3'>
          <input
            className='add-input password'
            placeholder={locale.pt.users.inputs.password}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            className='add-input type'
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
            className='add-input photoURL'
            placeholder={locale.pt.users.inputs.photoURL}
            name="photoURL"
            type="file"
            value={formData.photoURL}
            onChange={handleChange}
          />
        </div>
        <button className='add-submit' type="submit">{locale.pt.add.inputs.submit}</button>
      </form>
    </div>
  )
}

export default Add

