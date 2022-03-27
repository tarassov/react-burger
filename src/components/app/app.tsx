import React, {useState} from 'react';
import AppHeader from '../app-header/app-header';
import MainLayout from '../main-layout/main-layout';

function App() {
  return (
    <div style={{overflow: 'hidden'}}>
      <AppHeader/>
      <MainLayout/>
    </div>
  );
}

export default App;
