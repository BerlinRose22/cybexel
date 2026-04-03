import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import GoogleButton from '../components/GoogleButton';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login/', form);
      login(res.data);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p>No account? <Link to="/register">Register</Link></p>
        <div style={{ margin: '20px 0', textAlign: 'center', color: '#999' }}>OR</div>
        <GoogleButton 
          onSuccess={(data) => {
            login(data);
            navigate('/products');
          }} 
          onFailure={(err) => setError('Google Login Failed')}
        />
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh' },
  card: { background:'#fff', padding:'40px', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', width:'360px' },
  input: { width:'100%', padding:'10px 14px', margin:'8px 0', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' },
  btn: { width:'100%', padding:'12px', background:'#1a1a2e', color:'#fff', border:'none', borderRadius:'8px', fontSize:'15px', cursor:'pointer', marginTop:'8px' },
  error: { color:'red', fontSize:'13px' },
};