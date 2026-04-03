import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
      <div style={{textAlign:'center',background:'#fff',padding:'60px 48px',borderRadius:'16px',boxShadow:'0 4px 24px rgba(0,0,0,0.1)',maxWidth:'480px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>🎉</div>
        <h2 style={{color:'#27ae60',marginBottom:'8px'}}>Order Placed Successfully!</h2>
        <p style={{color:'#666',marginBottom:'24px'}}>
          Thank you for your purchase. Your order <strong>#{order?.id}</strong> is confirmed.
        </p>
        {order && (
          <div style={{background:'#f8f9fa',borderRadius:'10px',padding:'20px',marginBottom:'24px',textAlign:'left'}}>
            <p style={{margin:'4px 0',fontSize:'14px'}}><strong>Order ID:</strong> #{order.id}</p>
            <p style={{margin:'4px 0',fontSize:'14px'}}><strong>Total:</strong> ₹{order.total_price}</p>
            <p style={{margin:'4px 0',fontSize:'14px'}}><strong>Status:</strong> {order.status}</p>
            <p style={{margin:'4px 0',fontSize:'14px'}}><strong>Items:</strong> {order.items?.length}</p>
          </div>
        )}
        <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
          <button onClick={() => navigate('/products')}
            style={{padding:'11px 24px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'14px'}}>
            Continue Shopping
          </button>
          <button onClick={() => navigate('/profile')}
            style={{padding:'11px 24px',background:'transparent',color:'#1a1a2e',border:'1px solid #ddd',borderRadius:'8px',cursor:'pointer',fontSize:'14px'}}>
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
}