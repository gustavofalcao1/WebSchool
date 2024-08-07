import React, { useState } from 'react';
import { locale } from '../../../../../public/locale';
import { db, storage } from '../../../../../api/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

import Alert from '../../../../components/alert';

const Edit = ({ setShowEdit, data }) => {
  const [photoURL, setPhotoURL] = useState(null);
  const [photoUpdate, setPhotoUpdate] = useState(false);
  const [formData, setFormData] = useState({
    displayName: data?.displayName,
    photoURL: data?.photoURL,
    email: data?.email,
    password: '', // Mantenha a senha vazia inicialmente
    group: data?.group,
    process: data?.process,
    sector: data?.sector,
    type: data?.type,
    username: data?.username,
    createAt: data?.createAt,
    updateAt: data?.updateAt
  });

  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [alert, setAlert] = useState(false);
  const [dataAlert, setDataAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordChanged(passwordFocused); // Altere passwordChanged apenas se o campo de senha estiver em foco
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      setPhotoURL(imageFile);
      setPhotoUpdate(true);
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleSubmit = async () => {
    const imageRef = ref(storage, `public/${formData.process}`);
    if (photoUpdate) {
      await uploadBytes(imageRef, photoURL);
    }

    const imageUrl = photoUpdate ? await getDownloadURL(imageRef) : formData.photoURL;

    const timestamp = new Date();
    try {
      const itemRef = doc(db, 'users', data?.id);
      const updatedData = {
        displayName: formData.displayName,
        email: formData.email,
        // Verifica se a senha foi alterada
        password: passwordChanged ? bcrypt.hashSync(formData.password, bcrypt.genSaltSync(10)) : data.password,
        group: formData.group,
        photoURL: imageUrl,
        process: formData.process,
        sector: formData.sector,
        type: formData.type,
        username: formData.displayName.replace(/\s/g, '').toLowerCase(),
        createAt: timestamp,
        updateAt: timestamp,
      };

      // Remove campos não modificados
      for (const key in updatedData) {
        if (updatedData[key] === data[key]) {
          delete updatedData[key];
        }
      }

      await updateDoc(itemRef, updatedData);
      console.log(`Item com ID ${data?.process} foi editado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao editar o item com ID ${data?.code}:`, error);
    }

    setShowEdit(false);
    setAlert(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    setAlert(false); // Fecha o alerta após a confirmação
  };

  const handleAlert = (e) => {
    e.preventDefault();
  
    const itemsToChange = [];
  
    for (const key in formData) {
      // Verifica se o valor em formData é diferente do valor correspondente em data
      if (formData[key] !== data[key]) {
        // Obtém o nome do campo do arquivo de localização
        let fieldName;
        switch (key) {
          case 'displayName':
            fieldName = locale.pt.users.inputs.name;
            break;
          case 'email':
            fieldName = locale.pt.users.inputs.email;
            break;
          case 'password':
            fieldName = locale.pt.users.inputs.password;
            break;
          case 'group':
            fieldName = locale.pt.users.inputs.group.default;
            break;
          case 'photoURL':
            fieldName = locale.pt.users.inputs.photoURL;
            break;
          case 'process':
            fieldName = locale.pt.users.inputs.process;
            break;
          case 'sector':
            fieldName = locale.pt.users.inputs.sector.default;
            break;
          case 'type':
            fieldName = locale.pt.users.inputs.type.default;
            break;
          // Adicione casos para outros campos conforme necessário
          default:
            fieldName = '';
        }
        if (fieldName) { // Verifica se o fieldName não está vazio antes de adicionar
          itemsToChange.push(fieldName);
        }
      }
    }
  
    const item = {
      title: 'Tens a certeza?',
      text: 'Tens a certeza, que queres alterar dados da conta:',
      name: data?.displayName,
      list_text: 'Os dados que serão alterados:',
      item: itemsToChange,
      button: handleConfirm
    };
    setDataAlert(item);
    setAlert(true);
  };  

  return (
    <div className='reg-container'>
      {alert && <Alert data={dataAlert} setAlert={setAlert} />}
      <div className="reg-form">
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
            onFocus={handlePasswordFocus} // Adiciona manipulador de evento de foco
            onBlur={handlePasswordBlur} // Adiciona manipulador de evento de desfoque
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
        <button className='reg-submit' type="button" onClick={handleAlert}>{locale.pt.edit.inputs.submit}</button>
      </div>
    </div>
  );
}

export default Edit;
