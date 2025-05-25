import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav=useNavigate();
  const login=async()=>{try{const {data}=await axios.post('/api/auth/login',{email,password});localStorage.setItem('token',data.token);nav('/dashboard');}catch(err){alert('Error');}};
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" className="border p-2 w-full mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={login} className="bg-blue-500 text-white p-2">Login</button>
    </div>
  );
}