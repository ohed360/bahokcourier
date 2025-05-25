import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
  const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');
  const nav=useNavigate();
  const register=async()=>{try{await axios.post('/api/auth/register',{name,email,password,role:'customer'});nav('/');}catch(err){alert('Error');}};
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <input className="border p-2 w-full mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" className="border p-2 w-full mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={register} className="bg-green-500 text-white p-2">Register</button>
    </div>
  );
}