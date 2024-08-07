import React from "react";

const Alert = ({ data, setAlert }) => {
  return (
    <div className="alert-container">
      <div className="alert-content">
        <div className="alert-header">
          <h1>{data?.title}</h1>
        </div>
        <div className="alert-main">
          <div className="alert-message">
            <p className="alert-text">{data?.text}</p>
            <p className="alert-name">{data?.name}</p>
          </div>
          {data?.item && data.item.length > 0 && (
            <div className="alert-list">
              <p className="alert-text">{data?.list_text}</p>
              {data?.item.map((item, index) => (
                <p key={index} className="alert-item">{item}</p>
              ))}
            </div>
          )}
        </div>
        <div className="alert-buttons">
          <button className='alert-confirm' onClick={data?.button}>Confirm</button>
          <button className='alert-cancel' onClick={() => setAlert(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
