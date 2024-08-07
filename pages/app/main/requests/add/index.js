import React, { useState, useEffect, useRef } from 'react';
import {locale} from '../../../../../public/locale'
import { db } from '../../../../../api/firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import jsQR from 'jsqr';

const Add = ({ users, item, setShowAdd }) => {
  const [formData, setFormData] = useState({
    idItem: '',
    idUser: '',
    reqAt: '',
    resAt: '',
    createAt: '',
    updateAt: ''
  });

  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [readingItem, setReadingItem] = useState(false);

  useEffect(() => {
    if (scanning) {
      const startScan = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Erro ao acessar a câmera:', error);
        }
      };

      startScan();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [scanning]);

  const handleScan = async () => {
    if (!scanning) return;
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        handleQRCode(code.data);
      }
    }
    requestAnimationFrame(handleScan);
  };

  const handleQRCode = async (data) => {
    if (!data) {
      return;
    }
    console.log('QR Code lido:', data);
    if (readingItem) {
      setFormData({ ...formData, idItem: data });
      setReadingItem(false);
    } else {
      setFormData({ ...formData, idUser: data });
    }
  };

  const startScanItem = () => {
    setReadingItem(true);
    setScanning(true);
  };

  const startScanUser = () => {
    setReadingItem(false);
    setScanning(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date();
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
      console.error('Erro ao adicionar o item ', error);
    }
    setShowAdd(false);
  };

  return (
    <div className='add-container'>
      {scanning && (
        <video ref={videoRef} className="camera-container" autoPlay playsInline onLoadedMetadata={handleScan}></video>
      )}
      <div className="add-form">
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
        <button className='add-submit' type="submit" onClick={handleSubmit}>{locale.pt.add.inputs.submit}</button>
        <button className='scan-button' onClick={startScanItem}>Scan Item QR Code</button>
        <button className='scan-button' onClick={startScanUser}>Scan User QR Code</button>
        <button className='cancel-button' onClick={() => setShowAdd(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Add;
