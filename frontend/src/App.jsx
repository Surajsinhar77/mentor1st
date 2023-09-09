import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/NavBar'
import Allroutes from './common/Allroutes';

function App() {
  return (
    <>
      <div >
        <Router>
          <Navbar/>
          <Allroutes/>
        </Router>
      </div>
    </>
  )
}

export default App
