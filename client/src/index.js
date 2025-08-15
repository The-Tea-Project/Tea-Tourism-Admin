import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const clerkPubKey = 'pk_test_ZGVmaW5pdGUtbWFncGllLTc2LmNsZXJrLmFjY291bnRzLmRldiQ';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>
);
