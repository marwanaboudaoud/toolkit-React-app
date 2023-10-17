
import  NavBar  from './components/navbar/Navbar';
import { MyRoutes } from './components/navbar/Routs';
import { BrowserRouter as Router } from 'react-router-dom';
import "./assets/scss/app.scss";
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='container'>
        <MyRoutes />
        </div>
        <Footer />
      </div>
    </Router> 
  );
}

export default App;
