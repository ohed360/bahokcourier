import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Dashboard() {
  const [parcels,setParcels]=useState([]);
  const token = localStorage.getItem('token');
  useEffect(()=>{
    axios.get('/api/parcels',{headers:{Authorization:'Bearer '+token}})
      .then(res=>setParcels(res.data))
      .catch(()=>{});
  },[]);
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">My Parcels</h2>
      <ul>
        {parcels.map(p=><li key={p._id} className="border p-2 mb-2">{p.trackingNumber}: {p.receiverName} - {p.status}</li>)}
      </ul>
    </div>
  );
}