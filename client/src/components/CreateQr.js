import React, { useState } from 'react';
import './CreateQr.css';
import QRCode from "qrcode";
const CreateQr = () => {
    const[qrValue, setQrValue]= useState("");
    const[qrImageUrl, setQrImageUrl] = useState("");
    const[data, setData]= useState(null);

    const handleSubmit = async (e) =>{
     e.preventDefault();
     if(!qrValue){
        return alert("Fill the QR value");
     }
     setData(qrValue)
     const response =  await QRCode.toDataURL(qrValue);
     setQrImageUrl(response);
     setQrValue("");
    };
  return (
    <div>
        <h2>Create QR Code</h2>
       <div className="createqr">
         <form onSubmit={handleSubmit}>
        <label className="text">Enter Website:</label>
        <input type="text" className='text' value={qrValue} onChange={(e)=> setQrValue(e.target.value)} placeholder="Enter URL"/><br/>
        <button type="submit" className="btn5">Create</button>
         </form>
          {qrImageUrl && (
            <div className="image">
                <a href={qrImageUrl} download="qr.png">
                <img src={qrImageUrl} alt="QR Code" style={{marginBottom:10}}/>
                </a>
                {
            data && <p style={{ fontSize: 25}}>Link: {data}</p>
         }
            </div>
          )}

          

        
       
        </div>
    </div>
  )
}

export default CreateQr