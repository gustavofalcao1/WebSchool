import React, { useState } from "react"
import {locale} from '../../../public/locale'
import {db} from '../../../api/firebase'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Login = ({setIsAuth}) => {
  const [remember] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: remember,
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleCheckbox = () => {
    setFormData({ ...formData, remember: !remember })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== '' && formData.username !== '') {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userData.push({ id: doc.id, ...data });
        });
        const user = userData.find((user) => user.username === formData.username);
        if (user) {
          bcrypt.compare(formData.password, user.password, async (err, result) => {
            if (err) {
              console.error('Erro ao verificar a senha:', err);
            } else {
              if (result) {
                console.log('Senha correta!');
                localStorage.clear('user');
                localStorage.setItem('user', user.id);
                setIsAuth(true)
              } else {
                console.log('Senha incorreta.');
              }
            }
          })
        } else {
          console.log("Utilizador incorreto");
        }
      } catch (error) {
        console.error("Erro ao encontrar o utilizador:", error);
        throw error;
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>{locale.pt.login.title}</h1>
        <form className="login-form" onSubmit={handleSubmit} method="POST">
          <input
            type="username"
            className='login-input username'
            placeholder={locale.pt.login.inputs.username}
            name="username"
            value={formData.username}
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <input
            type="password"
            className='login-input password'
            placeholder={locale.pt.login.inputs.password}
            name="password"
            value={formData.password}
            autoComplete="password"
            onChange={handleChange}
          />
          <div className='login-remember'>
            <input
              type="checkbox"
              defaultChecked={remember}
              className='login-checkbox'
              name="remember"
              value={remember}
              onChange={handleCheckbox}
            />
            <p>{locale.pt.login.remember}</p>
          </div>
          <button className='login-submit' type="submit">{locale.pt.login.inputs.submit}</button>
        </form>
      </div>
    </div>
  )
}

export default Login