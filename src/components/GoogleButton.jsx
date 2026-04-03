import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import api from '../api/axios';

const GoogleButton = ({ onSuccess, onFailure }) => {
  const handleSuccess = async (response) => {
    const { credential } = response;
    try {
      const res = await api.post('/google/', { access_token: credential });
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      if (onFailure) onFailure(err);
    }
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => onFailure && onFailure(new Error('Google Login Failed'))}
        useOneTap
      />
    </div>
  );
};

export default GoogleButton;
