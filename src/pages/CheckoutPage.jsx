import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CheckoutPage() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/orders/checkout/', { shipping_address: address });
      navigate('/success', { state: { order: res.data.order, message: res.data.message } });
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
      <div style={{background:'#fff',padding:'40px',borderRadius:'12px',boxShadow:'0 4px 20px rgba(0,0,0,0.1)',width:'440px'}}>
        <h2>Checkout</h2>
        <p style={{color:'#666',marginBottom:'24px'}}>Enter your shipping details to complete the order.</p>
        {error && <p style={{color:'red',marginBottom:'12px'}}>{error}</p>}
        <form onSubmit={handleCheckout}>
          <label style={{fontSize:'12px',fontWeight:'600',color:'#888',textTransform:'uppercase',letterSpacing:'0.5px'}}>Shipping Address</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} required
            placeholder="123 Main St, City, State, PIN"
            rows={4}
            style={{width:'100%',padding:'12px',border:'1px solid #ddd',borderRadius:'8px',marginTop:'8px',fontSize:'14px',resize:'vertical',boxSizing:'border-box'}} />
          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'13px',background:loading?'#aaa':'#27ae60',color:'#fff',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer',marginTop:'16px'}}>
            {loading ? 'Placing Order...' : 'Place Order ✓'}
          </button>
        </form>
      </div>
    </div>
  );
}