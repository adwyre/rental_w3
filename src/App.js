import './index.css';

// Components
import Navbar from './components/Navbar';
import Card from './components/Card';

// Config
import config from './config.json';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="section">
        <div className="hero-container">
          <span>Header text goes here. Description of business and services for the rental application. Sign up or rent something today!</span>
          <div className="cta-buttons">
            <button className="button primary">Click here</button>
            <button className="button secondary">Click here</button>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className="cards-container">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
