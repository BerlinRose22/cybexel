import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
  const [form, setForm] = useState({ username:'', email:'', password:'', password2:'' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.post('/register/', form);
      navigate('/login');
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  const f = (field) => ({
    value: form[field],
    onChange: e => setForm({...form, [field]: e.target.value})
  });

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
      <div style={{background:'#fff',padding:'40px',borderRadius:'12px',boxShadow:'0 4px 20px rgba(0,0,0,0.1)',width:'360px'}}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          {['username','email','password','password2'].map(field => (
            <div key={field}>
              <input style={{width:'100%',padding:'10px 14px',margin:'8px 0',border:'1px solid #ddd',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}}
                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                placeholder={field === 'password2' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                {...f(field)} required />
              {errors[field] && <p style={{color:'red',fontSize:'12px',margin:'0 0 4px'}}>{errors[field][0]}</p>}
            </div>
          ))}
          <button style={{width:'100%',padding:'12px',background:'#1a1a2e',color:'#fff',border:'none',borderRadius:'8px',fontSize:'15px',cursor:'pointer',marginTop:'8px'}}
            type="submit">Register</button>
        </form>
        <p style={{marginTop:'16px'}}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}