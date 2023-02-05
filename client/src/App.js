import './App.css';
import { useState} from "react";
import Axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import CreateQr from './components/CreateQr';
import ReadQr from './components/ReadQr';


function App() {

  const[name,setName] = useState("");
  const[dateofbirth,setDateOfBirth] = useState("");
  const[email,setEmail] = useState("");
  const[phone,setPhone] = useState("");
  const[password,setPassword] = useState("");
  const[usersList, setUsersList] = useState([]);
  const[newEmail, setNewEmail] = useState("");
  const[verfied, setVerifed] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }
  const addUser  = ()=>{
   Axios.post("http://localhost:3001/create", {
    name: name,
    dateofbirth: dateofbirth,
    email: email,
    phone: phone,
    password: password,
  }).then(()=>{
    // setUsersList([...usersList, {
    //   name: name,
    //   dateofbirth: dateofbirth,
    //   email: email,
    //   phone: phone,
    //   password: password,
    // },
    // ]);
   console.log("user added successfully");
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response)=>{
    setUsersList(response.data);
    });
  };
    
  const updateEmail = (id) => {
    Axios.put("http://localhost:3001/update",     {email: newEmail, id: id}).then((response)=>{
      setUsersList(usersList.map((val) => {
        return val.id === id ? {id: val.id, name: val.name, dateofbirth: val.dateofbirth, email: newEmail, phone: val.phone, password: val.password} : val;
      })
      );
    }
    );
  };

  const deleteUser = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setUsersList(usersList.filter((val)=>{
     return val.id !== id 
    }))
  })
  };
  return (
    <div className="App">
     <div className="form">
        <h1>Sign Up</h1>
        <label>Name: </label><input type="text"  required 
        onChange={(event) => { setName(event.target.value);}}/><br/>
        <label> Date of Birth:</label> 
        <input type="date" id="dateofbirth" 
         required  
        onChange={(event) => { setDateOfBirth(event.target.value);}}/><br/>
        <label>Email: </label>
        <input type="email" id="email" name="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
        onChange={(event) => { setEmail(event.target.value);}}/><br/>
        <label>Phone No: </label>
        <input type="tel" id="phone" pattern="\d{10,10}" required  
        onChange={(event) => { setPhone(event.target.value);}}/><br/>
        <label>Password:</label>
        <input type="password" onChange={(event) => { setPassword(event.target.value);}}/><br/>
        <ReCAPTCHA
         sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
         onChange={onChange}
        />
        <div>
        <button className="button" onClick={addUser} disabled={!verfied}>Submit</button>
        <button className="button1" onClick={getUsers}>Show Users</button>
        </div>
    </div>
    <div className="users">
     {usersList.map((val, key)=> {
       return <div className="user"> 
       <h3>Name: {val.name}</h3>
       <h3>Date of Birth: {val.dateofbirth}</h3>
       <h3>Email: {val.email}</h3>
       <h3>Phone: {val.phone}</h3>
       <h3>Password: {val.password}</h3>
       <div> 
        <input type="text" className='input'
       onChange={(event) => { setNewEmail(event.target.value);}}/>
       <button className='button2' onClick={()=>{
        updateEmail(val.id);
      }}>
        {" "}
        Edit
        </button>
        <button className='button2' onClick={()=>{
          deleteUser(val.id);
        }}>{" "}Delete</button>
       </div>
       </div>
     })}
    </div>
    <div className='qrcode'>
      <div className="create">
       <CreateQr/>
      </div>
      
      <div className="read">
        <ReadQr/>
      </div>
      
    </div>
    </div>
  );
}

export default App;
