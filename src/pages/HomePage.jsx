import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{textAlign:'center',padding:'100px 24px'}}>
      <h1 style={{fontSize:'52px',fontWeight:'800',color:'#1a1a2e',marginBottom:'16px'}}>
        Welcome to <span style={{color:'#e67e22'}}>ShopDash</span>
      </h1>
      <p style={{fontSize:'18px',color:'#666',maxWidth:'500px',margin:'0 auto 40px',lineHeight:'1.7'}}>
        A full-featured product dashboard powered by Django REST Framework and React.
      </p>
      <div style={{display:'flex',gap:'16px',justifyContent:'center'}}>
        {user ? (
          <button onClick={() => navigate('/products')}
            style={{padding:'14px 36px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer'}}>
            Browse Products →
          </button>
        ) : (
          <>
            <button onClick={() => navigate('/register')}
              style={{padding:'14px 36px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer'}}>
              Get Started
            </button>
            <button onClick={() => navigate('/login')}
              style={{padding:'14px 36px',background:'transparent',color:'#1a1a2e',border:'1.5px solid #ddd',borderRadius:'8px',fontSize:'16px',cursor:'pointer'}}>
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}``