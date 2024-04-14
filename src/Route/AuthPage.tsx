import React from 'react';
import { AuthenticationForm } from '../SignUp/AuthenticationForm';

const AuthPage: React.FC = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <AuthenticationForm />
    </div>
  );
}

export default AuthPage;