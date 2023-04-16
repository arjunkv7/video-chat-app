import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    socketIO(socketUrl);
  }, []);

  return (
    <div className="App">
      <button className='bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white'>
        Connect
        </button>
    </div>
  )
}

export default App;