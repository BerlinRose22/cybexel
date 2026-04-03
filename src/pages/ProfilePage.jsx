import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ username:'', phone:'', address:'' });
  const [orders, setOrders] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setForm({ username: user.username, phone: user.phone||'', address: user.address||'' });
    api.get('/orders/').then(r => setOrders(r.data.results || r.data));
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    await api.put('/profile/', form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{padding:'30px',maxWidth:'800px',margin:'0 auto'}}>
      <h2>My Profile</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'30px',marginTop:'24px'}}>
        <div style={{background:'#fff',padding:'28px',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)'}}>
          <h3 style={{marginBottom:'20px'}}>Account Details</h3>
          <p style={{color:'#888',fontSize:'13px',marginBottom:'16px'}}>Email: <strong style={{color:'#333'}}>{user?.email}</strong></p>
          <form onSubmit={saveProfile}>
            {[['username','Username'],['phone','Phone'],['address','Address']].map(([field,label]) => (
              <div key={field} style={{marginBottom:'14px'}}>
                <label style={{fontSize:'12px',color:'#888',textTransform:'uppercase',letterSpacing:'0.5px'}}>{label}</label>
                <input value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})}
                  style={{width:'100%',padding:'9px 12px',border:'1px solid #ddd',borderRadius:'7px',marginTop:'5px',fontSize:'14px',boxSizing:'border-box'}} />
              </div>
            ))}
            <button type="submit"
              style={{padding:'10px 22px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'14px'}}>
              {saved ? 'Saved ✓' : 'Save Changes'}
            </button>
          </form>
          <button onClick={logout}
            style={{marginTop:'16px',padding:'10px 22px',background:'#fee2e2',color:'#c0392b',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'14px',width:'100%'}}>
            Logout
          </button>
        </div>

        <div style={{background:'#fff',padding:'28px',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.07)'}}>
          <h3 style={{marginBottom:'20px'}}>Order History</h3>
          {orders.length === 0 ? <p style={{color:'#888'}}>No orders yet.</p> : orders.map(o => (
            <div key={o.id} style={{borderBottom:'1px solid #f0f0f0',paddingBottom:'12px',marginBottom:'12px'}}>
              <p style={{fontWeight:'600',margin:'0 0 4px'}}>Order #{o.id}</p>
              <p style={{fontSize:'13px',color:'#666',margin:'0 0 2px'}}>₹{o.total_price} · {o.items?.length} item(s)</p>
              <span style={{fontSize:'12px',background:'#e8f5e9',color:'#27ae60',padding:'2px 10px',borderRadius:'20px'}}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}