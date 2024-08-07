import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const Add = ({ setShowAdd }) => {
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

  const handleScan = async () => {
    if (!scanning) return; // Verifica se o scanning é false, se for, para a execução
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

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

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
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [scanning]);

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

  return (
    <div className='add-container'>
      {scanning && (
        <video ref={videoRef} className="camera-container" autoPlay playsInline onLoadedMetadata={handleScan}></video>
      )}
      <div className="add-form">
        <button className='scan-button' onClick={startScanItem}>Scan Item QR Code</button>
        <button className='scan-button' onClick={startScanUser}>Scan User QR Code</button>
        <button className='cancel-button' onClick={() => setShowAdd(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default Add;
