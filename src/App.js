import trns from './translation.webp';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <Header/ >
      <Body/ >
      {/* <Backend/ > */}
      <Footer/ >
    </div>
  );
}

// function Backend() {
  
//   const [data, setData] = useState([{}])

//   useEffect(() => {
//     fetch("/members").then(
//       res => res.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [] )

//   return (
//     <div>
//       <h1>Beneath me is the backend test message</h1>
//       {(typeof data.members === 'undefined') ? (
//         <p>Loading...</p>
//       ) : (
//         data.members.map((member, i) => (
//           <p key={i}> {member} </p>
//         ))
//       )}
//     </div>
//   )
// }

function Header() {
  return (
    <header className='Tophead'>
      <h1 className='App'><img src={trns} className='App-logo' alt='A-logo'></img> Document Translator</h1>
    </header>
  );
}

function Body () {
  return (
    <div className='App'>
      <p> </p>
      {/* <Upload /> */}
      <TextTranslator />
    </div>
  );
}

function Footer() {
  return (
    <footer className='Footer'>
        <small>© 2024  </small>
    </footer>
  );
}

function TextTranslator() {
  const [text, setText] = useState("");
  const [languages, setLanguages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch('/api/languages')
      .then(response => response.json())
      .then(data => {
        setLanguages(data);
      })
      .catch(error => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const handleTranslate = async (event) => {
    event.preventDefault();

    if (!text || !targetLanguage) {
      setError("Please input text and select a target language.");
      return;
    }

    setError("");

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language: targetLanguage }),
      });

      if (response.ok) {
        const data = await response.json();
        setTranslation(data.translated_text);
      } else {
        setError("Translation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Translate Text</h2>
      <form onSubmit={handleTranslate}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          {languages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Translate</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {translation && (
        <div>
          <h3>Translation</h3>
          <div style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#f9f9f9"
          }}>
            {translation}
          </div>
        </div>
      )}
    </div>
  );
}
// function Upload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [languages, setLanguages] = useState([]);
//   const [targetLanguage, setTargetLanguage] = useState('');

//   useEffect(() => {
//     fetch('/api/languages')
//       .then(response => response.json())
//       .then(data => {
//         setLanguages(data);
//       })
//       .catch(error => {
//         console.error("Error fetching languages:", error);
//       });
//   }, []);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleLanguageChange = (event) => {
//     setTargetLanguage(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFile || !targetLanguage) {
//       alert("Please select a file and target language.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("language", targetLanguage);

//     console.log("Selected file:", selectedFile);
//     console.log("Target language:", targetLanguage);


//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Translation response:", data);

//         if (data.file_path) {
//           alert("Translation successful! Download your file here: " + data.file_path);
//         } else {
//           alert("Translation completed, but no file path was returned.");
//         }
//       } else {
//         console.error("Failed to upload/translate the document");
//       }
//     } catch (error) {
//       console.error("Error uploading the file: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} accept=".pdf, .docx, .pptx" />
      
//       <select value={targetLanguage} onChange={handleLanguageChange}>
//         <option value="">Select Language</option>
//         {languages.map((lang) => (
//           <option key={lang.language} value={lang.language}>
//             {lang.name}
//           </option>
//         ))}
//       </select>

//       <button type="submit">Translate Document</button>
//     </form>
//   );
// }



export default App;
