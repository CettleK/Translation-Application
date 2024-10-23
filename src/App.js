import trns from './translation.webp';
import './App.css';
import React, { useState, useEffect } from 'react';
import Docload from './Docload';

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

  const [selectedFile, setSelectedFile] = useState(null)
  const [languages, setLanguages] = useState([])
  const [targetLanguage, setTargetLanguage] = useState('')

  useEffect(() => {
    fetch('/api/languages')
    .then(response => response.json())
    .then(data => {
      setLanguages(data);
    })
    .catch(error => {
      console.error("Error fetching langages:", error);
    });
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !targetLanguage) {
      alert("Please select a file and target language.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("language", targetLanguage);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("Translation response: ", data);
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }

  };


  return (
    <form onSubmit={handleSubmit}>
      <input type= "file" onChange={handleFileChange} accept=".pdf, .docx, .pptx" />
      
      <select value={targetLanguage} onChange={handleLanguageChange}>
        
        <option value="">Select Language</option>
        
        {languages.map((lang) => (
          <option key={lang.language} value={lang.language}>
            {lang.name}
          </option>
        ))}

      </select>

      <button type ="submit">Translate Document</button>
    </form>
  )
}



export default App;
