import trns from './translation.webp';
import './App.css';

function App() {
  return (
    <div>
      <Header/ >
      <Body/ >
      <Footer/ >
    </div>
  );
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
