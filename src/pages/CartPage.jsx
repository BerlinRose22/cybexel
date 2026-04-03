import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = () => api.get('/cart/').then(r => setCart(r.data));
  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (itemId) => {
    await api.delete('/cart/', { data: { item_id: itemId } });
    fetchCart();
  };

  if (!cart) return <p style={{padding:'30px'}}>Loading cart...</p>;

  return (
    <div style={{padding:'30px', maxWidth:'700px', margin:'0 auto'}}>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px 0'}}>
          <p style={{fontSize:'18px',color:'#666'}}>Your cart is empty.</p>
          <button onClick={() => navigate('/products')}
            style={{marginTop:'16px',padding:'12px 28px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer'}}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fff',padding:'16px',borderRadius:'10px',marginBottom:'12px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <div>
                <p style={{fontWeight:'600',margin:'0 0 4px'}}>{item.product.title}</p>
                <p style={{color:'#666',fontSize:'13px',margin:'0'}}>Qty: {item.quantity} × ₹{item.product.price}</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
                <p style={{fontWeight:'700',margin:'0'}}>₹{item.subtotal}</p>
                <button onClick={() => removeItem(item.id)}
                  style={{background:'#fee2e2',color:'#c0392b',border:'none',borderRadius:'6px',padding:'6px 12px',cursor:'pointer',fontSize:'13px'}}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{textAlign:'right',marginTop:'20px'}}>
            <p style={{fontSize:'20px',fontWeight:'700'}}>Total: ₹{cart.total}</p>
            <button onClick={() => navigate('/checkout')}
              style={{padding:'13px 32px',background:'#27ae60',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'16px',marginTop:'12px'}}>
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}