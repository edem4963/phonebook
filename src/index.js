import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
import './index.css'

const promise = axios.get('http://localhost:3001/api/persons')
console.log(promise)


axios.get('http://localhost:3001/api/persons').then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
})

