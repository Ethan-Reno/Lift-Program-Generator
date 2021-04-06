import logo from '../logo.svg';
import { Counter } from '../features/Counter';
import '../App.css';

function CounterApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default CounterApp;