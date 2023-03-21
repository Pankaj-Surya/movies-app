
import './App.css';
import Movies from './components/Movies';
import { Route, Redirect,Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">

     <Movies></Movies>
         
    </div>
  );
}

export default App;
