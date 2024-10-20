import trns from './translation.webp';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <Header/ >
      <Body/ >
      <Backend/ >
      <Footer/ >
    </div>
  );
}

function Backend() {
  
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [] )

  return (
    <div>
      <h1>Beneath me is the backend test message</h1>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}> {member} </p>
        ))
      )}
    </div>
  )
}

function Header() {
  return (
    <header className='Tophead'>
      <h1 className='App'><img src={trns} className='App-logo' alt='A-logo'></img> Document Translator</h1>
    </header>
  );
}

function Body () {
  return (
    <body className='App'>
      <p> Select a file to upload</p>
      <Upload />
    </body>
  );
}

function Footer() {
  return (
    <footer className='Footer'>
        <small>© 2024  </small>
    </footer>
  );
}

function Upload() {
  return (
    <form>
      Translate to:&nbsp;
      <select>
        <option>
        Select Language
        </option>
      </select>
      <br/>
      <br/>

      <input type= "file" accept=".pdf, .docx, .pptx">
      </input>

      <button type ="submit">Translate Document</button>
    </form>
  )
}



export default App;
