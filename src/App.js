import logo from './logo.svg';
import './App.css';
import BingoBash from './components/BingoBash';

function App() {
  return (
    <div className="App" 
    // style={{  
    //   backgroundImage: "url('/images/background-background.png')",
    //   backgroundPosition: 'center',
    //   backgroundSize: '100% 100%',
    //   backgroundRepeat: 'no-repeat'
    // }}
    >
      <header className="App-header" 
      // style={{  
      //   backgroundImage: "url('/images/background.png')",
      //   backgroundPosition: 'center',
      //   backgroundSize: '100% 100%',
      //   backgroundRepeat: 'no-repeat'
      // }}
      >
        <BingoBash />
      </header>
    </div>
  );
}

export default App;
