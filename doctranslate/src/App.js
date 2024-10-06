import logo from './deeplogo.png';
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
    <header>
      <h1 className='App'> Document Translator</h1>
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
        <small>Powered by &nbsp;<img src={logo} className='App-logo'></img> </small>
    </footer>
  );
}

function Upload() {
  return (
    <form>
      <input type= "file" accept=".pdf, .docx">
      </input>
    </form>
  )
}



export default App;
