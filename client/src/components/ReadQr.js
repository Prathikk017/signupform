import React, { useRef, useState } from 'react'
import QrScanner from "qr-scanner";
const ReadQr = () => {
    const[file, setFile]= useState(null);
    const[data, setData]= useState(null);
    const fileRef = useRef();

    const handleClick = () =>{
        fileRef.current.click();
    };

    const handleChange = async (e)=>{
        const file = e.target.files[0];
        setFile(file);
        const result = await QrScanner.scanImage(file);
        setData(result);
    }
  return (
    <div>
        <h2>Read QR Code</h2>
       <div className="createqr">
        <button type="button" className='btn5' onClick={handleClick}>Scan QR Code</button>
        <input type="file" accept=".png, .jpg, .jpeg" style={{display:"none"}} ref={fileRef}onChange={handleChange}/>
        <div className='image'>
         {
            file && (
                <img src={URL.createObjectURL(file)} alt="QR Code" style={{marginBottom: 0.5}}/>
            )
         } 
         {
            data && <p style={{ fontSize: 30}}>Link: {data}</p>
         }
        </div>
       
       </div>
    </div>
  )
}

export default ReadQr;