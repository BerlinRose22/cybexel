import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{background:'#1a1a2e',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Link to="/" style={{color:'#fff',textDecoration:'none',fontWeight:'700',fontSize:'20px'}}>
        Shop<span style={{color:'#e67e22'}}>Dash</span>
      </Link>
      <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
        {user ? (
          <>
            <Link to="/products" style={{color:'rgba(255,255,255,0.8)',textDecoration:'none',fontSize:'14px'}}>Products</Link>
            <Link to="/cart"     style={{color:'rgba(255,255,255,0.8)',textDecoration:'none',fontSize:'14px'}}>Cart</Link>
            <Link to="/profile"  style={{color:'rgba(255,255,255,0.8)',textDecoration:'none',fontSize:'14px'}}>Profile</Link>
            <button onClick={() => { logout(); navigate('/'); }}
              style={{background:'transparent',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',padding:'6px 16px',borderRadius:'6px',cursor:'pointer',fontSize:'13px'}}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"    style={{color:'rgba(255,255,255,0.8)',textDecoration:'none',fontSize:'14px'}}>Login</Link>
            <Link to="/register" style={{background:'#e67e22',color:'#fff',textDecoration:'none',padding:'7px 18px',borderRadius:'6px',fontSize:'14px'}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}