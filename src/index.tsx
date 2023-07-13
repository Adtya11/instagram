import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import FirebaseContext from './context/firebase'
import { firebaseApp, FieldValue } from './lib/firebase'
import './styles/app.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <FirebaseContext.Provider value={{ firebaseApp, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
  );
