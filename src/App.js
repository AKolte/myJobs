import { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './Containers/Home';

const getCookieObject = () => {
  const cook = document.cookie;
  const cookArray = cook.split(";");
  let cookObj = {};
  let temp=[];
  cookArray.forEach((eachPair)=> {
    temp=eachPair.split('=');
    cookObj = {...cookObj, [temp[0].trim()]: temp[1]}
  })
  console.log(cookObj);
  return cookObj;
}

export const cookieObject = getCookieObject();

function App() {
  return (
    <div className="App">
       <Home />
    </div>
  );
}

export default App;
