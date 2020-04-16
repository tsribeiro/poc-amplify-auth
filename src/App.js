import React from 'react';
import Login from './components/login';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="container">
      <Login />
    </div>
  );
}

export default App;
